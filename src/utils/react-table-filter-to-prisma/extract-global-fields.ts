// src/utils/react-table-filter-to-prisma/extract-global-fields.ts
export function getGlobalSearchFieldsFromColumns(columns: any[]): string[] {
  return columns
    .filter((c) => c.fieldType === 'string' && !c.disableGlobalSearch)
    .map((c) => c.accessor);
}
