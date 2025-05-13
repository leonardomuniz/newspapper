import Router, { type Request, type Response } from 'express'

import { AuthenticationUseCase } from '../../business/useCases/authentication/authenticationUseCase'
import { AuthService } from '../service/authService'
import { EncryptionService } from '../service/encryptionService'
import { UserService } from '../service/userService'

export const authRouter = Router()

const authService = new AuthService()
const userService = new UserService()
const encryptionService = new EncryptionService()

const auth = new AuthenticationUseCase(userService, encryptionService, authService)

authRouter.post('/', async (request: Request, response: Response): Promise<Response> => {
  try {
    return response.status(200).json(await auth.run(request.body))
  } catch (error) {
    return response.status(400).json({ message: error })
  }
})
