import { OutputUserDTO } from '../../../domain/dto/user/outputUserDTO'
import { userNotFound } from '../../../domain/errors/user'
import { IUserRepository } from '../../repositories/iUserRepository'

export class FindUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async run(articleId: string): Promise<OutputUserDTO> {
    console.log('START FindUserUseCase ::', articleId)

    try {
      return await this.checkIfUserExist(articleId)
    } catch (error) {
      console.log('FindUserUseCase :: error ::', error)
      throw error
    }
  }

  private async checkIfUserExist(userId: string): Promise<OutputUserDTO> {
    const userExist = await this.userRepository.findById(userId)
    console.log('FindUserUseCase :: findById ::', userExist)

    if (!userExist) {
      console.log('FindUserUseCase :: error ::', userNotFound.message)
      throw userNotFound
    }

    return userExist
  }
}
