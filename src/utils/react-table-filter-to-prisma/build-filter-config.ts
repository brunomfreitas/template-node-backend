// src/utils/react-table-filter-to-prisma/build-filter-config.ts
import { getGlobalSearchFieldsFromColumns } from './extract-global-fields';

export function buildFilterConfigFromColumns(columns: any[]) {
  return {
    globalSearchFields: getGlobalSearchFieldsFromColumns(columns),
    fieldConfigs: Object.fromEntries(
      columns.map((c) => [
        c.accessor,
        {
          type: c.fieldType,
          mode: c.filterMode
        }
      ])
    )
  };
}
