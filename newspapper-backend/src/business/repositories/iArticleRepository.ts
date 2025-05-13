import { InputArticleDTO } from '../../domain/dto/article/inputArticleDTO'
import { OutputArticleDTO } from '../../domain/dto/article/outputArticleDTO'

export interface IArticleRepository {
  create(input: InputArticleDTO): Promise<OutputArticleDTO>
  createMany(input: InputArticleDTO[]): Promise<boolean>
  list(): Promise<OutputArticleDTO[]>
  findById(articleId: string): Promise<OutputArticleDTO | null>
  findByUserId(userId: string): Promise<OutputArticleDTO[]>
  update(articleId: string, input: Partial<InputArticleDTO>): Promise<OutputArticleDTO>
  delete(articleId: string): Promise<Boolean>
}
