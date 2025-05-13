import { InputArticleDTO } from '../../../domain/dto/article/inputArticleDTO'
import { OutputArticleDTO } from '../../../domain/dto/article/outputArticleDTO'
import { userNotFound } from '../../../domain/errors/user'
import { IArticleRepository } from '../../repositories/iArticleRepository'
import { IUserRepository } from '../../repositories/iUserRepository'

export class CreateArticleUseCase {
  constructor(private articleRepository: IArticleRepository, private userRepository: IUserRepository) {}

  async run(input: InputArticleDTO): Promise<OutputArticleDTO> {
    console.log('START CreateArticleUseCase ::', input)
    const { userId } = input

    try {
      if (!userId) throw userNotFound

      await this.checkIfUserExist(userId)

      const response = await this.articleRepository.create(input)
      console.log('CreateArticleUseCase :: create ::', response)

      console.log('FINISH CreateArticleUseCase')
      return response
    } catch (error) {
      console.log('CreateArticleUseCase :: error ::', error)

      throw error
    }
  }

  private async checkIfUserExist(userId: string): Promise<boolean> {
    const userExist = await this.userRepository.findById(userId)
    console.log('CreateArticleUseCase :: findById ::', userExist)

    if (!userExist) {
      console.log('CreateArticleUseCase :: error ::', userNotFound.message)

      throw userNotFound
    }

    return true
  }
}
