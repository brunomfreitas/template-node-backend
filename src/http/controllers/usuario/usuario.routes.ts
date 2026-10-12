import { Router } from "express";
import { create } from "./create";
import { findById } from "./find-by-id";
import { list } from "./list";
import { search } from "./search";
import { softDelete } from "./soft-delete";
import { update } from "./update";

const usuarioRouter = Router();

usuarioRouter.post("/", create);
usuarioRouter.get("/editar/:id", findById);
usuarioRouter.get("/visualizar/:id", findById);
usuarioRouter.get("/", list);
usuarioRouter.put("/editar/:id", update);
usuarioRouter.delete("/:id", softDelete);
usuarioRouter.get("/search", search);

export default usuarioRouter;