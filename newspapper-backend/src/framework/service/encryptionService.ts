import { compare, hash } from 'bcryptjs'
import { IEncryptionService } from '../../business/services/iEncryptionService'

export class EncryptionService implements IEncryptionService {
  private readonly salt: number = parseInt(process.env.SALT!)

  async hash(password: string): Promise<string> {
    console.log('START EncryptionService :: hash')

    try {
      const response = await hash(password, this.salt)
      console.log('EncryptionService :: hash ::', response)

      console.log('FINISH EncryptionService :: hash')
      return response
    } catch (error) {
      console.log('EncryptionService :: hash ::', error)

      throw error
    }
  }

  async compare(password: string, userPassword: string): Promise<Boolean> {
    console.log('START EncryptionService :: compare')

    try {
      const response = await compare(password, userPassword)
      console.log('EncryptionService :: compare ::', response)

      console.log('FINISH EncryptionService :: compare')
      return response
    } catch (error) {
      console.log('EncryptionService :: compare ::', error)

      throw error
    }
  }
}
