import { Router } from 'express'
import { articleRouter } from '../function/articleFunction'
import { userRouter } from '../function/userFunction'
import { authRouter } from './authenticationFunction'

export const routers = Router()

routers.use('/api/article', articleRouter)
routers.use('/api/user', userRouter)
routers.use('/api/auth', authRouter)
