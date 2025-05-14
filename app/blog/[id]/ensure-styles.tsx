"use client"

import { useEffect, useState } from "react"

export function EnsureStyles() {
  const [stylesLoaded, setStylesLoaded] = useState(false)
  const [attemptCount, setAttemptCount] = useState(0)

  useEffect(() => {
    // Перевіряємо, чи стилі вже завантажені
    const checkStyles = () => {
      const styleElement = document.querySelector('link[href="/blog-content.css"]')
      if (styleElement) {
        console.log("blog-content.css is already loaded!")
        setStylesLoaded(true)
        return true
      }
      return false
    }

    // Якщо стилі ще не завантажені, завантажуємо їх
    const loadStyles = () => {
      if (checkStyles()) return

      console.log(`Attempting to load blog-content.css manually (attempt ${attemptCount + 1})...`)

      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = "/blog-content.css"
      link.type = "text/css"

      // Додаємо обробники подій для відстеження завантаження
      link.onload = () => {
        console.log("blog-content.css loaded successfully!")
        setStylesLoaded(true)
      }

      link.onerror = () => {
        console.error("Failed to load blog-content.css")
        // Спробуємо ще раз, якщо кількість спроб менше 3
        if (attemptCount < 3) {
          setTimeout(() => {
            setAttemptCount((prev) => prev + 1)
          }, 1000)
        }
      }

      document.head.appendChild(link)
    }

    loadStyles()
  }, [attemptCount])

  // Додаємо інлайн-стилі для критичних елементів
  return (
    <>
      {!stylesLoaded && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
          /* Стилі для контенту блогу */
          .blog-content {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
              "Helvetica Neue", sans-serif;
            line-height: 1.6;
            color: #f8f9fa;
          }
          
          /* Відступи між абзацами */
          .blog-content p {
            margin-bottom: 1.5em;
            margin-top: 0;
          }
          
          /* Стилі для заголовків */
          .blog-content h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-top: 1.5em;
            margin-bottom: 0.8em;
          }
          
          .blog-content h2 {
            font-size: 2rem;
            font-weight: 700;
            margin-top: 1.4em;
            margin-bottom: 0.7em;
          }
          
          .blog-content h3 {
            font-size: 1.75rem;
            font-weight: 600;
            margin-top: 1.3em;
            margin-bottom: 0.6em;
          }
          
          /* Стилі для списків */
          .blog-content ul,
          .blog-content ol {
            margin-bottom: 1.5em;
            padding-left: 1.5em;
          }
          
          .blog-content li {
            margin-bottom: 0.5em;
          }
        `,
          }}
        />
      )}
    </>
  )
}
