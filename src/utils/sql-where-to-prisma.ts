// sql-where-to-prisma.ts
// Conversor simplificado de WHERE SQL -> Prisma where
// Suporta: AND, OR, parênteses, =, !=, <, <=, >, >=, LIKE, ILIKE, IN (...), BETWEEN ... AND ..., IS (NOT) NULL

type PrismaScalar =
  | string
  | number
  | boolean
  | Date
  | null;

type PrismaComparison =
  | { equals?: PrismaScalar }
  | { not?: PrismaScalar | Record<string, any> }
  | { lt?: PrismaScalar }
  | { lte?: PrismaScalar }
  | { gt?: PrismaScalar }
  | { gte?: PrismaScalar }
  | { in?: PrismaScalar[] }
  | { notIn?: PrismaScalar[] }
  | { contains?: string; mode?: "insensitive" }
  | { startsWith?: string; mode?: "insensitive" }
  | { endsWith?: string; mode?: "insensitive" };

type PrismaWhere = Record<string, any>; // { AND?: [...], OR?: [...], field?: PrismaComparison | null }

type Token =
  | { type: "LPAREN" | "RPAREN" }
  | { type: "AND" | "OR" }
  | { type: "OP"; value: string } // = != < <= > >= LIKE ILIKE IN BETWEEN IS NULL NOT
  | { type: "IDENT"; value: string } // nomes de campos (aceita dots: relacao.campo)
  | { type: "NUMBER"; value: number }
  | { type: "STRING"; value: string }
  | { type: "BOOL"; value: boolean }
  | { type: "COMMA" };

const WHITESPACE = /\s/;
const IDENT = /[a-zA-Z0-9_.]/;

function tokenize(input: string): Token[] {
  const s = input.trim();
  const tokens: Token[] = [];
  let i = 0;

  const peek = () => s[i];
  const advance = () => s[i++];

  const matchWord = (w: string) =>
    s.slice(i, i + w.length).toLowerCase() === w.toLowerCase();

  while (i < s.length) {
    const ch = peek();

    if (WHITESPACE.test(ch)) {
      i++;
      continue;
    }

    if (ch === "(") {
      tokens.push({ type: "LPAREN" });
      i++;
      continue;
    }
    if (ch === ")") {
      tokens.push({ type: "RPAREN" });
      i++;
      continue;
    }
    if (ch === ",") {
      tokens.push({ type: "COMMA" });
      i++;
      continue;
    }

    // string literal: '...'
    if (ch === "'") {
      i++; // skip '
      let str = "";
      while (i < s.length && s[i] !== "'") {
        if (s[i] === "\\" && i + 1 < s.length) {
          // escape
          str += s[i + 1];
          i += 2;
        } else {
          str += s[i++];
        }
      }
      if (s[i] !== "'") throw new Error("Unterminated string literal");
      i++; // closing '
      tokens.push({ type: "STRING", value: str });
      continue;
    }

    // numbers
    if (/[0-9]/.test(ch)) {
      let num = "";
      while (i < s.length && /[0-9.]/.test(s[i])) num += s[i++];
      const val = Number(num);
      if (Number.isNaN(val)) throw new Error(`Invalid number: ${num}`);
      tokens.push({ type: "NUMBER", value: val });
      continue;
    }

    // operators / keywords (order matters)
    if (matchWord("and")) {
      tokens.push({ type: "AND" });
      i += 3;
      continue;
    }
    if (matchWord("or")) {
      tokens.push({ type: "OR" });
      i += 2;
      continue;
    }
    if (matchWord("ilike")) {
      tokens.push({ type: "OP", value: "ILIKE" });
      i += 5;
      continue;
    }
    if (matchWord("like")) {
      tokens.push({ type: "OP", value: "LIKE" });
      i += 4;
      continue;
    }
    if (matchWord("between")) {
      tokens.push({ type: "OP", value: "BETWEEN" });
      i += 7;
      continue;
    }
    if (matchWord("is")) {
      tokens.push({ type: "OP", value: "IS" });
      i += 2;
      continue;
    }
    if (matchWord("not")) {
      tokens.push({ type: "OP", value: "NOT" });
      i += 3;
      continue;
    }
    if (matchWord("in")) {
      tokens.push({ type: "OP", value: "IN" });
      i += 2;
      continue;
    }
    if (matchWord("null")) {
      tokens.push({ type: "OP", value: "NULL" });
      i += 4;
      continue;
    }
    if (matchWord(">=")) {
      tokens.push({ type: "OP", value: ">=" });
      i += 2;
      continue;
    }
    if (matchWord("<=")) {
      tokens.push({ type: "OP", value: "<=" });
      i += 2;
      continue;
    }
    if (matchWord("!=") || matchWord("<>")) {
      tokens.push({ type: "OP", value: "!=" });
      i += 2;
      continue;
    }
    if (matchWord("=")) {
      tokens.push({ type: "OP", value: "=" });
      i += 1;
      continue;
    }
    if (matchWord(">")) {
      tokens.push({ type: "OP", value: ">" });
      i += 1;
      continue;
    }
    if (matchWord("<")) {
      tokens.push({ type: "OP", value: "<" });
      i += 1;
      continue;
    }

    // booleans
    if (matchWord("true")) {
      tokens.push({ type: "BOOL", value: true });
      i += 4;
      continue;
    }
    if (matchWord("false")) {
      tokens.push({ type: "BOOL", value: false });
      i += 5;
      continue;
    }

    // identifiers (campos; permitem . em relacao.campo)
    if (IDENT.test(ch)) {
      let ident = "";
      while (i < s.length && IDENT.test(s[i])) ident += s[i++];
      tokens.push({ type: "IDENT", value: ident });
      continue;
    }

    throw new Error(`Unexpected char: ${ch} at ${i}`);
  }

  return tokens;
}

