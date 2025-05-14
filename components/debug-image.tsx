"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface DebugImageProps {
  src: string | null | undefined
  alt: string
  width?: number
  height?: number
  className?: string
  fallbackSrc?: string
}

export function DebugImage({ src, alt, width = 400, height = 300, className = "", fallbackSrc }: DebugImageProps) {
  const defaultFallback = `/placeholder.svg?height=${height}&width=${width}&query=${encodeURIComponent(alt)}`
  const [imageSrc, setImageSrc] = useState<string>(fallbackSrc || defaultFallback)
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (src && src !== "") {
      setImageSrc(src)
      setError(false)
      setLoaded(false)
    } else {
      setImageSrc(fallbackSrc || defaultFallback)
    }
  }, [src, fallbackSrc, defaultFallback])

  const handleError = () => {
    console.error(`Failed to load image: ${imageSrc}`)
    setError(true)
    setImageSrc(fallbackSrc || defaultFallback)
  }

  return (
    <div className="relative">
      <Image
        src={imageSrc || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${error ? "border-2 border-red-500" : ""} ${
          loaded ? "opacity-100" : "opacity-50"
        } transition-opacity duration-300`}
        onError={handleError}
        onLoad={() => setLoaded(true)}
      />
      {process.env.NODE_ENV === "development" && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-xs p-1 text-white overflow-hidden">
          <div className="truncate">URL: {imageSrc}</div>
          {error && <div className="text-red-400">Error loading image</div>}
        </div>
      )}
    </div>
  )
}
