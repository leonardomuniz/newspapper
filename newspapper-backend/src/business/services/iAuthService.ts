import { JwtPayload } from 'jsonwebtoken'

export interface IAuthService {
  sign(userId: string): Promise<string>
  verify(token: string): string | JwtPayload
}
