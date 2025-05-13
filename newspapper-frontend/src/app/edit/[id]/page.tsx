'use client'

import Footer from '@/components/footer'
import Header from '@/components/header'
import ToastAlert from '@/components/toast-alert'
import { useAuth } from '@/context/AuthContext'
import { OutputArticleDTO } from '@/interfaces/OutputArticleDTO'
import { api } from '@/services/axios-config'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import * as yup from 'yup'

// Schema de validação com Yup:
const schema = yup.object().shape({
  title: yup
    .string()
    .required('O título é obrigatório')
    .trim()
    .test('one-word', 'O título deve ter pelo menos uma palavra', (value) => value !== undefined && value.split(/\s+/).filter((word) => word.length > 0).length >= 1),
  description: yup
    .string()
    .required('A descrição é obrigatória')
    .test('min-words', 'A descrição precisa ter mais de 5 palavras', (value) => {
      const words = value?.trim().split(/\s+/) || []
      return words.length > 5
    }),
  tag: yup
    .string()
    .required('A tag é obrigatória')
    .trim()
    .test('one-word-only', 'A tag deve conter apenas uma única palavra', (value) => value !== undefined && value.split(/\s+/).filter((word) => word.length > 0).length === 1),
})

export default function UpdateArticlePage() {
  const router = useRouter()
  const { id } = useParams()
  const { isAuthenticated, user } = useAuth()

  const [originalArticle, setOriginalArticle] = useState<OutputArticleDTO | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tag, setTag] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const isLoggedIn = isAuthenticated() && user

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await api.get<OutputArticleDTO>(`/api/article/${id}`)
        const article = response.data

        if (article.userId !== user?.id) {
          alert('Você não tem permissão para editar este artigo.')
          router.push('/')
          return
        }

        setOriginalArticle(article)
        setTitle(article.title)
        setDescription(article.description)
        setTag(article.tag)
      } catch (err) {
        console.error('Erro ao buscar o artigo:', err)
        setError('Erro ao carregar os dados do artigo.')
      }
    }

    if (isLoggedIn) {
      fetchArticle()
    }
  }, [id, isLoggedIn, user?.id, router])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await schema.validate({ title, description, tag })
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setError(err.message)
      } else {
        setError('Erro de validação')
      }
      setLoading(false)
      return
    }

    try {
      let data: FormData | object

      if (file) {
        const formData = new FormData()
        formData.append('title', title || originalArticle?.title || '')
        formData.append('description', description || originalArticle?.description || '')
        formData.append('tag', tag || originalArticle?.tag || '')
        formData.append('userId', user!.id)
        formData.append('file', file)
        formData.append('imageName', file.name)
        formData.append('imageMimetype', file.type)
        data = formData
      } else {
        data = {
          title: title || originalArticle?.title || '',
          description: description || originalArticle?.description || '',
          tag: tag || originalArticle?.tag || '',
          userId: user!.id,
          file: originalArticle?.file || null,
          imageName: originalArticle?.imageName || null,
          imageMimetype: originalArticle?.imageMimetype || null,
        }
      }

      await api.put(`/api/article/${id}`, data, {
        headers: file ? { 'Content-Type': 'multipart/form-data' } : { 'Content-Type': 'application/json' },
      })

      setToast({ message: 'Artigo atualizado com sucesso, guarde enquanto te redirecionamos!', type: 'success' })
      setTimeout(() => {
        router.push(`/user/${user!.id}`)
      }, 3000)
    } catch (err) {
      console.error('Erro ao atualizar o artigo:', err)
      setError('Erro ao atualizar o artigo. Tente novamente.')
      setToast({ message: 'Falha ao atualizar o artigo.', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      {toast && <ToastAlert message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <main className="min-h-screen bg-gray-100 flex flex-col items-center pt-20 pb-8">
        {error ? (
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-8 mt-10 flex items-center justify-center">
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        ) : (
          isLoggedIn && (
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-8 mt-10">
              {originalArticle?.file ? (
                <div className="mb-4 flex justify-center" style={{ width: '100%', height: '200px', position: 'relative' }}>
                  <Image
                    src={originalArticle.file.trim() === '' ? '/placeholder-image.png' : originalArticle.file.startsWith('https://media2.dev.to/dynamic/image') ? originalArticle.file : `http://localhost:3030/app/public/${originalArticle.file}`}
                    alt="Preview da imagem"
                    fill
                    className="rounded-md object-cover"
                  />
                </div>
              ) : null}
              <h1 className="text-2xl font-bold mb-6 text-center">Editar Artigo</h1>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label htmlFor="title" className="block text-gray-700 font-medium mb-1">
                    Título
                  </label>
                  <input id="title" type="text" className="w-full border border-gray-300 rounded p-2" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div>
                  <label htmlFor="description" className="block text-gray-700 font-medium mb-1">
                    Descrição
                  </label>
                  <textarea id="description" className="w-full border border-gray-300 rounded p-2" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div>
                  <label htmlFor="tag" className="block text-gray-700 font-medium mb-1">
                    Tag
                  </label>
                  <input id="tag" type="text" className="w-full border border-gray-300 rounded p-2" value={tag} onChange={(e) => setTag(e.target.value)} />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="file" className="block text-gray-700 font-medium mb-1">
                    Imagem (opcional)
                  </label>
                  <label htmlFor="file" className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded w-fit">
                    Escolher um arquivo
                  </label>
                  <input id="file" type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                  {file && <p className="mt-2 text-gray-600">Imagem selecionada: {file.name}</p>}
                </div>

                <div className="flex justify-center">
                  <button type="submit" className="bg-[#184479] text-white font-semibold py-2 px-4 rounded">
                    {loading ? 'Atualizando...' : 'Atualizar Artigo'}
                  </button>
                </div>
              </form>
            </div>
          )
        )}
      </main>
      <Footer />
    </>
  )
}
