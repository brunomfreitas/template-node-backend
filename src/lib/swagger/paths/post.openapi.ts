/**
 * @openapi
 * /post/search:
 *   get:
 *     summary: Busca posts por texto
 *     description: Pesquisa por título, mensagem ou subtítulo. Retorna apenas posts publicados e com postedAt > agora (conforme regra atual do repositório).
 *     tags: [Post]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema: { type: string, minLength: 1 }
 *         description: Texto de busca
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *     responses:
 *       '200':
 *         description: Resultado paginado da busca
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Post' }
 *                 total:
 *                   type: integer
 *                   example: 42
 */

/**
 * @openapi
 * /post:
 *   get:
 *     summary: Listar posts publicados (paginado)
 *     description: Retorna posts com status "Publicado" e postedAt > agora (conforme regra atual do repositório).
 *     tags: [Post]
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *     responses:
 *       '200':
 *         description: Lista de posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Post' }
 */

/**
 * @openapi
 * /post:
 *   post:
 *     summary: Criar um post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/CreatePost' }
 *     responses:
 *       '201':
 *         description: Criado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Post' }
 *       '400':
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *       '401':
 *         description: Não autenticado
 */

/**
 * @openapi
 * /post/all:
 *   get:
 *     summary: Listar todos os posts
 *     description: Retorna todos os posts (sem filtro de published/postedAt). Mantido como POST para refletir a rota existente.
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *     responses:
 *       '200':
 *         description: Lista paginada de posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Post' }
 *       '401':
 *         description: Não autenticado
 */

/**
 * @openapi
 * /post/{id}:
 *   get:
 *     summary: Buscar post por ID
 *     tags: [Post]
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
 *             schema: { $ref: '#/components/schemas/Post' }
 *       '401':
 *         description: Não autenticado
 *       '404':
 *         description: Não encontrado
 */

/**
 * @openapi
 *  /post/{id}:
 *   put:
 *     summary: Atualizar um post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/UpdatePost' }
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Post' }
 *       '401':
 *         description: Não autenticado
 *       '404':
 *         description: Não encontrado
 */

/**
 * @openapi
 * /post/{id}:
 *   delete:
 *     summary: Remover um post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       '204':
 *         description: Removido (sem corpo)
 *       '401':
 *         description: Não autenticado
 *       '404':
 *         description: Não encontrado
 */
export { };

