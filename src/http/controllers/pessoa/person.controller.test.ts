// src/http/controllers/person/person.controller.test.ts
import bcrypt from 'bcryptjs';
import type { Express } from 'express';
import request from 'supertest';
import createApp from '../../../app';
import { Person } from '../../../domain/entities/person.entity';
import { User } from '../../../domain/entities/user.entity';
import { env } from '../../../env';
import { appDataSource } from '../../../lib/typeorm/typeorm';
import { formatDate } from '../../../utils/format-date';

let app: Express;
let token: string;

describe('[HTTP] PessoaController', () => {
	beforeAll(async () => {
		// 1) Garante secret de teste antes de criar o app
	  	env.JWT_SECRET = env.JWT_SECRET || 'test-secret';
    	
		// Opcional: limpar bancos/seqs
	  	await appDataSource.query('PRAGMA foreign_keys=OFF;'); // sqlite

		// 2) Semeia um usuário válido com senha hasheada
	  	const userRepo = appDataSource.getRepository(User);
	  	const hash = await bcrypt.hash('123456', 10);
	  	const user = userRepo.create({
			login: 'teste',
			password: hash
	  	});
	  	
		await userRepo.save(user);
    
    	
		// 3) Cria o app e faz login com senha em texto
	  	app = await createApp();
  
	  	const loginRes = await request(app)
			.post('/auth/login')
			.send({ login: 'teste', password: '123456' });
  
	  	expect(loginRes.status).toBe(200); // ajuda a detectar falhas cedo
	  	token = loginRes.body.token;
	  	expect(token).toBeTruthy();
  	});

	afterAll(async () => {
		// Fecha a conexão após todos os testes
		if (appDataSource.isInitialized) {
			await appDataSource.destroy();
		}
	});

	beforeEach(async () => {
		// Limpa os dados antes de cada teste
		if (appDataSource.isInitialized) {
			const repository = appDataSource.getRepository(Person);
			await repository.clear();
		}
	});

  	it('POST /person deve criar uma pessoa (201)', async () => {
    
		const person = {
			name: 'Alice',
			cpf: '12345678901',
			birth: '1990-01-01',
			email: 'alice@example.com',
			status: true
		};

		const res = await request(app)
			.post('/person')
			.set('Authorization', `Bearer ${token}`)
			.send(person);
		
		expect(res.status).toBe(201);
		expect(res.body).toHaveProperty('id');
		expect(res.body.name).toBe('Alice');
		expect(res.body.cpf).toBe('12345678901');
		expect(formatDate(res.body.birth)).toBe('1990-01-01');
		expect(res.body.email).toBe('alice@example.com');
		expect(res.body.status).toBe(true);    

  	});
  
  	it('PUT /person deve atualizar uma pessoa (200)', async () => {

		const person = {
			name: 'Alice',
			cpf: '12345678901',
			birth: '1990-01-01',
			email: 'alice@example.com',
			status: true
    	};

    	const createResp = await request(app)
			.post('/person')
			.set('Authorization', `Bearer ${token}`)
			.send(person);

		const id = createResp.body.id;

		const update = {
			id: id,
			name: 'Alice Maria',
			cpf: '12345678888',
			birth: '1990-10-01',
			email: 'alice.maria@example.com',
			status: true
		};
    
    	const res = await request(app)
			.put(`/person`)
			.set('Authorization', `Bearer ${token}`)
			.send(update);
    
		expect(res.status).toBe(200);

		const respUpdate = {
			id: res.body.id,
			name: res.body.name,
			cpf: res.body.cpf,
			birth: formatDate(res.body.birth),
			email: res.body.email,
			status: res.body.status
		}

		expect(respUpdate).toEqual(expect.objectContaining(update));

  	});

  	it('GET /person deve retornar a pessoa (200)', async () => {
    
		const person = {
			name: 'Bob',
			cpf: '22222222222',
			birth: '1985-05-20',
			email: 'bob@example.com',
			status: true
		}
	
		const createRes = await request(app)
			.post('/person')
			.set('Authorization', `Bearer ${token}`)
			.send(person);

    	const id = createRes.body.id;

    	const findRes = await request(app).get(`/person/${id}`).set('Authorization', `Bearer ${token}`);
		
    	expect(findRes.status).toBe(200);
		expect(findRes.body).toHaveProperty('id');
		expect(findRes.body.name).toBe('Bob');
		expect(findRes.body.cpf).toBe('22222222222');
		expect(findRes.body.email).toBe('bob@example.com');
		expect(findRes.body.status).toBe(true);

  	});

  	it('GET /person deve retornar todas as pessoas (200)', async () => {

		const person = {
			name: 'Bob',
			cpf: '22222222222',
			birth: '1985-05-20',
			email: 'bob@example.com',
			status: true
		}

		await request(app).post('/person').set('Authorization', `Bearer ${token}`).send(person);

    	const resp = await request(app).get(`/person`).set('Authorization', `Bearer ${token}`);

    	expect(resp.status).toBe(200);
    
  	});

});