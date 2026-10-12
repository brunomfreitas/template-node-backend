// src/repositories/interfaces/company.repository.interface.ts
import { ICompany } from "@/domains/interfaces/company.interface";
import { IPrismaBaseRepository, SearchParams } from "./prisma-base.repository.interface";

export interface ICompanyRepository extends IPrismaBaseRepository<ICompany, SearchParams['where']> {}
