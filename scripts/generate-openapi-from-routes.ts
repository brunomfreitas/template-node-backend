import { Prisma } from "@prisma/client";
import { mkdirSync, readdirSync, statSync, writeFileSync } from "fs";
import { basename, join, resolve } from "path";
import {
	CallExpression,
	Node,
	ObjectLiteralExpression,
	Project,
	SyntaxKind,
	VariableDeclaration
} from "ts-morph";

/** ====== CONFIG ====== */
const CONTROLLERS_DIR = "src/http/controllers";
const REPOSITORIES_DIR = "src/repositories/prisma";
// Gravar no mesmo lugar do seu log:
const OUTPUT_DIR = "src/lib/swagger";
const OUTPUT_FILE = "openapi.json";

/** ====== MANUAL CONTROLLERS (sem model Prisma) ======
 * Aqui você descreve controllers especiais (ex.: auth)
 * que não têm model Prisma mas precisam aparecer no OpenAPI.
 */
const MANUAL_CONTROLLERS: Record<
  string,
  {
    // schemas: nome -> schema OpenAPI
    schemas: Record<string, any>;
    // constrói paths com base nas rotas encontradas
    buildPaths: (routes: RouteDef[], basePath: string) => Record<string, any>;
    // quais tags usar
    tagName?: string;
  }
> = {
  auth: {
    tagName: "Auth",
    schemas: {
      AuthLoginRequest: {
        type: "object",
        properties: {
          login: { type: "string", minLength: 3, example: "admin" },
          password: { type: "string", minLength: 6, example: "123456" },
        },
        required: ["login", "password"],
      },
      AuthLoginResponse: {
        type: "object",
        properties: {
          token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
          user: {
            type: "object",
            properties: {
              id: { type: "integer", example: 1 },
              login: { type: "string", example: "admin" },
              id_pessoa: { type: "integer", example: 10 },
            },
            required: ["id", "login", "id_pessoa"],
          },
        },
        required: ["token", "user"],
      },
      AuthRegisterRequest: {
        type: "object",
        properties: {
          login: { type: "string", minLength: 3, example: "novo" },
          password: { type: "string", minLength: 6, example: "123456" },
          id_pessoa: { type: "integer", minimum: 1, example: 10 },
        },
        required: ["login", "password", "id_pessoa"],
      },
      AuthRegisterResponse: {
        type: "object",
        properties: {
          token: { type: "string" },
          user: {
            type: "object",
            properties: {
              id: { type: "integer" },
              login: { type: "string" },
              id_pessoa: { type: "integer" },
            },
            required: ["id", "login", "id_pessoa"],
          },
        },
        required: ["token", "user"],
      },
      AuthMeResponse: {
        type: "object",
        properties: {
          id: { type: "integer" },
          login: { type: "string" },
          id_pessoa: { type: "integer" },
        },
        required: ["id", "login", "id_pessoa"],
      },
    },
    buildPaths: (routes, basePath) => {
      const paths: Record<string, any> = {};
      const ensure = (p: string) => (paths[p] ??= {});
      const tag = "Auth";

      for (const r of routes) {
        const cleanSub = r.subPath.replace(/:id/g, "{id}");
        const fullPath = `${basePath}${cleanSub === "/" ? "" : cleanSub}`;
        const method = r.method.toLowerCase();
        const item = ensure(fullPath);

        // /auth/register
        if (method === "post" && cleanSub === "/register") {
          item.post = {
            summary: "Registrar usuário",
            tags: [tag],
			security: [], // <--- público
            requestBody: {
              required: true,
              content: {
                "application/json": { schema: { $ref: "#/components/schemas/AuthRegisterRequest" } },
              },
            },
            responses: {
              201: {
                description: "Created",
                content: {
                  "application/json": { schema: { $ref: "#/components/schemas/AuthRegisterResponse" } },
                },
              },
              409: { description: "Login already in use" },
              404: { description: "Person not found" },
            },
          };
        }

        // /auth/login
        if (method === "post" && cleanSub === "/login") {
          item.post = {
            summary: "Login",
            tags: [tag],
			security: [], // <--- público
            requestBody: {
              required: true,
              content: {
                "application/json": { schema: { $ref: "#/components/schemas/AuthLoginRequest" } },
              },
            },
            responses: {
              200: {
                description: "OK",
                content: {
                  "application/json": { schema: { $ref: "#/components/schemas/AuthLoginResponse" } },
                },
              },
              401: { description: "Invalid credentials" },
            },
          };
        }

        // /auth/me
        if (method === "get" && cleanSub === "/me") {
          item.get = {
            summary: "Detalhes do usuário autenticado",
            tags: [tag],
            security: [{ bearerAuth: [] }],
            responses: {
              200: {
                description: "OK",
                content: {
                  "application/json": { schema: { $ref: "#/components/schemas/AuthMeResponse" } },
                },
              },
              401: { description: "Unauthorized" },
              404: { description: "User not found" },
            },
          };
        }
      }

      return paths;
    },
  },
};

