import { JwtPayload, sign, verify } from 'jsonwebtoken'
import { IAuthService } from '../../business/services/iAuthService'

export class AuthService implements IAuthService {
  private readonly secret = process.env.SECRET!

  async sign(userId: string): Promise<string> {
    console.log('START AuthService :: sign ::', userId)

    try {
      const response = sign({ id: userId }, this.secret, { expiresIn: '1h' })

      console.log('AuthService :: sign ::', response)
      return response
    } catch (error) {
      console.error('AuthService :: sign ::', error)
      throw new Error('Failed to generate token')
    }
  }

  verify(token: string): string | JwtPayload {
    console.log('START AuthService :: verify ::', token)

    try {
      const response = verify(token, this.secret)

      console.log('AuthService :: verify ::', response)
      return response
    } catch (error) {
      console.error('AuthService :: verify ::', error)
      throw new Error('Failed to verify token')
    }
  }
}
