'use client'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function FeaturedArticleSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative w-full md:w-1/2">
        <Skeleton height={400} width="100%" className="rounded-xl" />
      </div>
      <div className="flex flex-col justify-center md:w-1/2 space-y-4">
        <Skeleton height={40} width="60%" />
        <Skeleton count={3} />
      </div>
    </div>
  )
}
