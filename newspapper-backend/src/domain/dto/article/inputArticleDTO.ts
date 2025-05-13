export interface InputArticleDTO {
  id?: string
  title: string
  description: string
  tag: string
  userId: string | null
  file: string | null
  imageName: string | null
  imageMimetype: string | null
}

export interface InputManyArticleDTO {
  cover_image: string
  title: string
  content: string
}
