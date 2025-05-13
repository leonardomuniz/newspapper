import { OutputUserDTO } from '../../../domain/dto/user/outputUserDTO'
import { IUserRepository } from '../../repositories/iUserRepository'

export class ListUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async run(): Promise<OutputUserDTO[]> {
    console.log('START ListUserUseCase')

    try {
      const response = await this.userRepository.list()
      console.log('ListUserUseCase :: findAll ::', response)

      console.log('FINISH ListUserUseCase')
      return response
    } catch (error) {
      console.log('ListUserUseCase :: error ::', error)

      throw error
    }
  }
}
