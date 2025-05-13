export interface OutputArticleDTO {
  id: string
  title: string
  description: string
  tag: string
  date: Date | null
  created_at: Date | null
  updated_at: Date | null
  userId: string | null
  file: string | null
  imageName: string | null
  imageMimetype: string | null
}
