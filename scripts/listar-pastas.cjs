// scripts/listar-pastas.cjs
const fs = require('fs');
const path = require('path');

/**
 * Lista todos os arquivos da pasta (recursivo)
 * @param {string} dirPath
 * @param {string[]} acc
 * @returns {string[]}
 */
function listarArquivos(dirPath, acc = []) {
  const itens = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const item of itens) {
    const full = path.join(dirPath, item.name);
    if (item.isDirectory()) {
      listarArquivos(full, acc);
    } else {
      acc.push(full);
    }
  }
  return acc;
}

// ===== Execução via CLI =====
// Uso: node scripts/listar-pastas.cjs "<caminho>" [ext]
// Ex.: node scripts/listar-pastas.cjs "E:\Projeto\...\cognitio-frontend" .js
const dir = process.argv[2];
const ext = (process.argv[3] || '').toLowerCase();

if (!dir) {
  console.error('Informe o caminho da pasta. Ex.: node scripts/listar-pastas.cjs "E:\\Projeto\\..." [.js]');
  process.exit(1);
}

let arquivos = listarArquivos(dir);
if (ext) {
  arquivos = arquivos.filter(f => f.toLowerCase().endsWith(ext));
}

console.log(arquivos.join('\n'));
