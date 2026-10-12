// V7
//src/http/controllers/prontuario/prontuario.routes.ts
import { Router } from "express";
import { create } from "./create";
import { findById } from "./find-by-id";
import { list } from "./list";
import { search } from "./search";
import { softDelete } from "./soft-delete";
import { update } from "./update";

import { exportTemplateExcel } from './export-template-excel';
import { importExcel } from './import-excel';
import { upload } from './multer';


const prontuarioRouter = Router();

prontuarioRouter.post("/", create);
prontuarioRouter.get("/editar/:id", findById);
prontuarioRouter.get("/visualizar/:id", findById);
prontuarioRouter.get("/", list);
prontuarioRouter.put("/editar/:id", update);
prontuarioRouter.delete("/:id", softDelete);
prontuarioRouter.get("/search", search);

prontuarioRouter.post('/importar-excel', upload.single('file'), importExcel,);
prontuarioRouter.get( '/template-excel', exportTemplateExcel, );

export default prontuarioRouter;
