import prismaClient from '@/lib/prisma/prisma';
import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';

export class ExportTemplateProntuarioExcelUseCase {
  async handler() {
    const workbook = new ExcelJS.Workbook();

    const importSheet = workbook.addWorksheet('IMPORTACAO');
    const organizacoesSheet = workbook.addWorksheet('ORGANIZACOES');
    const sitesSheet = workbook.addWorksheet('SITES');
	const statusProntuarioSheet = workbook.addWorksheet('STATUS_PRONT');
	const statusAtendimentoSheet = workbook.addWorksheet('STATUS_ATEND');	
	const escolasSheet = workbook.addWorksheet('ESCOLAS');
	const seriesSheet = workbook.addWorksheet('SERIES');
	const turnosSheet = workbook.addWorksheet('TURNOS');
	const fonosSheet = workbook.addWorksheet('FONOAUDIOLOGOS');
	const assistentesSheet = workbook.addWorksheet('ASSISTENTES');
	const pacientesSheet = workbook.addWorksheet('PACIENTES');

    // =========================
    // BUSCA DADOS
    // =========================
    const organizacoes = await prismaClient.organizacao.findMany({ where: { st_ativo: true, }, orderBy: { nm_organizacao: 'asc', }, });
    const sites = await prismaClient.site.findMany({ where: { st_ativo: true, }, orderBy: { nm_site: 'asc', }, });
	const statusProntuario = await prismaClient.dominio_valor.findMany({ where: { dominio: { ds_alias: 'ST_PRONTUARIO', }, st_ativo: true, }, orderBy: { ds_dominio_valor: 'asc', }, });
	const statusAtendimento = await prismaClient.dominio_valor.findMany({ where: { dominio: { ds_alias: 'ST_ATENDIMENTO', }, st_ativo: true, }, orderBy: { ds_dominio_valor: 'asc',	}, });
	const escolas = await prismaClient.dominio_valor.findMany({	where: { dominio: { ds_alias: 'ESCOLAS', },	st_ativo: true,	}, orderBy: { ds_dominio_valor: 'asc', }, });
	const series = await prismaClient.dominio_valor.findMany({ where: { dominio: { ds_alias: 'SERIES', }, st_ativo: true, }, orderBy: {	ds_dominio_valor: 'asc', },	});
	const turnos = await prismaClient.dominio_valor.findMany({ where: {	dominio: { ds_alias: 'TURNOS', }, st_ativo: true, }, orderBy: {	ds_dominio_valor: 'asc', },	});

	const fonos = await prismaClient.empresa_pessoa.findMany({ where: { st_ativo: true }, include: { pessoa: true }, orderBy: { pessoa: { nm_pessoa: 'asc'} }, });
	const assistentes = await prismaClient.empresa_pessoa.findMany({ where: { st_ativo: true }, include: { pessoa: true }, orderBy: { pessoa: { nm_pessoa: 'asc'} }, });
	const pacientes = await prismaClient.pessoa.findMany({ where: { st_ativo: true }, orderBy: { nm_pessoa: 'asc' }, });

    // =========================
    // ABA ORGANIZACOES
    // =========================
    organizacoesSheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'NOME', key: 'nome', width: 40 },
    ];

    organizacoes.forEach((item) => {
      organizacoesSheet.addRow({
        id: item.id_organizacao,
        nome: item.nm_organizacao,
      });
    });

    // =========================
    // ABA SITES
    // =========================
    sitesSheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'NOME', key: 'nome', width: 40 },
    ];

    sites.forEach((item) => {
      sitesSheet.addRow({
        id: item.id_site,
        nome: item.nm_site,
      });
    });

	// =========================
    // ABA STATUS PRONTUARIO
    // =========================
    statusProntuarioSheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'NOME', key: 'nome', width: 40 },
    ];

    statusProntuario.forEach((item) => {
      statusProntuarioSheet.addRow({
        id: item.id_dominio_valor,
        nome: item.ds_dominio_valor,
      });
    });

	// =========================
    // ABA STATUS ATENDIMENTO
    // =========================
    statusAtendimentoSheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'NOME', key: 'nome', width: 40 },
    ];

    statusAtendimento.forEach((item) => {
      statusAtendimentoSheet.addRow({
        id: item.id_dominio_valor,
        nome: item.ds_dominio_valor,
      });
    });

	// ============
    // ABA ESCOLAS
    // ============
    escolasSheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'NOME', key: 'nome', width: 40 },
    ];

    escolas.forEach((item) => {
      escolasSheet.addRow({
        id: item.id_dominio_valor,
        nome: item.ds_dominio_valor,
      });
    });


	// ============
    // ABA SÉRIE
    // ============
    seriesSheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'NOME', key: 'nome', width: 40 },
    ];

    series.forEach((item) => {
      seriesSheet.addRow({
        id: item.id_dominio_valor,
        nome: item.ds_dominio_valor,
      });
    });

	// ============
    // ABA TURNOS
    // ============
    turnosSheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'NOME', key: 'nome', width: 40 },
    ];

    turnos.forEach((item) => {
      turnosSheet.addRow({
        id: item.id_dominio_valor,
        nome: item.ds_dominio_valor,
      });
    });

	// ============
    // ABA FONOS
    // ============
    fonosSheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'NOME', key: 'nome', width: 40 },
    ];

    fonos.forEach((item) => {
      fonosSheet.addRow({
        id: item.id_empresa_pessoa,
        nome: item.pessoa.nm_pessoa,
      });
    });

	assistentesSheet.columns = [
	  { header: 'ID', key: 'id', width: 10 },
	  { header: 'NOME', key: 'nome', width: 40 },
	];
	assistentes.forEach((item) => assistentesSheet.addRow({
	  id: item.id_empresa_pessoa,
	  nome: item.pessoa.nm_pessoa,
	}));

	pacientesSheet.columns = [
	  { header: 'ID', key: 'id', width: 10 },
	  { header: 'NOME', key: 'nome', width: 40 },
	];
	pacientes.forEach((item) => pacientesSheet.addRow({
	  id: item.id_pessoa,
	  nome: item.nm_pessoa,
	}));

    // =========================
    // ABA IMPORTACAO
    // =========================
    importSheet.columns = [
      {
        header: 'PRONTUARIO',
        key: 'prontuario',
        width: 40,
      },
      {
        header: 'DH_INICIO_ATENDIMENTO',
        key: 'dh_inicio_atendimento',
        width: 25,
      },
      {
        header: 'DH_TERMINO_ATENDIMENTO',
        key: 'dh_termino_atendimento',
        width: 25,
      },
      {
        header: 'PACIENTE',
        key: 'paciente',
        width: 20,
      },
	  {
        header: 'RESPONSÁVEL',
        key: 'reponsavel',
        width: 20,
      },
	  {
        header: 'TELEFONE',
        key: 'telefone',
        width: 20,
      },
	  {
        header: 'DECLARACAO',
        key: 'declaracao',
        width: 20,
      },
	  {
        header: 'ESCOLA',
        key: 'escola',
        width: 30,
      },
	  {
        header: 'SÉRIE',
        key: 'serie',
        width: 20,
      },
	  {
        header: 'TURNO',
        key: 'turno',
        width: 20,
      },
      {
        header: 'FONOAUDIOLOGO',
        key: 'fonoaudiologo',
        width: 20,
      },
	  {
        header: 'ASSISTENTE',
        key: 'assistente',
        width: 20,
      },	  
      {
        header: 'ORGANIZACAO',
        key: 'organizacao',
        width: 30,
      },
      {
        header: 'SITE',
        key: 'site',
        width: 30,
      },
      {
        header: 'ST_ATENDIMENTO',
        key: 'st_atendimento',
        width: 20,
      },
      {
        header: 'ST_PRONTUARIO',
        key: 'st_prontuario',
        width: 20,
      },
	  
    ];

    // EXEMPLO
    importSheet.addRow({
		prontuario: 'TEMPLATE CARGA INICIAL',
		dh_inicio_atendimento: '01/01/2026 08:00',
		dh_termino_atendimento: '01/01/2026 09:00',
		
		paciente: pacientes[0]?.nm_pessoa,
		reponsavel: 'Nome do responsável',
		telefone: '(61) 91111-2222',
		declaracao: 'Texto livre',
		
		escola: escolas[0]?.ds_dominio_valor,		
		serie: series[0]?.ds_dominio_valor,
		turno: turnos[0]?.ds_dominio_valor,

		fonoaudiologo: fonos[0]?.id_empresa_pessoa,
		assistente: assistentes[0]?.id_empresa_pessoa,

		organizacao: organizacoes[0]?.nm_organizacao,
		site: sites[0]?.nm_site,
		st_atendimento: statusAtendimento[0]?.ds_dominio_valor,
		st_prontuario: statusProntuario[0]?.ds_dominio_valor
    });


	// =================
	// DROPDOWN PACIENTES
	// =================
	for (let i = 2; i <= 1000; i++) {
	  importSheet.getCell(`D${i}`).dataValidation = {
		type: 'list',
		allowBlank: false,
		formulae: [`PACIENTES!$B$2:$B$${pacientes.length + 1}`],
	  };
	}

	// =================
    // DROPDOWN ESCOLAS
    // =================

    for (let i = 2; i <= 1000; i++) {
      importSheet.getCell(`H${i}`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [
          `ESCOLAS!$B$2:$B$${escolas.length + 1}`,
        ],
      };
    }

	// =================
    // DROPDOWN SERIES
    // =================

    for (let i = 2; i <= 1000; i++) {
      importSheet.getCell(`I${i}`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [
          `SERIES!$B$2:$B$${series.length + 1}`,
        ],
      };
    }


	// =================
    // DROPDOWN TURNOS
    // =================

    for (let i = 2; i <= 1000; i++) {
      importSheet.getCell(`J${i}`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [
          `TURNOS!$B$2:$B$${turnos.length + 1}`,
        ],
      };
    }

	// =========================
	// DROPDOWN PROFISSIONAIS
	// =========================
	for (let i = 2; i <= 1000; i++) {
	  importSheet.getCell(`K${i}`).dataValidation = {
		type: 'list',
		allowBlank: false,
		formulae: [`FONOAUDIOLOGOS!$A$2:$A$${fonos.length + 1}`],
	  };
	  importSheet.getCell(`L${i}`).dataValidation = {
		type: 'list',
		allowBlank: true,
		formulae: [`ASSISTENTES!$A$2:$A$${assistentes.length + 1}`],
	  };
	}

	// =========================
    // DROPDOWN ORGANIZACAO
    // =========================

    for (let i = 2; i <= 1000; i++) {
      importSheet.getCell(`M${i}`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [
          `ORGANIZACOES!$B$2:$B$${organizacoes.length + 1}`,
        ],
      };
    }

    // =========================
    // DROPDOWN SITE
    // =========================

    for (let i = 2; i <= 1000; i++) {
      importSheet.getCell(`N${i}`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [
          `SITES!$B$2:$B$${sites.length + 1}`,
        ],
      };
    }

	// ============================
    // DROPDOWN STATUS ATENDIMENTO
    // ============================

    for (let i = 2; i <= 1000; i++) {
      importSheet.getCell(`O${i}`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [
          `STATUS_ATEND!$B$2:$B$${statusAtendimento.length + 1}`,
        ],
      };
    }

	// ===========================
    // DROPDOWN STATUS PRONTUARIO
    // ===========================

    for (let i = 2; i <= 1000; i++) {
      importSheet.getCell(`P${i}`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [
          `STATUS_PRONT!$B$2:$B$${statusProntuario.length + 1}`,
        ],
      };
    }
	
    // =========================
    // ESTILO CABECALHO
    // =========================

    importSheet.getRow(1).font = {
      bold: true,
    };

    // =========================
    // DIRETORIO
    // =========================

    const exportDir =
      path.resolve('tmp/export');

    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, {
        recursive: true,
      });
    }

    const filePath = path.resolve(
      exportDir,
      'template-prontuario.xlsx',
    );

    await workbook.xlsx.writeFile(filePath);

    return filePath;
  }
}

