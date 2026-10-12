/**
 * @openapi
 * components:
 *   schemas:
 *     PostStatus:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         name: { type: string, example: "PUBLISHED" }
 *         status: { type: boolean, example: true }
 *
 *     CreatePostStatus:
 *       type: object
 *       required: [name]
 *       properties:
 *         name: { type: string, example: "DRAFT" }
 *         status: { type: boolean, example: true }
 *
 *     UpdatePostStatus:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         name: { type: string, example: "ARCHIVED" }
 *         status: { type: boolean, example: false }
 */

/**
 * @openapi
 * /post-status:
 *   get:
 *     summary: Listar status de post
 *     tags: [PostStatus]
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/PostStatus' }
 */

/**
 * @openapi
 * /post-status/{id}:
 *   get:
 *     summary: Buscar status por ID
 *     tags: [PostStatus]
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
 *             schema: { $ref: '#/components/schemas/PostStatus' }
 *       '404': { description: Não encontrado }
 */

/**
 * @openapi
 * /post-status:
 *   post:
 *     summary: Criar status de post
 *     tags: [PostStatus]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/CreatePostStatus' }
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/PostStatus' }
 */

/**
 * @openapi
 * /post-status:
 *   put:
 *     summary: Atualizar status de post
 *     tags: [PostStatus]
 *     security:
 *       - bearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/UpdatePostStatus' }
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/PostStatus' }
 *       '404': { description: Não encontrado }
 */
export { };

