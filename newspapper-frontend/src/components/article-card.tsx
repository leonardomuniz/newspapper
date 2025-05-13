'use client'

import { OutputArticleDTO } from '@/interfaces/OutputArticleDTO'
import Image from 'next/image'
import Link from 'next/link'

export interface ArticleCardProps extends OutputArticleDTO {
  articleLink: string
  imageUrl: string | null
}

export default function ArticleCard({ articleLink, title, description, imageUrl }: ArticleCardProps) {
  const truncatedDescription = description.length > 90 ? description.slice(0, 90).trim() + '...' : description

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-105">
      {imageUrl ? (
        <Link href={articleLink}>
          <div className="relative w-full h-48">
            <Image src={imageUrl} alt={title} fill className="object-cover" unoptimized />
          </div>
        </Link>
      ) : null}

      <div className="p-4">
        <h3 className="text-xl font-bold text-[#fa5203] mb-2">
          <Link href={articleLink}>{title}</Link>
        </h3>

        <p className="text-gray-700 mb-4">{truncatedDescription}</p>

        <Link href={articleLink}>
          <span className="text-[#fa5203] font-semibold hover:underline cursor-pointer">Ver mais</span>
        </Link>
      </div>
    </div>
  )
}
