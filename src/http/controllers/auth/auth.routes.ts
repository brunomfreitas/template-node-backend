//src/http/controllers/auth/auth.routes.ts
import { requireAuth } from "@/http/middlewares/require-auth";
import { Router } from "express";
import { loginHandler } from "./login";
import { meHandler } from "./me";
import { permissionsHandler } from "./permissions";
import { registerHandler } from "./register";

const authRouter = Router();

// POST /auth/register
authRouter.post("/register", registerHandler);

// POST /auth/login
authRouter.post("/login", loginHandler);

// GET /auth/me (protegida)
authRouter.get("/me", requireAuth, meHandler);

// GET /auth/me (protegida)
authRouter.post("/permissions", requireAuth, permissionsHandler);

export default authRouter;
