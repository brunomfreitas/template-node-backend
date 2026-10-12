// src/utils/react-table-filter-to-prisma/index.ts

export type FieldType = 'string' | 'number' | 'boolean' | 'date';

export type ReactTableFilter = {
  id: string;
  value: any;
  fieldType?: FieldType;
  mode?: 'contains' | 'startsWith' | 'endsWith' | 'equals';
};

export type ReactTableFilterPayload = {
  global?: string;
  filters?: ReactTableFilter[];
};

export type FieldConfig = {
  type?: FieldType;
  stringSearchMode?: 'contains' | 'startsWith' | 'endsWith' | 'equals';
  caseInsensitive?: boolean;
  mapValue?: (value: any) => any;
  build?: (value: any) => any;
};

export type GenericFilterConfig = {
  globalSearchFields?: string[];
  fieldConfigs?: Record<string, FieldConfig>;
};

export function parseReactTableFilterJson(
  filterParam?: string,
  config?: GenericFilterConfig
): Record<string, any> {
  if (!filterParam) return {};

//   let payload: ReactTableFilterPayload;
  let payload: any;

  try {
    payload = JSON.parse(filterParam);
  } catch (err) {
    console.warn('Filtro inválido (não é JSON):', filterParam, err);
    return {};
  }

  // 🔹 se não passaram config na chamada, usa o que veio no payload
  const effectiveConfig: GenericFilterConfig | undefined = config ?? payload.config;

  const fieldConfigs = effectiveConfig?.fieldConfigs ?? {};
  const filters = Array.isArray(payload.filters) ? payload.filters : [];

  const fieldWhere: Record<string, any> = {};
  const globalOrConditions: any[] = [];

  // 1) filtros por coluna
  for (const f of filters) {
    if (!f || !f.id) continue;
    const value = f.value;
    if (value === undefined || value === null || value === '') continue;

    const fieldName = f.id;
    const cfg = fieldConfigs[fieldName];

    // build custom override total
    if (cfg?.build) {
      const cond = cfg.build(value);
      if (cond && typeof cond === 'object') {
        (fieldWhere as any)[fieldName] = cond;
      }
      continue;
    }

    // tipo: prioridade = payload -> config -> default string
    const type: FieldType = f.fieldType ?? cfg?.type ?? 'string';

    switch (type) {
      case 'string': {
        const text = String(value).trim();
        if (!text) break;

        // modo: prioridade = payload.mode -> config.stringSearchMode -> 'contains'
        const mode = f.mode ?? cfg?.stringSearchMode ?? 'contains';
        const ci = cfg?.caseInsensitive !== false; // default true

        const common = ci ? { mode: 'insensitive' } : {};
        const cond: any = {};

        if (mode === 'equals') {
          (fieldWhere as any)[fieldName] = text;
        } else if (mode === 'startsWith') {
          cond.startsWith = text;
          Object.assign(cond, common);
          (fieldWhere as any)[fieldName] = cond;
        } else if (mode === 'endsWith') {
          cond.endsWith = text;
          Object.assign(cond, common);
          (fieldWhere as any)[fieldName] = cond;
        } else {
          // contains
          cond.contains = text;
          Object.assign(cond, common);
          (fieldWhere as any)[fieldName] = cond;
        }
        break;
      }

      case 'number': {
        const n = Number(value);
        if (!Number.isFinite(n)) break;
        (fieldWhere as any)[fieldName] = n;
        break;
      }

      case 'boolean': {
        let boolVal: boolean | undefined;

        if (cfg?.mapValue) {
          boolVal = cfg.mapValue(value);
        } else if (typeof value === 'boolean') {
          boolVal = value;
        } else if (typeof value === 'string') {
          const v = value.toLowerCase();
          if (['ativo', 'true', '1', 'yes', 'sim'].includes(v)) boolVal = true;
          if (['inativo', 'false', '0', 'no', 'nao', 'não'].includes(v)) boolVal = false;
        } else if (typeof value === 'number') {
          if (value === 1) boolVal = true;
          if (value === 0) boolVal = false;
        }

        if (typeof boolVal === 'boolean') {
          (fieldWhere as any)[fieldName] = boolVal;
        }
        break;
      }

      case 'date': {
        const d = new Date(value);
        if (!Number.isNaN(d.getTime())) {
          (fieldWhere as any)[fieldName] = d;
        }
        break;
      }

      default: {
        (fieldWhere as any)[fieldName] = value;
      }
    }
  }

  // 2) filtro global (se configurado)
  const globalText = payload.global?.trim();
  const globalSearchFields = effectiveConfig?.globalSearchFields;

  if (globalText && globalSearchFields?.length) {
    for (const fieldName of globalSearchFields) {
      globalOrConditions.push({
        [fieldName]: {
          contains: globalText,
          mode: 'insensitive'
        }
      });
    }
  }

  // 3) combina fieldWhere + OR global
  const hasFieldFilters = Object.keys(fieldWhere).length > 0;
  const hasGlobal = globalOrConditions.length > 0;

  if (hasFieldFilters && hasGlobal) {
    return {
      AND: [fieldWhere, { OR: globalOrConditions }]
    };
  }

  if (hasGlobal) {
    return { OR: globalOrConditions };
  }

  return fieldWhere;
}
