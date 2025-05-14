"use client"

import { useState } from "react"
import Image from "next/image"
import type { ImageProps } from "next/image"

interface ClientImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string
}

export function ClientImage({ fallbackSrc, alt, src, ...props }: ClientImageProps) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <Image
      {...props}
      src={imgSrc || "/placeholder.svg"}
      alt={alt}
      onError={() => {
        if (fallbackSrc && imgSrc !== fallbackSrc) {
          console.error(`Failed to load image: ${imgSrc}`)
          setImgSrc(fallbackSrc)
        }
      }}
    />
  )
}
