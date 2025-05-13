'use client'
import { OutputArticleDTO } from '@/interfaces/OutputArticleDTO'
import Image from 'next/image'
import Link from 'next/link'

interface FeaturedArticleProps extends OutputArticleDTO {
  articleLink: string
}

export default function FeaturedArticle({ title, description, file, articleLink }: FeaturedArticleProps) {
  const imageUrl = file

  const isTruncated = description.length > 90
  const truncatedDescription = isTruncated ? description.slice(0, 90).trim() + '...' : description

  return (
    <article className="container mx-auto max-w-screen-xl p-4">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-10">
        <div className="relative w-full lg:w-1/2 overflow-hidden rounded-xl transform transition-transform duration-300 hover:scale-105">
          <Image src={imageUrl} alt={title} width={700} height={400} className="object-cover w-full h-full" />
        </div>

        <div className="flex flex-col justify-center lg:w-1/2">
          <h2 className="text-3xl font-bold text-[#fa5203]">{title}</h2>
          <p className="mt-2 text-gray-700">{isTruncated ? truncatedDescription : description}</p>

          <Link href={articleLink} className="mt-2 block text-[#fa5203] cursor-pointer">
            Ver mais
          </Link>
        </div>
      </div>
    </article>
  )
}
