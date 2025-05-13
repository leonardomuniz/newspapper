import { OutputArticleDTO } from '../../../domain/dto/article/outputArticleDTO'
import { userNotFound } from '../../../domain/errors/user'
import { IArticleRepository } from '../../repositories/iArticleRepository'
import { IUserRepository } from '../../repositories/iUserRepository'

export class FindArticleByUserIdUseCase {
  constructor(private articleRepository: IArticleRepository, private userRepository: IUserRepository) {}

  async run(userId: string): Promise<OutputArticleDTO[]> {
    console.log('START FindArticleByUserIdUseCase ::', userId)

    try {
      await this.checkIfUserExist(userId)

      const articles = await this.articleRepository.findByUserId(userId)
      console.log('FINISH FindArticleByUserIdUseCase ::', articles)

      return articles
    } catch (error) {
      console.log('FindArticleByUserIdUseCase :: error ::', error)
      throw error
    }
  }

  private async checkIfUserExist(userId: string): Promise<boolean> {
    const userExist = await this.userRepository.findById(userId)
    console.log('FindArticleByUserIdUseCase :: findById ::', userExist)

    if (!userExist) {
      console.log('FindArticleByUserIdUseCase :: error ::', userNotFound.message)
      throw userNotFound
    }

    return true
  }
}