// ---------------- Parser (precedência: parentheses > NOT/IS > AND > OR) ----------------

class Parser {
  private i = 0;
  constructor(private tokens: Token[]) {}

  private peek(): Token | undefined { return this.tokens[this.i]; }
  private advance(): Token { return this.tokens[this.i++]; }
  private match(...types: Array<Token["type"] | string>): Token | undefined {
    const t = this.peek();
    if (!t) return;
    for (const typ of types) {
      if (typeof typ === "string") {
        if ((t as any).type === "OP" && (t as any).value === typ) return this.advance();
        if ((t as any).type === typ) return this.advance();
      }
    }
    return;
  }
  private expect(type: Token["type"] | string, msg: string): Token {
    const t = this.match(type);
    if (!t) throw new Error(msg);
    return t;
  }

  // expr := orExpr
  parse(): PrismaWhere {
    const node = this.parseOr();
    return node;
  }

  // orExpr := andExpr (OR andExpr)*
  private parseOr(): PrismaWhere {
    let left = this.parseAnd();
    while (this.match("OR")) {
      const right = this.parseAnd();
      left = { OR: [left, right] };
    }
    return left;
  }

  // andExpr := primary (AND primary)*
  private parseAnd(): PrismaWhere {
    let left = this.parsePrimary();
    while (this.match("AND")) {
      const right = this.parsePrimary();
      left = { AND: [left, right] };
    }
    return left;
  }

  // primary := "(" expr ")" | predicate
  private parsePrimary(): PrismaWhere {
    if (this.match("LPAREN")) {
      const e = this.parseOr();
      this.expect("RPAREN", "Expected ')'");
      return e;
    }
    return this.parsePredicate();
  }

  // predicate := IDENT op RHS | IDENT IS [NOT] NULL
  private parsePredicate(): PrismaWhere {
    const identTok = this.expect("IDENT", "Expected field name") as any;
    const field = identTok.value as string;

    // IS (NOT) NULL
    if (this.match("IS")) {
      const notTok = this.match("NOT");
      this.expect("NULL", "Expected NULL");
      return this.makeFieldNull(field, !!notTok);
    }

    // BETWEEN a AND b
    if (this.match("BETWEEN")) {
      const a = this.parseValue();
      this.expect("AND", "Expected AND in BETWEEN");
      const b = this.parseValue();
      return this.makeBetween(field, a, b);
    }

    // LIKE/ILIKE
    const like = this.match("LIKE") || this.match("ILIKE");
    if (like) {
      const insensitive = (like as any).value === "ILIKE";
      const pattern = this.parseLikePattern();
      return this.makeLike(field, pattern, insensitive);
    }

    // IN (...)
    if (this.match("IN")) {
      this.expect("LPAREN", "Expected '(' after IN");
      const arr: PrismaScalar[] = [];
      if (!this.match("RPAREN")) {
        this.i--; // put back
        arr.push(this.parseValue());
        while (this.match("COMMA")) arr.push(this.parseValue());
        this.expect("RPAREN", "Expected ')' after IN list");
      }
      return this.makeIn(field, arr);
    }

    // comparação binária: = != < <= > >=
    const op = this.expect("OP", "Expected operator") as any;
    const rhs = this.parseValue();
    return this.makeBinary(field, op.value, rhs);
  }

