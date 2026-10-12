/**
 * @openapi
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         message: { type: string, example: "Validation error" }
 *         details:
 *           type: array
 *           items: { type: string }
 *   parameters:
 *     PageParam:
 *       in: query
 *       name: page
 *       schema: { type: integer, minimum: 1, default: 1 }
 *       required: false
 *       description: Página (1..n)
 *     LimitParam:
 *       in: query
 *       name: limit
 *       schema: { type: integer, minimum: 1, maximum: 100, default: 10 }
 *       required: false
 *       description: Tamanho da página
 */
export { };

