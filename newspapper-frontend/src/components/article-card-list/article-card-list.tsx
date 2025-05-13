'use client'
import { OutputArticleDTO } from '@/interfaces/OutputArticleDTO'
import { useCallback, useEffect, useRef, useState } from 'react'
import ArticleCard from '../article-card'
import ArticleCardListSkeleton from './article-card-list-skeleton'

interface ArticleCardListProps {
  articles: OutputArticleDTO[]
  getImageUrl: (article: OutputArticleDTO) => string | null
}

export default function ArticleCardList({ articles, getImageUrl }: ArticleCardListProps) {
  const [displayCount, setDisplayCount] = useState<number>(6)
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)

  const loaderRef = useRef<HTMLDivElement | null>(null)

  const loadMore = useCallback(() => {
    if (displayCount >= articles.length) return

    setIsLoadingMore(true)

    setTimeout(() => {
      setDisplayCount((prev) => Math.min(prev + 6, articles.length))
      setIsLoadingMore(false)
    }, 1000)
  }, [displayCount, articles.length])

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0]
      if (entry.isIntersecting && !isLoadingMore && displayCount < articles.length) {
        loadMore()
      }
    },
    [isLoadingMore, displayCount, articles.length, loadMore]
  )

  useEffect(() => {
    const currentLoader = loaderRef.current
    if (!currentLoader) return

    const options = { root: null, rootMargin: '20px', threshold: 1.0 }
    const observer = new IntersectionObserver(handleObserver, options)
    observer.observe(currentLoader)

    return () => {
      observer.unobserve(currentLoader)
    }
  }, [handleObserver])

  return (
    <main>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.slice(0, displayCount).map((article) => (
          <ArticleCard key={article.id} articleLink={`/article/${article.id}`} imageUrl={getImageUrl(article)} {...article} />
        ))}
      </div>
      {isLoadingMore && <ArticleCardListSkeleton />}

      {displayCount < articles.length && <div ref={loaderRef} />}
    </main>
  )
}
