'use client'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function ArticleCardListSkeleton() {
  const skeletonItems = Array.from({ length: 6 })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {skeletonItems.map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden p-4">
          <Skeleton height={200} className="rounded-md" />
          <div className="mt-4">
            <Skeleton height={24} width="80%" />
            <Skeleton count={2} />
          </div>
        </div>
      ))}
    </div>
  )
}