/** ====== UTILS ====== */
function walk(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

function toPascal(s: string) {
  return s.replace(/(^\w|_\w)/g, (m) => m.replace("_", "").toUpperCase());
}

function prismaTypeToOpenApi(type: string) {
  switch (type) {
    case "Int":
    case "BigInt":
      return { type: "integer" };
    case "Float":
    case "Decimal":
      return { type: "number" };
    case "Boolean":
      return { type: "boolean" };
    case "DateTime":
      return { type: "string", format: "date-time" };
    case "Bytes":
      return { type: "string", format: "byte" };
    case "Json":
      return {}; // any
    default:
      return { type: "string" };
  }
}

function isTimestampField(name: string) {
  return name.startsWith("dt_");
}

/** ====== TSMORPH ====== */
const project = new Project({ tsConfigFilePath: "tsconfig.json" });

/** ====== ROTAS ====== */
type RouteDef = { method: string; subPath: string };

function extractRoutesFromFile(routesFile: string): RouteDef[] {
  const src = project.addSourceFileAtPathIfExists(routesFile);
  if (!src) return [];
  const routes: RouteDef[] = [];

  // descobre variáveis que são Router()
  const routerNames = new Set<string>();
  src.forEachDescendant((node) => {
    if (!Node.isVariableDeclaration(node)) return;
    const init = node.getInitializer();
    if (!init || !Node.isCallExpression(init)) return;
    const callee = init.getExpression().getText();
    if (callee === "Router") routerNames.add(node.getName());
  });

  // captura:
  //   a) router.get('/x', ...)
  //   b) router.route('/x').get(...).put(...).delete(...)
  src.forEachDescendant((node) => {
    if (!Node.isCallExpression(node)) return;
    const call = node as CallExpression;
    const expr = call.getExpression();
    if (!Node.isPropertyAccessExpression(expr)) return;

    const method = expr.getName();
    const objExpr = expr.getExpression();
    const verbs = new Set(["get", "post", "put", "delete", "patch", "route"]);
    if (!verbs.has(method)) return;

    function handleDirect(): { ok: boolean } {
      const objText = objExpr.getText();
      if (!routerNames.has(objText)) return { ok: false };

      if (method === "route") {
        const args = call.getArguments();
        if (args.length >= 1 && args[0].getKind() === SyntaxKind.StringLiteral) {
          const subPath = args[0].getText().replace(/['"`]/g, "");
          // pega encadeamentos: .get/.post...
          const parent = call.getParent();
          if (parent && Node.isCallExpression(parent)) {
            const pExpr = parent.getExpression();
            if (Node.isPropertyAccessExpression(pExpr)) {
              const verb = pExpr.getName().toLowerCase();
              if (["get", "post", "put", "delete", "patch"].includes(verb)) {
                routes.push({ method: verb, subPath });
              }
            }
          }
          // níveis acima: .get(...).put(...)
          let cur: Node | undefined = parent;
          while (cur && Node.isCallExpression(cur.getParent() as Node)) {
            const upper = cur.getParent() as CallExpression;
            const uExpr = upper.getExpression();
            if (Node.isPropertyAccessExpression(uExpr)) {
              const verb2 = uExpr.getName().toLowerCase();
              if (["get", "post", "put", "delete", "patch"].includes(verb2)) {
                routes.push({ method: verb2, subPath });
                cur = upper;
                continue;
              }
            }
            break;
          }
          return { ok: true };
        }
        return { ok: false };
      } else {
        const args = call.getArguments();
        if (args.length >= 1 && args[0].getKind() === SyntaxKind.StringLiteral) {
          const subPath = args[0].getText().replace(/['"`]/g, "");
          routes.push({ method: method.toLowerCase(), subPath });
          return { ok: true };
        }
      }
      return { ok: false };
    }

    const direct = handleDirect();
    if (direct.ok) return;

    // router.route('/x').get(...) (objExpr é um CallExpression)
    if (Node.isCallExpression(objExpr)) {
      const innerCall = objExpr as CallExpression;
      const innerExpr = innerCall.getExpression();
      if (Node.isPropertyAccessExpression(innerExpr)) {
        const innerName = innerExpr.getName(); // route ?
        const baseObj = innerExpr.getExpression().getText(); // router ?
        if (innerName === "route" && routerNames.has(baseObj)) {
          const args = innerCall.getArguments();
          if (args.length >= 1 && args[0].getKind() === SyntaxKind.StringLiteral) {
            const subPath = args[0].getText().replace(/['"`]/g, "");
            if (["get", "post", "put", "delete", "patch"].includes(method.toLowerCase())) {
              routes.push({ method: method.toLowerCase(), subPath });
            }
          }
        }
      }
    }
  });

  return routes;
}

/** ====== SELECT NA REPOSITORY ====== */
type SelectMap = Record<string, boolean>;

function objectLiteralFromVarDecl(
  decl?: VariableDeclaration | undefined | null
): ObjectLiteralExpression | null {
  if (!decl) return null;
  const init = decl.getInitializer();
  if (!init || !Node.isObjectLiteralExpression(init)) return null;
  return init as ObjectLiteralExpression;
}

function objectLiteralToSelect(obj: ObjectLiteralExpression): SelectMap {
  const select: SelectMap = {};
  for (const prop of obj.getProperties()) {
    if (!Node.isPropertyAssignment(prop)) continue;
    const name = prop.getName().replace(/['"`]/g, "");
    const valueText = prop.getInitializer()?.getText() ?? "";
    if (valueText === "true") select[name] = true;
  }
  return select;
}

function findSelectFromRepository(entityStem: string): SelectMap | null {
  const candidates = [
    join(REPOSITORIES_DIR, `${entityStem}.repository.ts`),
    join(REPOSITORIES_DIR, `${entityStem}.repo.ts`),
    join(REPOSITORIES_DIR, `${entityStem.replace(/-/g, "_")}.repository.ts`),
    join(REPOSITORIES_DIR, `${entityStem.replace(/-/g, "_")}.repo.ts`),
    join(REPOSITORIES_DIR, `${entityStem.replace(/_/g, "-")}.repository.ts`),
    join(REPOSITORIES_DIR, `${entityStem.replace(/_/g, "-")}.repo.ts`),
  ].filter((p) => {
    try {
      return statSync(p).isFile();
    } catch {
      return false;
    }
  });

  if (candidates.length === 0) return null;

  const src = project.addSourceFileAtPathIfExists(candidates[0]);
  if (!src) return null;

  const expectedName = `${entityStem.toUpperCase().replace(/-/g, "_")}_SELECT`;
  const direct = src.getVariableDeclaration(expectedName);
  const obj = objectLiteralFromVarDecl(direct);
  if (obj) return objectLiteralToSelect(obj);

  const anyDecl = src.getVariableDeclarations().find((vd) => /_SELECT$/i.test(vd.getName()));
  const obj2 = objectLiteralFromVarDecl(anyDecl);
  if (obj2) return objectLiteralToSelect(obj2);

  return null;
}

/** ====== PRISMA MODEL ====== */
function findPrismaModelByStem(entityStem: string) {
  const prismaName = entityStem.replace(/-/g, "_"); // dominio-valor -> dominio_valor
  const target = Prisma.dmmf.datamodel.models.find(
    (m) => m.name.toLowerCase() === prismaName.toLowerCase()
  );
  return target || null;
}

/** ====== SCHEMAS ====== */
function buildEntitySchema(model: any, select: SelectMap | null) {
  const props: Record<string, any> = {};
  for (const field of model.fields) {
    if (field.kind !== "scalar") continue;
    if (select && !select[field.name]) continue;
    props[field.name] = prismaTypeToOpenApi(field.type);
  }
  return { type: "object", properties: props };
}

function deriveCreateUpdateSchemas(entitySchema: any, idField: string | null) {
  const props = entitySchema.properties ?? {};
  const createProps: Record<string, any> = {};
  const updateProps: Record<string, any> = {};

  for (const [name, schema] of Object.entries<any>(props)) {
    const isId = idField ? name === idField : false;
    if (!isId && !isTimestampField(name)) createProps[name] = schema;
    if (!isTimestampField(name)) updateProps[name] = schema;
  }
  return {
    create: { type: "object", properties: createProps },
    update: { type: "object", properties: updateProps },
  };
}

/** ====== PATHS CRUD PADRÃO ====== */
function summaryForGet(subPath: string, schemaName: string) {
  if (subPath === "/") return `Listar ${schemaName}`;
  if (subPath === "/all") return `Listar todos ${schemaName}`;
  if (subPath === "/search") return `Pesquisar ${schemaName}`; // 👈 novo
  if (subPath.includes("/editar/{id}")) return `Buscar ${schemaName} para edição por ID`;
  if (subPath.includes("/visualizar/{id}")) return `Buscar ${schemaName} para visualização por ID`;
  if (subPath.includes("{id}")) return `Buscar ${schemaName} por ID`;
  return `GET ${schemaName}`;
}

// function buildPathsForEntity(
//   routes: RouteDef[],
//   basePath: string,
//   schemaName: string
// ) {
//   const paths: Record<string, any> = {};
//   const ensure = (p: string) => (paths[p] ??= {});

//   for (const r of routes) {
//     const cleanSub = r.subPath.replace(/:id/g, "{id}");
//     const fullPath = `${basePath}${cleanSub === "/" ? "" : cleanSub}`;
//     const item = ensure(fullPath);

//     const isList = cleanSub === "/" || cleanSub === "/all";
//     const isById = cleanSub.includes("{id}");
//     const okSchema = isList
//       ? { type: "array", items: { $ref: `#/components/schemas/${schemaName}` } }
//       : { $ref: `#/components/schemas/${schemaName}` };

//     const method = r.method.toLowerCase();

//     if (method === "get") {
//       item.get = {
//         summary: summaryForGet(cleanSub, schemaName),
//         tags: [schemaName],
//         parameters: [
//           ...(isById ? [{ in: "path", name: "id", required: true, schema: { type: "integer" } }] : []),
//           ...(isList
//             ? [
//                 { in: "query", name: "page", schema: { type: "integer", minimum: 1 }, required: false, description: "Página (default 1)" },
//                 { in: "query", name: "limit", schema: { type: "integer", minimum: 1, maximum: 100 }, required: false, description: "Itens por página (default 10)" },
//               ]
//             : []),
//         ],
//         responses: {
//           200: { description: "OK", content: { "application/json": { schema: okSchema } } },
//           ...(isById ? { 404: { description: "Não encontrado" } } : {}),
//         },
//       };
//     }

//     if (method === "post") {
//       item.post = {
//         summary: `Criar ${schemaName}`,
//         tags: [schemaName],
//         security: [{ bearerAuth: [] }],
//         requestBody: {
//           required: true,
//           content: { "application/json": { schema: { $ref: `#/components/schemas/Create${schemaName}` } } },
//         },
//         responses: {
//           201: { description: "Created", content: { "application/json": { schema: { $ref: `#/components/schemas/${schemaName}` } } } },
//         },
//       };
//     }

//     if (method === "put" || method === "patch") {
//       item[method] = {
//         summary: `Atualizar ${schemaName}`,
//         tags: [schemaName],
//         security: [{ bearerAuth: [] }],
//         parameters: [
//           ...(isById ? [{ in: "path", name: "id", required: true, schema: { type: "integer" } }] : []),
//         ],
//         requestBody: {
//           required: true,
//           content: { "application/json": { schema: { $ref: `#/components/schemas/Update${schemaName}` } } },
//         },
//         responses: {
//           200: { description: "OK", content: { "application/json": { schema: { $ref: `#/components/schemas/${schemaName}` } } } },
//           404: { description: "Não encontrado" },
//         },
//       };
//     }

//     if (method === "delete") {
//       item.delete = {
//         summary: `Excluir ${schemaName}`,
//         tags: [schemaName],
//         security: [{ bearerAuth: [] }],
//         parameters: [{ in: "path", name: "id", required: true, schema: { type: "integer" } }],
//         responses: { 204: { description: "No Content" }, 404: { description: "Não encontrado" } },
//       };
//     }
//   }

//   return paths;
// }


function buildPathsForEntity(
  routes: RouteDef[],
  basePath: string,
  schemaName: string
) {
  const paths: Record<string, any> = {};
  const ensure = (p: string) => (paths[p] ??= {});

  for (const r of routes) {
    const cleanSub = r.subPath.replace(/:id/g, "{id}");
    const fullPath = `${basePath}${cleanSub === "/" ? "" : cleanSub}`;
    const item = ensure(fullPath);

    const isList   = cleanSub === "/" || cleanSub === "/all";
    const isById   = cleanSub.includes("{id}");
    const isSearch = cleanSub === "/search"; // 👈 novo
    const isImportExcel = cleanSub === "/importar-excel";
    const isTemplateExcel = cleanSub === "/template-excel";

    // ⚠️ OBS: aqui ainda estamos usando o schema "simples".
    // Se quiser, depois dá pra trocar por um schema de PaginatedResult<T>.
    const okSchema = isList || isSearch
      ? { type: "array", items: { $ref: `#/components/schemas/${schemaName}` } }
      : { $ref: `#/components/schemas/${schemaName}` };

    const method = r.method.toLowerCase();

    if (method === "get") {
      if (isTemplateExcel) {
        item.get = {
          summary: `Baixar planilha modelo para importar ${schemaName}`,
          tags: [schemaName],
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "Planilha modelo",
              content: {
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
                  schema: { type: "string", format: "binary" }
                }
              }
            }
          }
        };
        continue;
      }

      // monta parâmetros dinamicamente
      const parameters: any[] = [];

      if (isById) {
        parameters.push({
          in: "path",
          name: "id",
          required: true,
          schema: { type: "integer" }
        });
      }

      if (isList) {
        parameters.push(
          {
            in: "query",
            name: "page",
            required: false,
            schema: { type: "integer", minimum: 1 },
            description: "Página (default 1)"
          },
          {
            in: "query",
            name: "limit",
            required: false,
            schema: { type: "integer", minimum: 1, maximum: 100 },
            description: "Itens por página (default 10)"
          }
        );
      }

      if (isSearch) {
        // parâmetros compatíveis com PrismaBaseRepository.search + controller search.ts
        parameters.push(
          {
            in: "query",
            name: "whereSql",
            required: false,
            schema: { type: "string" },
            description: "Cláusula WHERE estilo SQL (sem o 'WHERE'). Ex: nm_aplicacao ILIKE '%Dom%'"
          },
          {
            in: "query",
            name: "onlyActive",
            required: false,
            schema: { type: "boolean" },
            description: "Se true, aplica filtro de ativo (st_ativo = true)"
          },
          {
            in: "query",
            name: "page",
            required: false,
            schema: { type: "integer", minimum: 1 },
            description: "Página (default 1)"
          },
          {
            in: "query",
            name: "pageSize",
            required: false,
            schema: { type: "integer", minimum: 1, maximum: 100 },
            description: "Itens por página (default 20). Alias de 'limit' no backend."
          },
          {
            in: "query",
            name: "orderBy",
            required: false,
            schema: { type: "string" },
            description: "Campo para ordenação (ex.: 'id_aplicacao', 'nm_aplicacao')"
          },
          {
            in: "query",
            name: "orderDir",
            required: false,
            schema: { type: "string", enum: ["asc", "desc"], default: "asc" },
            description: "Direção da ordenação"
          }
        );
      }

      item.get = {
        summary: summaryForGet(cleanSub, schemaName),
        tags: [schemaName],
        parameters,
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: okSchema
              }
            }
          },
          ...(isById ? { 404: { description: "Não encontrado" } } : {})
        }
      };
    }

    if (method === "post") {
      if (isImportExcel) {
        item.post = {
          summary: `Importar ${schemaName} por planilha Excel`,
          description: "Envie o arquivo gerado pelo endpoint template-excel usando o campo file.",
          tags: [schemaName],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  required: ["file"],
                  properties: { file: { type: "string", format: "binary" } }
                }
              }
            }
          },
          responses: {
            200: {
              description: "Resultado da importação",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      total: { type: "integer" },
                      importados: { type: "integer" },
                      erros: { type: "integer" },
                      detalhesErros: { type: "array", items: { type: "object" } }
                    }
                  }
                }
              }
            },
            400: { description: "Arquivo não enviado ou inválido" }
          }
        };
        continue;
      }

      item.post = {
        summary: `Criar ${schemaName}`,
        tags: [schemaName],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: `#/components/schemas/Create${schemaName}` }
            }
          }
        },
        responses: {
          201: {
            description: "Created",
            content: {
              "application/json": {
                schema: { $ref: `#/components/schemas/${schemaName}` }
              }
            }
          }
        }
      };
    }

    if (method === "put" || method === "patch") {
      item[method] = {
        summary: `Atualizar ${schemaName}`,
        tags: [schemaName],
        security: [{ bearerAuth: [] }],
        parameters: [
          ...(isById
            ? [
                {
                  in: "path",
                  name: "id",
                  required: true,
                  schema: { type: "integer" }
                }
              ]
            : [])
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: `#/components/schemas/Update${schemaName}` }
            }
          }
        },
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: { $ref: `#/components/schemas/${schemaName}` }
              }
            }
          },
          404: { description: "Não encontrado" }
        }
      };
    }

    if (method === "delete") {
      item.delete = {
        summary: `Excluir ${schemaName}`,
        tags: [schemaName],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "integer" }
          }
        ],
        responses: {
          204: { description: "No Content" },
          404: { description: "Não encontrado" }
        }
      };
    }
  }

  return paths;
}


