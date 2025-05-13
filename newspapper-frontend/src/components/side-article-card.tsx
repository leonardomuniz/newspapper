'use client'

import { OutputArticleDTO } from '@/interfaces/OutputArticleDTO'
import { Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'

export interface ArticleCardProps extends OutputArticleDTO {
  articleLink: string
  imageUrl: string | null
  onUpdate?: () => void
  onDelete?: () => void
}

export default function SideArticleCard({ articleLink, title, description, onUpdate, onDelete }: ArticleCardProps) {
  const truncatedDescription = description.length > 90 ? description.slice(0, 90).trim() + '...' : description

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-105 flex">
      <div className="flex-1 p-4 flex flex-col justify-center">
        <h3 className="text-xl font-bold text-[#fa5203] mb-2">
          <Link href={articleLink}>{title}</Link>
        </h3>
        <p className="text-gray-700">{truncatedDescription}</p>
      </div>

      <div className="flex flex-row justify-center items-center gap-4 p-4">
        <button onClick={onUpdate} className="w-10 h-10 flex justify-center items-center bg-[#184479] hover:bg-[#0d325d] text-white rounded-lg">
          <Pencil size={20} />
        </button>
        <button onClick={onDelete} className="w-10 h-10 flex justify-center items-center bg-red-500 hover:bg-red-600 text-white rounded-lg">
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  )
}
