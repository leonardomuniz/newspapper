import { articleNotFound } from '../../../domain/errors/article'
import { IArticleRepository } from '../../repositories/iArticleRepository'

export class DeleteArticleUseCase {
  constructor(private articleRepository: IArticleRepository) {}

  async run(articleId: string): Promise<Boolean> {
    console.log('START DeleteArticleUseCase ::', articleId)

    try {
      await this.checkIfArticleExists(articleId)

      await this.articleRepository.delete(articleId)
      console.log('FINISH DeleteArticleUseCase :: Successfully deleted')
      return true
    } catch (error) {
      console.log('DeleteArticleUseCase :: error ::', error)
      throw error
    }
  }

  private async checkIfArticleExists(articleId: string): Promise<void> {
    const articleExist = await this.articleRepository.findById(articleId)
    console.log('DeleteArticleUseCase :: findById ::', articleExist)

    if (!articleExist) {
      console.log('DeleteArticleUseCase :: error ::', articleNotFound.message)
      throw articleNotFound
    }
  }
}
