'use client'

import FeaturedArticleSkeleton from '@/components/featured-article/featured-article-skeleton'
import Footer from '@/components/footer'
import Header from '@/components/header'
import { OutputArticleDTO } from '@/interfaces/OutputArticleDTO'
import { api } from '@/services/axios-config'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export default function ArticlePage() {
  const { id } = useParams() as { id: string }

  const [article, setArticle] = useState<OutputArticleDTO | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchArticle = useCallback(async () => {
    try {
      const response = await api.get<OutputArticleDTO>(`/api/article/${id}`)
      setArticle(response.data)
    } catch (error) {
      console.error('Erro ao buscar artigo:', error)
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    if (id) fetchArticle()
  }, [id, fetchArticle])

  useEffect(() => window.scrollTo(0, 0), [])

  const getImageUrl = useCallback((article: OutputArticleDTO) => {
    if (!article.file || article.file.trim() === '') {
      return '/placeholder-image.png'
    }

    if (article.file.startsWith('https://media2.dev.to/dynamic/image')) {
      return article.file
    }

    return `http://localhost:3030/app/public/${article.file}`
  }, [])

  const capitalizeFirst = (text: string): string => {
    if (!text) return ''
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <div className="container mx-auto mt-20 px-4 flex-grow">
          <FeaturedArticleSkeleton />
        </div>
        <Footer />
      </main>
    )
  }

  if (!article) {
    return (
      <main className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <div className="container mx-auto mt-20 px-4 flex-grow">
          <p>Artigo não encontrado</p>
        </div>
        <Footer />
      </main>
    )
  }

  const imageUrl = getImageUrl(article)

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <section className="container mx-auto mt-20 px-4 flex-grow">
        <article className="bg-white p-6 md:p-8">
          {imageUrl && (
            <div className="relative w-full h-64 mb-6">
              <Image src={imageUrl} alt={article.title} fill className="object-cover" unoptimized />
            </div>
          )}

          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{capitalizeFirst(article.title)}</h1>
            <p className="text-gray-700 mb-4">{capitalizeFirst(article.description)}</p>
          </div>
        </article>
      </section>
      <Footer />
    </main>
  )
}
