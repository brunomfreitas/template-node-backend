import { Router } from "express";
import { create } from "./create";
import { findById } from "./find-by-id";
import { list } from "./list";
import { search } from "./search";
import { softDelete } from "./soft-delete";
import { update } from "./update";

const siteRouter = Router();

siteRouter.post("/", create);
siteRouter.get("/editar/:id", findById);
siteRouter.get("/visualizar/:id", findById);
siteRouter.get("/", list);
siteRouter.put("/editar/:id", update);
siteRouter.delete("/:id", softDelete);
siteRouter.get("/search", search);

export default siteRouter;