/**
 * @openapi
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         title: { type: string, example: "My first post" }
 *         subtitle: { type: string, nullable: true, example: "Hello" }
 *         message: { type: string, example: "lorem ipsum" }
 *         image: { type: string, nullable: true, example: "https://cdn/cover.png" }
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-09-30T12:00:00.000Z"
 *         postedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: "2025-10-01T09:00:00.000Z"
 *         createdBy: { type: integer, example: 1 }
 *         postedBy: { type: integer, nullable: true, example: 1 }
 *         category: { type: integer, example: 1 }
 *         status: { type: integer, example: 1 }
 *
 *     CreatePost:
 *       type: object
 *       required: [title, message, status]
 *       properties:
 *         title: { type: string, example: "My first post" }
 *         subtitle: { type: string, nullable: true, example: "subtitle subtitle" }
 *         message: { type: string, example: "message message" }
 *         image: { type: string, nullable: true, example: "https://image/post.png" }
 *         createdBy: { type: integer, example: 1 }
 *         category: { type: integer, example: 1 }
 *         status: { type: integer, example: 1 }
 *
 *     UpdatePost:
 *       type: object
 *       properties:
 *         title: { type: string, example: "My first update post" }
 *         subtitle: { type: string, nullable: true, example: "update subtitle" }
 *         message: { type: string, example: "update message" }
 *         image: { type: string, nullable: true, example: "https://image-update/post.png" }
 *         postedBy: { type: integer, nullable: true, example: 1 }
 *         postedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: "2025-10-01T09:00:00.000Z"
 *         category: { type: integer, example: 1 }
 *         status: { type: integer, example: 1 }
 */
export { };

