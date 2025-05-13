import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { TokenPayloadDTO } from '../../domain/dto/token/TokenPayloadDTO'
import { tokenNotAllowed, tokenNotProvided } from '../../domain/errors/token'

export function AuthMiddlware(request: Request, response: Response, next: NextFunction) {
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

    next()
  } catch (error) {
    return response.status(401).json({ error: tokenNotAllowed })
  }
}
