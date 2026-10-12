/**
 * @openapi
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 3 }
 *         name: { type: string, example: "Tech" }
 *         status: { type: boolean, example: true }
 *
 *     CreateCategory:
 *       type: object
 *       required: [name]
 *       properties:
 *         name: { type: string, example: "Tech" }
 *         status: { type: boolean, example: true }
 *
 *     UpdateCategory:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 3 }
 *         name: { type: string, example: "Tech (renamed)" }
 *         status: { type: boolean, example: false }
 */

/**
 * @openapi
 * /category:
 *   get:
 *     summary: Listar categorias
 *     tags: [Category]
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Category' }
 */

/**
 * @openapi
 * /category:
 *   post:
 *     summary: Criar categoria
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/CreateCategory' }
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Category' }
 */

/**
 * @openapi
 * /category/{id}:
 *   get:
 *     summary: Buscar categoria por ID
 *     tags: [Category]
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
 *             schema: { $ref: '#/components/schemas/Category' }
 *       '404': { description: Não encontrada }
 */

/**
 * @openapi
 * /category:
 *   put:
 *     summary: Atualizar categoria
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/UpdateCategory' }
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Category' }
 *       '404': { description: Não encontrada }
 */
export { };

