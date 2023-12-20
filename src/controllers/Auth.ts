import { RequestHandler } from "express";
import { z } from 'zod'
import { validatePassword } from "../services/authServices/ValidatePassword";
import { createToken } from "../services/authServices/CreateToken";
import { validateToken } from "../services/authServices/ValidateToken";

export const login: RequestHandler = (req, res) => {
    const loginSchema = z.object({
        password: z.string()
    })

    const body = loginSchema.safeParse(req.body)

    if(!body.success) return res.json({error: 'Dados inválidos'})

    if(!validatePassword(body.data.password)) {
        return res.status(403).json({error: 'Acesso negado'})
    }

    return res.json({ token: createToken()})
}

export const validate: RequestHandler = (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(403).json({error: 'Acesso negado'})
    }

    const token = req.headers.authorization?.split(' ')[1];
    if(!validateToken(token)) {
        return res.status(403).json({error: 'Acesso negado'})
    }

    next()
}