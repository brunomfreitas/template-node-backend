// CÓDIGO V8
// src/http/controllers/pac/pac.routes.ts
import { Router } from "express";
import { create } from "./create";
import { findById } from "./find-by-id";
import { list } from "./list";
import { search } from "./search";
import { softDelete } from "./soft-delete";
import { update } from "./update";

const pacRouter = Router();

pacRouter.post("/", create);
pacRouter.get("/editar/:id", findById);
pacRouter.get("/visualizar/:id", findById);
pacRouter.get("/", list);
pacRouter.put("/editar/:id", update);
pacRouter.delete("/:id", softDelete);
pacRouter.get("/search", search);

export default pacRouter;
