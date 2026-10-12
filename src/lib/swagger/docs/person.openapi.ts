/** Mantém os comentários @openapi no JS emitido */
export const __openapi_person = true;

/**
 * @openapi
 * components:
 *   schemas:
 *     Person:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         name: { type: string, example: "Alice" }
 *         cpf: { type: string, example: "12345678901" }
 *         birth: { type: string, format: date, example: "1990-10-01" }
 *         email: { type: string, format: email, example: "alice@example.com" }
 *         status: { type: boolean, example: true }
 *
 *     CreatePerson:
 *       type: object
 *       required: [name, cpf, birth, email, status]
 *       properties:
 *         name: { type: string }
 *         cpf: { type: string }
 *         birth: { type: string, format: date }
 *         email: { type: string, format: email }
 *         status: { type: boolean }
 *
 *     UpdatePerson:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         name: { type: string }
 *         cpf: { type: string }
 *         birth: { type: string, format: date }
 *         email: { type: string, format: email }
 *         status: { type: boolean }
 */

/**
 * @openapi
 * /person:
 *   get:
 *     summary: Listar pessoas (paginado)
 *     tags: [Person]
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *     responses:
 *       '200':
 *         description: Lista de pessoas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Person' }
 */

/**
 * @openapi
 * /person:
 *   post:
 *     summary: Criar uma pessoa
 *     tags: [Person]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/CreatePerson' }
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Person' }
 *       '400':
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 */

/**
 * @openapi
 * /person/{id}:
 *   get:
 *     summary: Buscar pessoa por ID
 *     tags: [Person]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Person' }
 *       '404': { description: Não encontrada }
 */

/**
 * @openapi
 * /person:
 *   put:
 *     summary: Atualizar uma pessoa
 *     tags: [Person] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/UpdatePerson' }
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Person' }
 *       '404': { description: Não encontrada }
 */
export { };

