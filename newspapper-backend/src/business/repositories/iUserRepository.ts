import { InputCreateUserDTO } from '../../domain/dto/user/inputCreateUserDTO'
import { OutputUserDTO } from '../../domain/dto/user/outputUserDTO'

export interface IUserRepository {
  create(input: InputCreateUserDTO): Promise<Boolean>
  findByEmail(email: string): Promise<OutputUserDTO | null>
  list(): Promise<OutputUserDTO[]>
  findById(userId: string): Promise<OutputUserDTO | null>
}
