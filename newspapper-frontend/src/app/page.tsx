'use client'

import ArticleCardList from '@/components/article-card-list/article-card-list'
import ArticleCardListSkeleton from '@/components/article-card-list/article-card-list-skeleton'
import FeaturedArticle from '@/components/featured-article/featured-article'
import FeaturedArticleSkeleton from '@/components/featured-article/featured-article-skeleton'
import Footer from '@/components/footer'
import Header from '@/components/header'
import { OutputArticleDTO } from '@/interfaces/OutputArticleDTO'
import { api } from '@/services/axios-config'
import { useCallback, useEffect, useMemo, useState } from 'react'

export default function Home() {
  const [articles, setArticles] = useState<OutputArticleDTO[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchArticles = useCallback(async () => {
    try {
      const response = await api.get<OutputArticleDTO[]>('/api/article')
      setArticles(response.data)
    } catch (error) {
      console.error('Erro ao buscar artigos:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchArticles()
  }, [fetchArticles])

  const firstArticle = useMemo(() => articles[0], [articles])

  const getImageUrl = useCallback((article: OutputArticleDTO) => {
    if (!article.file || article.file.trim() === '') {
      return '/placeholder-image.png'
    }

    if (article.file.startsWith('https://media2.dev.to/dynamic/image')) {
      return article.file
    }

    return `http://localhost:3030/app/public/${article.file}`
  }, [])

  const articleCardsList = useMemo(() => (articles.length > 1 ? articles.slice(1) : []), [articles])

  return (
    <main className="min-h-screen md:bg-gray-100 flex flex-col">
      <Header />
      <section className="container mx-auto mt-20 px-4 flex-grow">
        <article className="bg-white p-6 md:p-8">
          {isLoading ? <FeaturedArticleSkeleton /> : firstArticle ? <FeaturedArticle {...firstArticle} articleLink={`/article/${firstArticle.id}`} file={getImageUrl(firstArticle)} /> : <p>Nenhum artigo encontrado</p>}

          <div className="mt-36">
            <h2 className="mb-8 text-2xl font-bold text-gray-800">Últimos Artigos</h2>
            {isLoading ? <ArticleCardListSkeleton /> : <ArticleCardList articles={articleCardsList} getImageUrl={getImageUrl} />}
          </div>
        </article>
      </section>
      <Footer />
    </main>
  )
}
