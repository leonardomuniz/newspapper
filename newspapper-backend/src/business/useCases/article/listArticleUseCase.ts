import { OutputArticleDTO } from '../../../domain/dto/article/outputArticleDTO'
import { IArticleRepository } from '../../repositories/iArticleRepository'

export class ListArticleUseCase {
  constructor(private articleRepository: IArticleRepository) {}

  async run(): Promise<OutputArticleDTO[]> {
    try {
      const response = await this.articleRepository.list()
      return response
    } catch (error: any) {
      throw error
    }
  }
}
