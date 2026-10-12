/**
 * @openapi
 * components:
 *   schemas:
 *     LoginInput:
 *       type: object
 *       required: [login, password]
 *       properties:
 *         login:
 *           type: string
 *           example: "joao"
 *         password:
 *           type: string
 *           example: "123456"
 *
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         user:
 *           $ref: '#/components/schemas/RegisterUser'
 *
 *     RegisterInput:
 *       type: object
 *       required: [login, password, personId]
 *       properties:
 *         login:
 *           type: string
 *           example: "joao"
 *         password:
 *           type: string
 *           example: "123456"
 *         personId:
 *           type: integer
 *           example: 1
 *
 *     RegisterUser:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         login:
 *           type: string
 *           example: "joao"
 *         personId:
 *           type: integer
 *           example: 1
 *
 *     RegisterResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         user:
 *           $ref: '#/components/schemas/RegisterUser'
 */

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Autentica e retorna um JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *           examples:
 *             default:
 *               value:
 *                 login: joao
 *                 password: "123456"
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       '401':
 *         description: Credenciais inválidas
 */

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Cria um usuário e retorna um JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *           examples:
 *             default:
 *               value:
 *                 login: joao
 *                 password: "123456"
 *                 personId: 1
 *     responses:
 *       '201':
 *         description: Criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterResponse'
 *       '400':
 *         description: Dados inválidos
 *       '409':
 *         description: Usuário já existe
 */

export { };

