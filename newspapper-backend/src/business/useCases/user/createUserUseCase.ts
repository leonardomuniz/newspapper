import { InputCreateUserDTO } from '../../../domain/dto/user/inputCreateUserDTO'
import { userAlredyExist } from '../../../domain/errors/user'
import { IUserRepository } from '../../repositories/iUserRepository'
import { IEncryptionService } from '../../services/iEncryptionService'

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository, private encryptionService: IEncryptionService) {}

  async run(input: InputCreateUserDTO): Promise<Boolean> {
    console.log('START CreateUserUseCase ::', input)
    const { email, password } = input

    try {
      await this.checkIfUserExist(email)

      const normalizedPassword = await this.hashPassword(password)
      console.log('CreateUserUseCase :: normalizedPassword ::', normalizedPassword)

      const response = await this.userRepository.create({ ...input, password: normalizedPassword })
      console.log('CreateUserUseCase :: create ::', response)

      console.log('FINISH CreateUserUseCase')
      return true
    } catch (error) {
      console.log('CreateUserUseCase :: error ::', error)

      throw error
    }
  }

  private async checkIfUserExist(email: string): Promise<boolean> {
    const userExist = await this.userRepository.findByEmail(email)
    console.log('CreateUserUseCase :: findByEmail ::', userExist)

    if (userExist) {
      console.log('CreateUserUseCase :: error ::', userAlredyExist)

      throw userAlredyExist.message
    }

    return true
  }

  private async hashPassword(password: string): Promise<string> {
    console.log('CreateUserUseCase :: hashPassword ')

    return this.encryptionService.hash(password)
  }
}
