import { InputAuthDTO } from '../../../domain/dto/auth/inputAuthDTO'
import { OutputAuthDTO } from '../../../domain/dto/auth/outputAuthDTO'
import { OutputUserDTO } from '../../../domain/dto/user/outputUserDTO'
import { passwordIsNotValid } from '../../../domain/errors/encryption'
import { userNotFound } from '../../../domain/errors/user'
import { IUserRepository } from '../../repositories/iUserRepository'
import { IAuthService } from '../../services/iAuthService'
import { IEncryptionService } from '../../services/iEncryptionService'

export class AuthenticationUseCase {
  constructor(private userRepository: IUserRepository, private encryptionService: IEncryptionService, private authService: IAuthService) {}

  async run(input: InputAuthDTO): Promise<OutputAuthDTO> {
    console.log('START AuthenticationUseCase ::', input)
    const { email, password } = input

    try {
      const user = await this.checkIfUserExist(email)

      await this.checkIfPasswordIsValid(password, user.password)

      const token = await this.authService.sign(user.id)
      console.log('AuthenticationUseCase :: token ::', token)

      console.log('FINISH AuthenticationUseCase')
      return {
        userId: user.id,
        email,
        token,
      }
    } catch (error) {
      console.log('AuthenticationUseCase :: error ::', error)

      throw error
    }
  }

  private async checkIfUserExist(email: string): Promise<OutputUserDTO> {
    const userExist = await this.userRepository.findByEmail(email)
    console.log('AuthenticationUseCase :: findByEmail ::', userExist)

    if (!userExist) {
      console.log('AuthenticationUseCase :: error ::', userNotFound)

      throw userNotFound.message
    }

    return userExist
  }

  private async checkIfPasswordIsValid(password: string, userPassword: string): Promise<Boolean> {
    const passwordIsValid = await this.encryptionService.compare(password, userPassword)
    console.log('AuthenticationUseCase :: passwordIsValid ::', passwordIsValid)

    if (!passwordIsValid) {
      console.log('AuthenticationUseCase :: error ::', passwordIsValid)

      throw passwordIsNotValid.message
    }

    return true
  }
}
