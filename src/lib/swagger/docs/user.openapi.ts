/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 10 }
 *         login: { type: string, example: "bruno" }
 *         status: { type: boolean, example: true }
 *         personId: { type: integer, nullable: true, example: 5 }
 *
 *     CreateUser:
 *       type: object
 *       required: [login, password]
 *       properties:
 *         login: { type: string, example: "bruno" }
 *         password: { type: string, example: "123456" }
 *         status: { type: boolean, example: true }
 *         personId: { type: integer, nullable: true, example: 5 }
 *
 *     UpdateUser:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 10 }
 *         login: { type: string, example: "bruno.m" }
 *         password: { type: string, example: "newPass123" }
 *         status: { type: boolean, example: false }
 *         personId: { type: integer, nullable: true, example: 8 }
 */

/**
 * @openapi
 * /user:
 *   get:
 *     summary: Listar usuários
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/User' }
 */

/**
 * @openapi
 * /user:
 *   post:
 *     summary: Criar usuário
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/CreateUser' }
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/User' }
 */

/**
 * @openapi
 * /user/{id}:
 *   get:
 *     summary: Buscar usuário por ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
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
 *             schema: { $ref: '#/components/schemas/User' }
 *       '404': { description: Não encontrado }
 */

/**
 * @openapi
 * /user:
 *   put:
 *     summary: Atualizar usuário
 *     tags: [User]
 *     security:
 *       - bearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/UpdateUser' }
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/User' }
 *       '404': { description: Não encontrado }
 */
export { };

