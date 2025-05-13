/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Button from '@/components/button'
import { InputCreateUserDTO } from '@/interfaces/user/inputUserDTO'
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
    name: yup.string().required('O nome é obrigatório'),
    email: yup.string().email('Informe um email válido').required('O email é obrigatório'),
    password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('A senha é obrigatória'),
  })
  .required()

export default function RegisterPage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InputCreateUserDTO>({
    resolver: yupResolver(schema),
  })

  async function onSubmit(data: InputCreateUserDTO) {
    try {
      await api.post<OutputUserDTO>('/api/user', data)

      router.push('/login')
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erro ao realizar cadastro')
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col">
      <div className="container mx-auto mt-20 px-4 flex-grow">
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="p-5 flex justify-center">
            <Image src="/poder_banner.png" alt="Logo do Poder Tech" width={150} height={150} />
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Cadastro</h1>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-1">
                Nome
              </label>
              <input type="text" id="name" {...register('name')} className={`w-full border border-gray-300 p-2 rounded-md ${errors.name ? 'border-red-500' : ''}`} />
              {errors.name && <p className="text-red-500 mt-1 text-sm">{errors.name.message}</p>}
            </div>
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
              <Button textButton={isSubmitting ? 'Cadastrando...' : 'Cadastrar'} variant="primary" functionButton={handleSubmit(onSubmit)} />
            </div>
          </form>

          <div className="mt-4 text-center">
            <Link href="/login" className="text-[#184479] hover:underline">
              Já tem cadastro? Faça login
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
