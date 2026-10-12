import { Router } from "express";
import { create } from "./create";
import { findById } from "./find-by-id";
import { list } from "./list";
import { softDelete } from "./soft-delete";
import { update } from "./update";

const dominioValorRouter = Router();

dominioValorRouter.post("/", create);
dominioValorRouter.get("/editar/:id", findById);
dominioValorRouter.get("/visualizar/:id", findById);
dominioValorRouter.get("/", list);

dominioValorRouter.put("/editar/:id", update);

dominioValorRouter.delete("/:id", softDelete);

export default dominioValorRouter;