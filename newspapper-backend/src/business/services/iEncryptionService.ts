export interface IEncryptionService {
  hash(password: string): Promise<string>
  compare(password: string, userPassword: string): Promise<Boolean>
}
