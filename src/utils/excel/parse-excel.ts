// import XLSX from 'xlsx';

// export function parseExcel(filePath: string) {
//   const workbook = XLSX.readFile(filePath);

//   const firstSheet = workbook.SheetNames[0];

//   const worksheet = workbook.Sheets[firstSheet];

//   const data = XLSX.utils.sheet_to_json(worksheet, {
//     raw: false,
//     defval: null,
//   });

//   return data;
// }


import XLSX from 'xlsx';

export interface ExcelRow {
  [key: string]: any;
}

export function parseExcel(filePath: string): ExcelRow[] {
  const workbook = XLSX.readFile(filePath);

  const firstSheet = workbook.SheetNames[0];

  const worksheet = workbook.Sheets[firstSheet];

  const data = XLSX.utils.sheet_to_json<ExcelRow>(worksheet, {
    raw: false,
    defval: null,
  });

  return data;
}