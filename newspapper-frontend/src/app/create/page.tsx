'use client'

import Footer from '@/components/footer'
import Header from '@/components/header'
import ToastAlert from '@/components/toast-alert'
import { useAuth } from '@/context/AuthContext'
import { api } from '@/services/axios-config'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'
import * as yup from 'yup'

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

export default function CreateArticlePage() {
  const router = useRouter()
  const { isAuthenticated, user } = useAuth()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tag, setTag] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const isLoggedIn = isAuthenticated() && user

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validação com Yup
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
        formData.append('title', title)
        formData.append('description', description)
        formData.append('tag', tag)
        formData.append('userId', user!.id)
        formData.append('file', file)
        formData.append('imageName', file.name)
        formData.append('imageMimetype', file.type)
        data = formData
      } else {
        data = {
          title,
          description,
          tag,
          userId: user!.id,
          file: null,
          imageName: null,
          imageMimetype: null,
        }
      }

      await api.post('/api/article', data, {
        headers: file ? { 'Content-Type': 'multipart/form-data' } : { 'Content-Type': 'application/json' },
      })

      setToast({ message: 'Artigo criado com sucesso, aguarde enquanto te redirecionamos!', type: 'success' })

      setTimeout(() => {
        router.push(`/user/${user!.id}`)
      }, 3000)
    } catch (err) {
      console.error('Erro ao criar o artigo:', err)
      setError('Erro ao criar o artigo. Tente novamente.')

      setToast({ message: 'Falha ao criar o artigo.', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      {toast && <ToastAlert message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <main className="min-h-screen bg-gray-100 flex flex-col items-center pt-20 pb-8">
        {isLoggedIn ? (
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-8 mt-10">
            <h1 className="text-2xl font-bold mb-6 text-center">Criar Artigo</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="title" className="block text-gray-700 font-medium mb-1">
                  Título
                </label>
                <input id="title" type="text" className="w-full border border-gray-300 rounded p-2" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>

              <div>
                <label htmlFor="description" className="block text-gray-700 font-medium mb-1">
                  Descrição
                </label>
                <textarea id="description" className="w-full border border-gray-300 rounded p-2" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
              </div>

              <div>
                <label htmlFor="tag" className="block text-gray-700 font-medium mb-1">
                  Tag
                </label>
                <input id="tag" type="text" className="w-full border border-gray-300 rounded p-2" value={tag} onChange={(e) => setTag(e.target.value)} required />
              </div>

              <div>
                <label htmlFor="file" className="block text-gray-700 font-medium mb-1">
                  Imagem (opcional)
                </label>
                {/* Botão customizado para escolher arquivo */}
                <label htmlFor="file" className="cursor-pointer inline-block bg-[#184479] hover:bg-[#0d325d] text-white font-semibold py-2 px-4 rounded">
                  Escolher um arquivo
                </label>
                <input id="file" type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                {file && <p className="mt-2 text-gray-600">Arquivo selecionado: {file.name}</p>}
              </div>

              {error && <p className="text-red-600">{error}</p>}

              <div className="flex justify-center">
                <button type="submit" className="bg-[#184479] hover:bg-[#0d325d] text-white font-semibold py-2 px-4 rounded" disabled={loading}>
                  {loading ? 'Criando...' : 'Criar Artigo'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-8 mt-10 flex items-center justify-center">
            <p className="text-gray-700 text-lg">Você precisa estar logado para criar um artigo.</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
