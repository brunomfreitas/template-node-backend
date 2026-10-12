--select * from cognitio.usuario;
--select * from cognitio.empresa;
--select * from cognitio.organizacao;
--select * from cognitio.aplicacao;
--select * from cognitio.pessoa;
--select * from cognitio.grupo_usuario;
--select * from cognitio.dominio;
--select * from cognitio.dominio_valor;
--select * from cognitio.grupo_seguranca;
--select * from cognitio.grupo_aplicacao_restricao;



/*
  
 
select * from cognitio.prontuario;


INSERT INTO COGNITIO.PRONTUARIO (  
  DS_PRONTUARIO,
  dh_inicio_atendimento,
  dh_termino_atendimento,
  ID_PACIENTE,
  id_escola,
  ID_FONOAUDIOLOGO,
  ID_ASSISTENTE,
  ID_ORGANIZACAO,
  ID_SITE,
  ID_ST_ATENDIMENTO,
  ID_ST_PRONTUARIO,
  ST_ATIVO
) VALUES(
	'Prontuario do João',
	CURRENT_TIMESTAMP,
	CURRENT_TIMESTAMP,
	1,
	9,
	1,
	2,
	1,
	1,
	15,
	19,
	true
);

commit;


-- delete from pac where id_pac = 2;
select * from pac;
insert into COGNITIO.PAC (    
  ID_PRONTUARIO,
  ID_FIGURA_FUNDO,
  ID_LOCALIZACAO_SONORA,
  ID_DICOTICO_DIGITOS,
  ID_ORDENACAO_TEMPORAL,
  ID_DICOTICO_SEQUENCIAL,
  ID_RESOLUCAO_TEMPORAL) values (1,1,null,null,null,null,null);
  
commit;



select * from cognitio.figura_fundo;

INSERT INTO COGNITIO.FIGURA_FUNDO (DS_FIGURA_FUNDO, CS_RECUSA, 
ST_FIGURA_1_IDENTIFICADA,
ST_FIGURA_2_IDENTIFICADA,
ST_FIGURA_3_IDENTIFICADA,
ST_FIGURA_4_IDENTIFICADA,
ST_FIGURA_5_IDENTIFICADA,
ST_FIGURA_6_IDENTIFICADA,
ST_FIGURA_7_IDENTIFICADA,
ST_FIGURA_8_IDENTIFICADA,
SS_TEMPO_RESPOSTA_FIGURA_1,
SS_TEMPO_RESPOSTA_FIGURA_2,
SS_TEMPO_RESPOSTA_FIGURA_3,
SS_TEMPO_RESPOSTA_FIGURA_4,
SS_TEMPO_RESPOSTA_FIGURA_5,
SS_TEMPO_RESPOSTA_FIGURA_6,
SS_TEMPO_RESPOSTA_FIGURA_7,
SS_TEMPO_RESPOSTA_FIGURA_8,
CS_TIPO) VALUES ('descricao figura fundo EXAME', false,false,false,false,false,false,false,false,false,0,0,0,0,0,0,0,0,'E');

commit;

*/

/*
select * from empresa e;
select * from empresa_pessoa ep;

select * from dominio;
update dominio set id_dominio = 9 where id_dominio = 35;
select * from dominio_valor dv;

commit;



select * from pergunta;
insert into pergunta (ds_pergunta, ct_pergunta, id_resposta, st_ativo) values ('Troca palavras em músicas ou canta partes erradas mesmo conhecendo a música ?', 40, 9, true);
insert into pergunta (ds_pergunta, ct_pergunta, id_resposta, st_ativo) values ('Tem dificuldade para decorar letras de músicas ?', 40, 9, true);
insert into pergunta (ds_pergunta, ct_pergunta, id_resposta, st_ativo) values ('Confunde palavras parecidas quando escuta ?', 40, 9, true);
insert into pergunta (ds_pergunta, ct_pergunta, id_resposta, st_ativo) values ('Pede repetição com frequência ou parece entender errado o que foi falado ?', 40, 9, true);
commit;


  ID_PRONTUARIO_PERGUNTA SERIAL PRIMARY KEY,
  ID_PRONTUARIO INT NOT NULL REFERENCES COGNITIO.PRONTUARIO(ID_PRONTUARIO),
  ID_PERGUNTA INT NOT NULL REFERENCES COGNITIO.PERGUNTA(ID_PERGUNTA),
  ID_RESPOSTA INT NOT null REFERENCES COGNITIO.DOMINIO_VALOR(ID_DOMINIO_VALOR),	-- VALOR DA RESPOSTA
  DT_CADASTRO TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,  
  DT_EXCLUSAO TIMESTAMP null,
  ST_ATIVO BOOLEAN DEFAULT true
  

select * from DOMINIO_VALOR;

insert into PRONTUARIO_PERGUNTA (ID_PRONTUARIO, ID_PERGUNTA, ID_RESPOSTA, DT_CADASTRO, st_ativo) values (1,2,44,CURRENT_TIMESTAMP,true);
insert into PRONTUARIO_PERGUNTA (ID_PRONTUARIO, ID_PERGUNTA, ID_RESPOSTA, DT_CADASTRO, st_ativo) values (1,3,44,CURRENT_TIMESTAMP,true);
insert into PRONTUARIO_PERGUNTA (ID_PRONTUARIO, ID_PERGUNTA, ID_RESPOSTA, DT_CADASTRO, st_ativo) values (1,4,44,CURRENT_TIMESTAMP,true);
insert into PRONTUARIO_PERGUNTA (ID_PRONTUARIO, ID_PERGUNTA, ID_RESPOSTA, DT_CADASTRO, st_ativo) values (1,5,44,CURRENT_TIMESTAMP,true);

insert into PRONTUARIO_PERGUNTA (ID_PRONTUARIO, ID_PERGUNTA, ID_RESPOSTA, DT_CADASTRO, st_ativo) values (1,6,43,CURRENT_TIMESTAMP,true);
insert into PRONTUARIO_PERGUNTA (ID_PRONTUARIO, ID_PERGUNTA, ID_RESPOSTA, DT_CADASTRO, st_ativo) values (1,7,42,CURRENT_TIMESTAMP,true);
commit;



*/

--select * from cognitio.usuario;
--select * from cognitio.prontuario;
--select * from cognitio.dominio where id_dominio = 8
--select * from cognitio.dominio_valor where id_dominio = 8

