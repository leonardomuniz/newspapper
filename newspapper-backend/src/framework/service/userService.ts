import { IUserRepository } from '../../business/repositories/iUserRepository'
import { InputCreateUserDTO } from '../../domain/dto/user/inputCreateUserDTO'
import { OutputUserDTO } from '../../domain/dto/user/outputUserDTO'
import prismaClient from '../database/connection'

export class UserService implements IUserRepository {
  async list(): Promise<OutputUserDTO[]> {
    console.log('START UserService :: list')

    const response = await prismaClient.user.findMany()
    console.log('UserService :: find ::', response)

    console.log('FINISH UserService :: list')
    return response
  }
  async create(input: InputCreateUserDTO): Promise<Boolean> {
    console.log('START UserService :: create ::', input)

    try {
      const response = await prismaClient.user.create({ data: input })
      console.log('UserService :: save ::', response)

      console.log('FINISH UserService :: create')
      return true
    } catch (error) {
      console.log('UserService :: create ::', error)

      throw error
    }
  }
  async findByEmail(email: string): Promise<OutputUserDTO | null> {
    console.log('START UserService :: findByEmail ::', email)
    try {
      const response = await prismaClient.user.findUnique({ where: { email } })

      console.log('FINISH UserService :: findByEmail ::', response)
      return response
    } catch (error) {
      console.log('UserService :: findByEmail ::', error)

      throw error
    }
  }

  async findById(userId: string): Promise<OutputUserDTO | null> {
    console.log('START UserService :: findById ::', userId)
    try {
      const response = await prismaClient.user.findUnique({ where: { id: userId } })

      console.log('FINISH UserService :: findById ::', response)
      return response
    } catch (error) {
      console.log('UserService :: findById ::', error)

      throw error
    }
  }
}
