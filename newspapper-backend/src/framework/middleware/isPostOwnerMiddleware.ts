import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { TokenPayloadDTO } from '../../domain/dto/token/TokenPayloadDTO'
import { articleNotFound, unauthorizedAction } from '../../domain/errors/article'
import { tokenNotAllowed, tokenNotProvided } from '../../domain/errors/token'
import { ArticleService } from '../service/articleService'

const articleService = new ArticleService()

export async function IsPostOwner(request: Request, response: Response, next: NextFunction) {
  const secret = process.env.SECRET!
  const { authorization } = request.headers

  if (!authorization) {
    return response.status(401).json({ error: tokenNotProvided })
  }

  const [, token] = authorization.split(' ')

  try {
    const decoded = verify(token, secret)
    const { id } = decoded as unknown as TokenPayloadDTO

    request.userId = id

    const articleId = request.params.id
    const article = await articleService.findById(articleId)

    if (!article) {
      return response.status(404).json({ error: articleNotFound })
    }

    if (article.userId !== id) {
      return response.status(403).json({ error: unauthorizedAction })
    }

    next()
  } catch (error) {
    return response.status(401).json({ error: tokenNotAllowed })
  }
}
