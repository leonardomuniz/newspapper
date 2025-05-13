import { InputArticleDTO } from '../../../domain/dto/article/inputArticleDTO'
import { OutputArticleDTO } from '../../../domain/dto/article/outputArticleDTO'
import { articleNotFound } from '../../../domain/errors/article'

import { userNotFound } from '../../../domain/errors/user'
import { IArticleRepository } from '../../repositories/iArticleRepository'
import { IUserRepository } from '../../repositories/iUserRepository'

export class UpdateArticleUseCase {
  constructor(private articleRepository: IArticleRepository, private userRepository: IUserRepository) {}

  async run(articleId: string, input: InputArticleDTO): Promise<OutputArticleDTO> {
    console.log('START UpdateArticleUseCase ::', input)
    const { userId } = input

    try {
      if (!userId) throw userNotFound

      await this.checkIfUserExist(userId)
      await this.checkIfArticleExist(articleId)

      const updatedArticle = await this.articleRepository.update(articleId, input)
      console.log('UpdateArticleUseCase :: update ::', updatedArticle)

      console.log('FINISH UpdateArticleUseCase')
      return updatedArticle
    } catch (error) {
      console.log('UpdateArticleUseCase :: error ::', error)

      throw error
    }
  }

  private async checkIfUserExist(userId: string): Promise<boolean> {
    const userExist = await this.userRepository.findById(userId)
    console.log('UpdateArticleUseCase :: findById ::', userExist)

    if (!userExist) {
      console.log('UpdateArticleUseCase :: error ::', userNotFound.message)
      throw userNotFound
    }

    return true
  }

  private async checkIfArticleExist(articleId: string): Promise<boolean> {
    const articleExist = await this.articleRepository.findById(articleId)
    console.log('UpdateArticleUseCase :: findById ::', articleExist)

    if (!articleExist) {
      console.log('UpdateArticleUseCase :: error ::', articleNotFound.message)
      throw articleNotFound
    }

    return true
  }
}
