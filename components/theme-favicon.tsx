"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

export function ThemeFavicon() {
  const { theme, resolvedTheme } = useTheme()

  useEffect(() => {
    const currentTheme = theme === "system" ? resolvedTheme : theme
    if (!currentTheme) return // Skip if theme is not determined yet

    // Function to create or update a favicon link
    const updateOrCreateLink = (rel: string, sizes: string) => {
      // Try to find existing link
      let link = document.querySelector(`link[rel="${rel}"][sizes="${sizes}"]`) as HTMLLinkElement

      // If link doesn't exist, create it
      if (!link) {
        link = document.createElement("link")
        link.rel = rel
        link.sizes = sizes
        document.head.appendChild(link)
      }

      // Update href based on theme
      link.href = currentTheme === "dark" ? "/favicon-light.png" : "/favicon-dark.png"
    }

    // Update or create favicon links
    updateOrCreateLink("icon", "32x32")
    updateOrCreateLink("icon", "16x16")
    updateOrCreateLink("apple-touch-icon", "180x180")
  }, [theme, resolvedTheme])

  return null
}
