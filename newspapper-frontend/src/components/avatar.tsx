'use client'

import Image from 'next/image'

interface AvatarProps {
  alt: string
  size?: number
  src?: string
  bordered?: boolean
}

export default function Avatar({ alt, size = 40, src, bordered = false }: AvatarProps) {
  const imageSrc = src ? src : '/placeholder-avatar.png'
  const imageElement = <Image src={imageSrc} alt={`user ${alt}`} width={size} height={size} className="rounded-full" />

  if (bordered) {
    return <div className="inline-block rounded-full border-5 border-gray-100">{imageElement}</div>
  }

  return imageElement
}
