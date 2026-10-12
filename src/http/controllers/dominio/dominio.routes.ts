//src/http/controllers/dominio/dominio.routes.ts
import { Router } from "express";
import { create } from "./create";
import { findById } from "./find-by-id";
import { list } from "./list";
import { search } from "./search";
import { softDelete } from "./soft-delete";
import { update } from "./update";

const dominioRouter = Router();

dominioRouter.post("/", create);
dominioRouter.get("/editar/:id", findById);
dominioRouter.get("/visualizar/:id", findById);
dominioRouter.get("/", list);
dominioRouter.put("/editar/:id", update);
dominioRouter.put("/:id", softDelete);
dominioRouter.get("/search", search);

export default dominioRouter;

