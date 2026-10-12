import { SiteRepository } from '@/repositories/prisma/site.repository'
import { makeUseCase } from '@/use-cases/factory/make-use-case'
import { UpdateSiteUseCase } from '@/use-cases/site/update'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function update(req: Request, res: Response) {

  	const registerParamsSchema = z.object({
		id: z.coerce.number(),
	})

  	const { id } = registerParamsSchema.parse(req.params)
	
	const registerBodySchema = z.object({    
		nm_site: z.string(),
		id_organizacao: z.coerce.number()
	})

	const { nm_site, id_organizacao } = registerBodySchema.parse(req.body)

  	const updateUseCase = makeUseCase(UpdateSiteUseCase, SiteRepository)

  	const data = await updateUseCase.handler(id, { nm_site, id_organizacao })

  	return res.status(200).json(data)
}
