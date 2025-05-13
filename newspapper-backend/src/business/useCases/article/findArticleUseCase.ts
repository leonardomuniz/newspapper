import { OutputArticleDTO } from '../../../domain/dto/article/outputArticleDTO'
import { articleNotFound } from '../../../domain/errors/article'
import { IArticleRepository } from '../../repositories/iArticleRepository'

export class FindArticleUseCase {
  constructor(private articleRepository: IArticleRepository) {}

  async run(articleId: string): Promise<OutputArticleDTO> {
    console.log('START FindArticleByIdUseCase ::', articleId)

    try {
      return await this.checkIfArticleExists(articleId)
    } catch (error) {
      console.log('FindArticleByIdUseCase :: error ::', error)
      throw error
    }
  }

  private async checkIfArticleExists(articleId: string): Promise<OutputArticleDTO> {
    const articleExist = await this.articleRepository.findById(articleId)
    console.log('FindArticleByIdUseCase :: findById ::', articleExist)

    if (!articleExist) {
      console.log('FindArticleByIdUseCase :: error ::', articleNotFound.message)
      throw articleNotFound
    }

    return articleExist
  }
}
