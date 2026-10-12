// src/http/controllers/person/person.controller.test.ts
import bcrypt from 'bcryptjs';
import type { Express } from 'express';
import request from 'supertest';
import createApp from '../../../app'; // seu app Express (default export)
import { env } from '../../../env';
import prismaClient from '../../../lib/prisma/prisma';
import { formatDate } from '../../../utils/format-date';

let app: Express;
let token: string;

async function resetDb() {
  // Para evitar erro de FK ao limpar as tabelas em SQLite:
  await prismaClient.$executeRawUnsafe('PRAGMA foreign_keys = OFF;');

  // Apague na ordem que respeite FKs do seu schema.
  // Ajuste a lista conforme seu schema Prisma:
  await prismaClient.pessoa.deleteMany({});
  await prismaClient.usuario.deleteMany({});

  await prismaClient.$executeRawUnsafe('PRAGMA foreign_keys = ON;');
}

async function seedUser() {
  const hash = await bcrypt.hash('123456', 10);
  await prismaClient.usuario.create({
    data: {
		id_pessoa: 1,
      	login: 'teste',
      	password: hash
    }
  });
}

describe('[HTTP] PersonController (Prisma/SQLite)', () => {
  beforeAll(async () => {
    // Garante secret antes de criar o app
    env.JWT_SECRET = env.JWT_SECRET || 'test-secret';

    // (Opcional) se usar migrations, garanta que já rodou prisma migrate/db push fora do teste
    // Para SQLite, normalmente já está pronto com `prisma db push`.

    // Zera DB e semeia
    await resetDb();
    await seedUser();

    // Cria app e faz login
    app = await createApp();

    const loginRes = await request(app)
      .post('/auth/login')
      .send({ login: 'teste', password: '123456' });

    expect(loginRes.status).toBe(200);
    token = loginRes.body.token;
    expect(token).toBeTruthy();
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  beforeEach(async () => {
    // Limpa apenas a tabela de Person antes de cada teste
    await prismaClient.$executeRawUnsafe('PRAGMA foreign_keys = OFF;');
    await prismaClient.pessoa.deleteMany({});
    await prismaClient.$executeRawUnsafe('PRAGMA foreign_keys = ON;');
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
      id,
      name: 'Alice Maria',
      cpf: '12345678888',
      birth: '1990-10-01',
      email: 'alice.maria@example.com',
      status: true
    };

    const res = await request(app)
      .put('/person')
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
    };

    expect(respUpdate).toEqual(expect.objectContaining(update));
  });

  it('GET /person/:id deve retornar a pessoa (200)', async () => {
    const person = {
      name: 'Bob',
      cpf: '22222222222',
      birth: '1985-05-20',
      email: 'bob@example.com',
      status: true
    };

    const createRes = await request(app)
      .post('/person')
      .set('Authorization', `Bearer ${token}`)
      .send(person);

    const id = createRes.body.id;

    const findRes = await request(app)
      .get(`/person/${id}`)
      .set('Authorization', `Bearer ${token}`);

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
    };

    await request(app)
      .post('/person')
      .set('Authorization', `Bearer ${token}`)
      .send(person);

    const resp = await request(app)
      .get('/person')
      .set('Authorization', `Bearer ${token}`);

    expect(resp.status).toBe(200);
    // se retornar paginado, você pode checar resp.body.items.length, etc.
  });
});
