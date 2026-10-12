//src/http/controllers/organizacao/organizacao.routes.ts
import { Router } from "express";
import { create } from "./create";
import { findById } from "./find-by-id";
import { list } from "./list";
import { search } from "./search";
import { softDelete } from "./soft-delete";
import { update } from "./update";

const grupoSiteRouter = Router();

grupoSiteRouter.post("/", create);
grupoSiteRouter.get("/editar/:id", findById);
grupoSiteRouter.get("/visualizar/:id", findById);
grupoSiteRouter.get("/", list);
grupoSiteRouter.put("/editar/:id", update);
grupoSiteRouter.delete("/:id", softDelete);
grupoSiteRouter.get("/search", search);

export default grupoSiteRouter;
