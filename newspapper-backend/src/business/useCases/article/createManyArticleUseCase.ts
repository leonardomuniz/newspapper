import { InputArticleDTO, InputManyArticleDTO } from '../../../domain/dto/article/inputArticleDTO'
import { userNotFound } from '../../../domain/errors/user'
import { IArticleRepository } from '../../repositories/iArticleRepository'
import { IUserRepository } from '../../repositories/iUserRepository'

export class CreateManyArticlesUseCase {
  constructor(private articleRepository: IArticleRepository, private userRepository: IUserRepository) {}
  private readonly botOwnerId = process.env.BOT_OWNER_ID

  async run(input: InputManyArticleDTO[]): Promise<boolean> {
    console.log('START CreateManyArticlesUseCase ::', input)

    try {
      if (!this.botOwnerId) {
        throw new Error('BOT_OWNER_ID is not set in environment variables')
      }

      const normalizedArticles: InputArticleDTO[] = input.map((article) => ({
        title: article.title,
        description: article.content,
        tag: '',
        userId: this.botOwnerId || '',
        file: article.cover_image,
        imageName: article.cover_image,
        imageMimetype: null,
      }))

      await this.checkIfUserExist(this.botOwnerId)

      const response = await this.articleRepository.createMany(normalizedArticles)
      console.log('CreateManyArticlesUseCase :: createMany ::', response)

      console.log('FINISH CreateManyArticlesUseCase')
      return response
    } catch (error) {
      console.log('CreateManyArticlesUseCase :: error ::', error)
      throw error
    }
  }

  private async checkIfUserExist(userId: string): Promise<boolean> {
    const userExist = await this.userRepository.findById(userId)
    console.log('CreateManyArticlesUseCase :: findById ::', userExist)

    if (!userExist) {
      console.log('CreateManyArticlesUseCase :: error ::', userNotFound.message)
      throw userNotFound
    }
    return true
  }
}
