'use client'

import Avatar from '@/components/avatar'
import Button from '@/components/button'
import Footer from '@/components/footer'
import Header from '@/components/header'
import SideArticleCard from '@/components/side-article-card'
import ToastAlert from '@/components/toast-alert'
import { useAuth } from '@/context/AuthContext'
import { OutputArticleDTO } from '@/interfaces/OutputArticleDTO'
import { api } from '@/services/axios-config'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'

export default function UserPage() {
  const router = useRouter()
  const { isAuthenticated, user, logout } = useAuth()
  const [articles, setArticles] = useState<OutputArticleDTO[]>([])
  const [authLoaded, setAuthLoaded] = useState<boolean>(false)
  const [toast, setToast] = useState<{ articleName: string; type: 'success' | 'error' } | null>(null)

  const fetchArticles = useCallback(async () => {
    if (user?.id) {
      try {
        const response = await api.get(`/api/article/user/${user.id}`)
        setArticles(response.data)
      } catch (error) {
        console.error('Erro ao buscar artigos:', error)
      }
    }
  }, [user?.id])

  useEffect(() => {
    if (user !== undefined) {
      setAuthLoaded(true)
    }
  }, [user])

  useEffect(() => {
    if (authLoaded && !isAuthenticated()) {
      if (user !== null) {
        alert('Esse perfil não é o seu!')
      }
      router.push('/')
    }
  }, [authLoaded, isAuthenticated, user, router])

  useEffect(() => {
    if (isAuthenticated() && user?.id) {
      fetchArticles()
    }
  }, [isAuthenticated, user, fetchArticles])

  const handleUpdate = (articleId: string) => {
    router.push(`/edit/${articleId}`)
  }

  const handleDelete = async (articleId: string) => {
    const confirmDelete = confirm('Você tem certeza que deseja deletar este artigo? Essa ação não terá volta!')

    if (confirmDelete) {
      const articleToDelete = articles.find((article) => article.id === articleId)

      try {
        await api.delete(`/api/article/${articleId}`)

        fetchArticles()

        if (articleToDelete) {
          setToast({ articleName: articleToDelete.title, type: 'success' })
        }
      } catch (error) {
        console.error('Erro ao deletar artigo:', error)

        if (articleToDelete) {
          setToast({ articleName: articleToDelete.title, type: 'error' })
        }
      }
    }
  }

  const mappedArticles = useMemo(() => {
    return articles.map((article) => ({
      ...article,
      articleLink: `/article/${article.id}`,
      imageUrl: article.file ? article.file : null,
    }))
  }, [articles])

  if (!isAuthenticated()) return null

  return (
    <>
      <Header />
      {toast && <ToastAlert message={`Artigo ${toast.articleName} deletado com sucesso`} type={toast.type} onClose={() => setToast(null)} />}
      <main className="min-h-screen bg-gray-100 flex justify-center p-8 mt-20">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl relative pt-20 px-8 pb-8 mt-16">
          <div className="absolute left-1/2 transform -translate-x-1/2" style={{ top: '-60px' }}>
            <Avatar alt={user!.name} size={120} bordered={true} />
          </div>

          <div className="flex flex-col items-center mt-4">
            <h1 className="text-3xl font-bold">{user?.name}</h1>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-semibold text-left">Seus artigos</h2>
            <div className="mt-4 flex flex-col gap-4">
              {mappedArticles.length > 0 ? (
                mappedArticles.map((article) => <SideArticleCard key={article.id} {...article} onUpdate={() => handleUpdate(article.id)} onDelete={() => handleDelete(article.id)} />)
              ) : (
                <p className="text-gray-500 text-center">Você ainda não tem posts</p>
              )}
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <Button textButton="Logout" variant="outlined" functionButton={logout} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
