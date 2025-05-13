/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Button from '@/components/button'
import { useAuth } from '@/context/AuthContext'
import { InputAuthDTO } from '@/interfaces/auth/inputAuthDTO'
import { OutputAuthDTO } from '@/interfaces/auth/outputAuthDTO'
import { OutputUserDTO } from '@/interfaces/user/OutputUserDTO'
import { api } from '@/services/axios-config'
import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup
  .object({
    email: yup.string().email('Por favor, insira um endereço de email válido').required('O email é obrigatório'),
    password: yup.string().required('A senha é obrigatória'),
  })
  .required()

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InputAuthDTO>({
    resolver: yupResolver(schema),
  })

  async function onSubmit(data: InputAuthDTO) {
    try {
      const response = await api.post<OutputAuthDTO>('/api/auth', data)
      const authData = response.data

      const userResponse = await api.get<OutputUserDTO>(`/api/user/${authData.userId}`)
      const userData = userResponse.data

      login(authData.token, {
        id: userData.id,
        name: userData.name,
        email: userData.email,
      })

      router.push('/')
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erro ao fazer login')
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col">
      <div className="container mx-auto mt-20 px-4 flex-grow">
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="p-5 flex justify-center">
            <Image src="/poder_banner.png" alt="Logo do Poder Tech" width={150} height={150} />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-1">
                Email
              </label>
              <input type="email" id="email" {...register('email')} className={`w-full border border-gray-300 p-2 rounded-md ${errors.email ? 'border-red-500' : ''}`} />
              {errors.email && <p className="text-red-500 mt-1 text-sm">{errors.email.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 mb-1">
                Senha
              </label>
              <input type="password" id="password" {...register('password')} className={`w-full border border-gray-300 p-2 rounded-md ${errors.password ? 'border-red-500' : ''}`} />
              {errors.password && <p className="text-red-500 mt-1 text-sm">{errors.password.message}</p>}
            </div>

            <div className="flex justify-center py-5">
              <Button textButton={isSubmitting ? 'Entrando...' : 'Entrar'} variant="primary" functionButton={handleSubmit(onSubmit)} />
            </div>
          </form>

          <div className="mt-4 text-center">
            <Link href="/register" className="text-[#184479] hover:underline">
              Ainda não tem cadastro? Cadastre-se
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
