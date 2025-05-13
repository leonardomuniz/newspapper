import Router, { type Request, type Response } from 'express'

import { CreateUserUseCase } from '../../business/useCases/user/createUserUseCase'
import { FindUserUseCase } from '../../business/useCases/user/findUserUseCase'
import { ListUserUseCase } from '../../business/useCases/user/listUserUseCase'
import { EncryptionService } from '../service/encryptionService'
import { UserService } from '../service/userService'

export const userRouter = Router()

const userService = new UserService()
const encryptionService = new EncryptionService()

const create = new CreateUserUseCase(userService, encryptionService)
const list = new ListUserUseCase(userService)
const find = new FindUserUseCase(userService)

userRouter.post('/', async (request: Request, response: Response): Promise<Response> => {
  try {
    return response.status(200).json(await create.run(request.body))
  } catch (error) {
    return response.status(400).json({ message: error })
  }
})

userRouter.get('/', async (request: Request, response: Response): Promise<Response> => {
  return response.status(200).json(await list.run())
})

userRouter.get('/:id', async (request: Request, response: Response): Promise<Response> => {
  try {
    const userId = request.params.id
    return response.status(200).json(await find.run(userId))
  } catch (error) {
    return response.status(400).json({ message: error })
  }
})