/** ====== MAIN ====== */
type EntityDoc = {
  tagName: string;
  basePath: string;
  entitySchemas: Record<string, any>; // pode ter 1+ schemas (normal ou manual)
  paths: Record<string, any>;
};

const controllers = walk(CONTROLLERS_DIR).filter((p) => p.endsWith(".routes.ts"));
if (controllers.length === 0) {
  console.warn(`⚠️  Nenhum arquivo .routes.ts encontrado em ${CONTROLLERS_DIR}`);
}

const entitiesDocs: EntityDoc[] = [];

for (const routeFile of controllers) {
  // entidade pelo nome do arquivo: ex.: dominio.routes.ts -> dominio | auth.routes.ts -> auth
  const fileName = basename(routeFile).replace(/\\/g, "/");
  const stem = fileName.replace(/\.routes\.tsx?$/i, "");
  const entity = stem;

  const basePath = `/${entity}`;
  const routes = extractRoutesFromFile(routeFile);
  if (routes.length === 0) {
    console.warn(`⚠️  Nenhuma rota encontrada em: ${routeFile}`);
    continue;
  }

  // Se for uma controller manual (ex.: auth), usa o bloco MANUAL_CONTROLLERS
  if (MANUAL_CONTROLLERS[entity]) {
    const manual = MANUAL_CONTROLLERS[entity];
    const paths = manual.buildPaths(routes, basePath);
    entitiesDocs.push({
      tagName: manual.tagName ?? toPascal(entity),
      basePath,
      entitySchemas: manual.schemas,
      paths,
    });
    continue;
  }

  // Caso normal: precisa ter model Prisma
  const model = findPrismaModelByStem(entity);
  if (!model) {
    const list = Prisma.dmmf.datamodel.models.map((m) => m.name).join(", ");
    console.warn(
      `⚠️  Modelo Prisma '${routeFile.replace(CONTROLLERS_DIR + "/", "")}' não mapeia para nenhum model. Disponíveis: ${list}. Ignorando esta controller.`
    );
    continue;
  }

  const schemaName = toPascal(entity.replace(/-/g, "_"));
  const idField = (model.fields.find((f: any) => f.isId)?.name as string) || null;
  const select = findSelectFromRepository(entity);
  const entitySchema = buildEntitySchema(model, select ?? null);
  const { create, update } = deriveCreateUpdateSchemas(entitySchema, idField);
  const paths = buildPathsForEntity(routes, basePath, schemaName);

  entitiesDocs.push({
    tagName: schemaName,
    basePath,
    entitySchemas: {
      [schemaName]: entitySchema,
      [`Create${schemaName}`]: create,
      [`Update${schemaName}`]: update,
    },
    paths,
  });
}

/** AGREGA TODAS ENTIDADES */
const componentsSchemas: Record<string, any> = {};
const pathsAll: Record<string, any> = {};
const tagsAll: { name: string; description?: string }[] = [];

for (const e of entitiesDocs) {
  tagsAll.push({ name: e.tagName, description: `Recursos de ${e.tagName}` });
  Object.assign(componentsSchemas, e.entitySchemas);
  for (const [p, item] of Object.entries(e.paths)) {
    pathsAll[p] = { ...(pathsAll[p] || {}), ...item };
  }
}

const openApiDoc = {
  openapi: "3.0.3",
  info: { title: "API Cognitio", version: "1.0.0" },
  servers: [{ url: "http://localhost:3000" }],
  tags: tagsAll,
  components: {
    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
    },
    schemas: componentsSchemas,
  },
  security: [{ bearerAuth: [] }],
  paths: pathsAll,
};

/** WRITE */
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, OUTPUT_FILE), JSON.stringify(openApiDoc, null, 2), "utf-8");
console.log(`✅ OpenAPI gerado em ${resolve(join(OUTPUT_DIR, OUTPUT_FILE))}`);
