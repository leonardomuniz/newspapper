import { IArticleRepository } from '../../business/repositories/iArticleRepository'
import { InputArticleDTO } from '../../domain/dto/article/inputArticleDTO'
import { OutputArticleDTO } from '../../domain/dto/article/outputArticleDTO'
import prismaClient from '../database/connection'

export class ArticleService implements IArticleRepository {
  private readonly botId = process.env.BOT_OWNER_ID

  async create(input: InputArticleDTO): Promise<OutputArticleDTO> {
    const response = await prismaClient.article.create({ data: input })
    return response
  }

  async list(): Promise<OutputArticleDTO[]> {
    const response = await prismaClient.article.findMany()
    return response
  }

  async findById(articleId: string): Promise<OutputArticleDTO | null> {
    console.log('START ArticleService :: findById ::', articleId)
    try {
      const response = await prismaClient.article.findUnique({ where: { id: articleId } })

      console.log('FINISH ArticleService :: findById ::', response)
      return response
    } catch (error) {
      console.log('ArticleService :: findById ::', error)
      throw error
    }
  }

  async update(articleId: string, input: Partial<InputArticleDTO>): Promise<OutputArticleDTO> {
    console.log('START ArticleService :: update ::', articleId)
    try {
      const response = await prismaClient.article.update({
        where: { id: articleId },
        data: input,
      })

      console.log('FINISH ArticleService :: update ::', response)
      return response
    } catch (error) {
      console.log('ArticleService :: update ::', error)
      throw error
    }
  }

  async delete(articleId: string): Promise<Boolean> {
    console.log('START ArticleService :: delete ::', articleId)
    try {
      await prismaClient.article.delete({ where: { id: articleId } })

      console.log('FINISH ArticleService :: delete ')
      return true
    } catch (error) {
      console.log('ArticleService :: delete ::', error)
      throw error
    }
  }

  async findByUserId(userId: string): Promise<OutputArticleDTO[]> {
    console.log('START ArticleService :: findByUserId ::', userId)
    try {
      const response = await prismaClient.article.findMany({ where: { userId } })

      console.log('FINISH ArticleService :: findByUserId ')
      return response
    } catch (error) {
      console.log('ArticleService :: findByUserId ::', error)
      throw error
    }
  }

  async createMany(input: InputArticleDTO[]): Promise<boolean> {
    try {
      const result = await prismaClient.article.createMany({
        data: input,
      })
      console.log('Artigos criados:', result.count)
      return result.count > 0
    } catch (error) {
      console.error('Erro na função createMany:', error)
      throw error
    }
  }
}
