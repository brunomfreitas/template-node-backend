// src/http/controllers/auth.controller.ts
import { requireAuth } from '@/http/middlewares/require-auth'
import { hashPassword, verifyPassword } from '@/lib/auth/crypto'
import { signToken } from '@/lib/auth/jwt'
import prismaClient from '@/lib/prisma/prisma'
import { Request, Response, Router } from 'express'
import { z } from 'zod'

const AuthRouter = Router()

// -------- register --------
const registerSchema = z.object({
	login: z.string().min(3),
	password: z.string().min(6),
	id_pessoa: z.coerce.number().int().positive(),
})

AuthRouter.post('/register', async (req: Request, res: Response) => {

  const { id_pessoa, login, password } = registerSchema.parse(req.body)

  const exists = await prismaClient.usuario.findFirst({ where: { login: login } });
  if (exists) return res.status(409).json({ message: 'Login already in use' })

  const person = await prismaClient.pessoa.findFirst({ where: { id_pessoa: id_pessoa } })
  if (!person) return res.status(404).json({ message: 'Person not found' })

  	const passwordHash = await hashPassword(password)

  	const user = await prismaClient.usuario.create({
		data: {
			id_pessoa: id_pessoa,
			login: login,
			password: passwordHash,        
			dt_cadastro: new Date(),
			st_ativo: true
		}
    });
  

	const token = signToken({ sub: user.id_usuario, pid: user.id_pessoa, login: user.login })

  	return res.status(201).json({
    	token,
    	user: {
      		id: user.id_usuario,
      		login: user.login,
      		id_pessoa: person.id_pessoa,
    	},
	})
})

// -------- login --------
	const loginSchema = z.object({
		login: z.string().min(3),
		password: z.string().min(6),
	})

AuthRouter.post('/login', async (req: Request, res: Response) => {
  	const { login, password } = loginSchema.parse(req.body)

    const user = await prismaClient.usuario.findFirst({ where: { login: login } });
  	if (!user) return res.status(401).json({ message: 'Invalid credentials' }) 

  	const ok = await verifyPassword(password, user.password)
  	if (!ok) return res.status(401).json({ message: 'Invalid credentials' })

  	const token = signToken({ sub: user.id_usuario, pid: user.id_pessoa, login: user.login })

  	return res.json({
    	token,
    	user: {
      		id: user.id_usuario,
      		login: user.login,
      		personId: user.id_pessoa,
    	},
  	})
})

// -------- me --------
AuthRouter.get('/me', requireAuth, async (req: Request, res: Response) => {
  	const { sub: userId } = (req as any).user as { sub: number; pid: number; login: string }

	const user = await prismaClient.usuario.findUnique({ where: { id_usuario: userId } });
  	if (!user) return res.status(404).json({ message: 'User not found' }) 
  
  	return res.json({
	    id: user.id_usuario,
    	login: user.login,
    	personId: user.id_pessoa
  	})
})

export default AuthRouter;
