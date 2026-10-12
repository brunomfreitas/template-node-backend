// src/http/controllers/company/company.routes.ts
import { Router } from "express";
import { create } from "./create";
import { findById } from "./find-by-id";
import { list } from "./list";
import { search } from "./search";
import { softDelete } from "./soft-delete";
import { update } from "./update";

const companyRouter = Router();

companyRouter.post("/", create);
companyRouter.get("/editar/:id", findById);
companyRouter.get("/visualizar/:id", findById);
companyRouter.get("/", list);
companyRouter.put("/editar/:id", update);
companyRouter.delete("/:id", softDelete);
companyRouter.get("/search", search);

export default companyRouter;
