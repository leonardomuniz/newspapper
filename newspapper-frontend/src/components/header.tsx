'use client'

import { useAuth } from '@/context/AuthContext'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import imageLogo from '../../public/poder_banner.png'
import Avatar from './avatar'
import Button from './button'

export default function Header() {
  const router = useRouter()
  const { isAuthenticated, user } = useAuth()

  const goToLogin = () => {
    router.push('/login')
  }

  const goToCreateArticle = () => {
    router.push('/create')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-md bg-white">
      <div className="mx-auto max-w-screen-xl py-6 px-6">
        <div className="md:hidden flex justify-center items-center">
          <Link href="/">
            <Image src={imageLogo} alt="Logo do Poder Tech" width={150} quality={100} priority />
          </Link>
        </div>

        <div className="hidden md:flex lg:hidden items-center justify-center relative">
          <Link href="/">
            <Image src={imageLogo} alt="Logo do Poder Tech" width={150} quality={100} priority />
          </Link>
          <div className="absolute right-4">
            {isAuthenticated() && user ? (
              <Link href={`/user/${user.id}`}>
                <Avatar alt={user.name} size={40} />
              </Link>
            ) : (
              <Button textButton="Logar" variant="outlined" functionButton={goToLogin} />
            )}
          </div>
        </div>

        <div className="hidden lg:flex justify-between items-center">
          <div>
            <Link href="/">
              <Image src={imageLogo} alt="Logo do Poder Tech" width={150} quality={100} priority />
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated() && user ? (
              <>
                <Link href={`/user/${user.id}`}>
                  <Avatar alt={user.name} size={40} />
                </Link>
                <Button textButton="Criar Artigo" variant="outlined" functionButton={goToCreateArticle} />
              </>
            ) : (
              <Button textButton="Logar" variant="outlined" functionButton={goToLogin} />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