  private parseValue(): PrismaScalar {
    const t = this.advance();
    if (!t) throw new Error("Expected value");
    if (t.type === "STRING") return this.coerceValue(t.value);
    if (t.type === "NUMBER") return t.value;
    if (t.type === "BOOL") return t.value;
    if (t.type === "IDENT") {
      // trata ident como literal? (ex.: TRUE/FALSE já capturados, NULL tratado antes)
      // aqui assumimos ser string (ex.: enums/alias). Se quiser, pode lançar erro.
      return this.coerceValue(t.value);
    }
    throw new Error("Invalid value");
  }

  private parseLikePattern(): string {
    const t = this.advance();
    if (!t || t.type !== "STRING") throw new Error("Expected string after LIKE/ILIKE");
    return t.value;
  }

  // Helpers de construção

  private coerceValue(v: string): PrismaScalar {
    // tenta Date
    if (/^\d{4}-\d{2}-\d{2}(?:[ T]\d{2}:\d{2}:\d{2}(?:\.\d{1,6})?)?$/.test(v)) {
      const d = new Date(v);
      if (!isNaN(d.getTime())) return d;
    }
    // tenta número
    if (/^-?\d+(\.\d+)?$/.test(v)) return Number(v);
    // default string
    return v;
  }

  private fieldPath(field: string): any {
    // suporte simples a relacao.campo → { relacao: { is: { campo: ... } } }
    const parts = field.split(".");
    if (parts.length === 1) return field;
    // aninhar...
    // relacao1.relacao2.campo → { relacao1: { is: { relacao2: { is: { campo: X } } } } }
    let obj: any = {};
    let current = obj;
    for (let i = 0; i < parts.length - 1; i++) {
      current[parts[i]] = { is: {} };
      current = current[parts[i]].is;
    }
    // devolve { <root>: { is: { ... path ... , <last>: VALUE } } }
    return { root: obj, lastKey: parts[parts.length - 1] };
  }

  private attachNested(field: string, comparison: any): PrismaWhere {
    const parts = field.split(".");
    if (parts.length === 1) {
      return { [field]: comparison };
    }
    // monta nested { a: { is: { b: { is: { c: comparison }}}}}
    const build = (idx: number): any => {
      if (idx === parts.length - 1) {
        return { [parts[idx]]: comparison };
      }
      return { [parts[idx]]: { is: build(idx + 1) } };
    };
    return build(0);
  }

  private makeFieldNull(field: string, isNot: boolean): PrismaWhere {
    if (isNot) {
      // NOT NULL → not: null
      return this.attachNested(field, { not: null });
    }
    return this.attachNested(field, null);
  }

  private makeBetween(field: string, a: PrismaScalar, b: PrismaScalar): PrismaWhere {
    return this.attachNested(field, { gte: a, lte: b });
  }

  private likeToPrisma(pattern: string): { kind: "contains" | "startsWith" | "endsWith"; text: string } {
    const startsPercent = pattern.startsWith("%");
    const endsPercent = pattern.endsWith("%");
    const text = pattern.replace(/^%/, "").replace(/%$/, "");

    if (startsPercent && endsPercent) return { kind: "contains", text };
    if (startsPercent) return { kind: "endsWith", text };
    if (endsPercent) return { kind: "startsWith", text };
    // sem % → equals
    return { kind: "contains", text }; // fallback útil (poderia ser equals)
  }

  private makeLike(field: string, pattern: string, insensitive: boolean): PrismaWhere {
    const { kind, text } = this.likeToPrisma(pattern);
    const comp: any = { [kind]: text };
    if (insensitive) comp.mode = "insensitive";
    return this.attachNested(field, comp);
  }

  private makeIn(field: string, arr: PrismaScalar[]): PrismaWhere {
    return this.attachNested(field, { in: arr });
  }

  private makeBinary(field: string, op: string, rhs: PrismaScalar): PrismaWhere {
    switch (op) {
      case "=": return this.attachNested(field, { equals: rhs });
      case "!=": return this.attachNested(field, { not: rhs });
      case "<": return this.attachNested(field, { lt: rhs });
      case "<=": return this.attachNested(field, { lte: rhs });
      case ">": return this.attachNested(field, { gt: rhs });
      case ">=": return this.attachNested(field, { gte: rhs });
      default: throw new Error(`Unsupported operator: ${op}`);
    }
  }
}

// ---------------- API pública ----------------

export function sqlWhereToPrismaWhere(sql: string): PrismaWhere {
  const tokens = tokenize(sql);
  if (tokens.length === 0) return {};
  const parser = new Parser(tokens);
  return parser.parse();
}
