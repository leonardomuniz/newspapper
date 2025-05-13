import Router, { type Request, type Response } from 'express'

import { CreateArticleUseCase } from '../../business/useCases/article/createArticleUseCase'
import { CreateManyArticlesUseCase } from '../../business/useCases/article/createManyArticleUseCase'
import { DeleteArticleUseCase } from '../../business/useCases/article/deleteArticleUseCase'
import { FindArticleUseCase } from '../../business/useCases/article/findArticleUseCase'
import { FindArticleByUserIdUseCase } from '../../business/useCases/article/findByUserUseCase'
import { ListArticleUseCase } from '../../business/useCases/article/listArticleUseCase'
import { UpdateArticleUseCase } from '../../business/useCases/article/updateArticleUseCase'
import { InputArticleDTO } from '../../domain/dto/article/inputArticleDTO'
import { AuthMiddlware } from '../middleware/authMiddleware'
import { IsPostOwner } from '../middleware/isPostOwnerMiddleware'
import { upload } from '../middleware/multerConfig'
import { ArticleService } from '../service/articleService'
import { UserService } from '../service/userService'

export const articleRouter = Router()

const articleService = new ArticleService()
const userService = new UserService()

const create = new CreateArticleUseCase(articleService, userService)
const list = new ListArticleUseCase(articleService)
const findById = new FindArticleUseCase(articleService)
const update = new UpdateArticleUseCase(articleService, userService)
const deleteArticle = new DeleteArticleUseCase(articleService)
const findByUserId = new FindArticleByUserIdUseCase(articleService, userService)
export const createMany = new CreateManyArticlesUseCase(articleService, userService)

articleRouter.get('/', async (request: Request, response: Response): Promise<Response> => {
  return response.status(200).json(await list.run())
})

articleRouter.get('/:id', async (request: Request, response: Response): Promise<Response> => {
  try {
    const articleId = request.params.id
    return response.status(200).json(await findById.run(articleId))
  } catch (error) {
    return response.status(400).json({ message: error })
  }
})

articleRouter.post('/', AuthMiddlware, upload.single('file'), async (request: Request, response: Response): Promise<Response> => {
  try {
    const { title, description, tag, userId } = request.body as InputArticleDTO

    const filename = request.file ? request.file.filename : null
    const mimetype = request.file ? request.file.mimetype : null

    const normalizedArticle: InputArticleDTO = { title, description, tag, userId, file: filename, imageName: filename, imageMimetype: mimetype }

    return response.status(200).json(await create.run(normalizedArticle))
  } catch (error) {
    return response.status(400).json({ message: error })
  }
})

articleRouter.put('/:id', AuthMiddlware, IsPostOwner, upload.single('file'), async (request: Request, response: Response): Promise<Response> => {
  try {
    const articleId = request.params.id

    const { title, description, tag, userId } = request.body as InputArticleDTO

    const filename = request.file ? request.file.filename : null
    const mimetype = request.file ? request.file.mimetype : null

    const normalizedArticle: InputArticleDTO = { title, description, tag, userId, file: filename, imageName: filename, imageMimetype: mimetype }
    return response.status(200).json(await update.run(articleId, normalizedArticle))
  } catch (error) {
    return response.status(400).json({ message: error })
  }
})

articleRouter.delete('/:id', AuthMiddlware, IsPostOwner, async (request: Request, response: Response): Promise<Response> => {
  try {
    const articleId = request.params.id

    await deleteArticle.run(articleId)
    return response.status(204).send()
  } catch (error) {
    return response.status(400).json({ message: error })
  }
})

articleRouter.get('/user/:userId', AuthMiddlware, async (request: Request, response: Response): Promise<Response> => {
  try {
    const userId = request.params.userId

    return response.status(200).json(await findByUserId.run(userId))
  } catch (error) {
    return response.status(400).json({ message: error })
  }
})
