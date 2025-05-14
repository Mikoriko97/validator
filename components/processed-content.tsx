"use client"

import { useEffect, useState } from "react"

interface ProcessedContentProps {
  html: string
  className?: string
}

export function ProcessedContent({
  html,
  className = "prose prose-invert prose-purple max-w-none blog-content",
}: ProcessedContentProps) {
  const [processedHtml, setProcessedHtml] = useState(html)

  useEffect(() => {
    if (!html) return setProcessedHtml("")

    try {
      // Створюємо DOM-парсер для роботи з HTML
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, "text/html")

      // Функція для додавання стилів до елементів
      const addStylesToElements = (selector, styles) => {
        const elements = doc.querySelectorAll(selector)
        elements.forEach((el) => {
          // Зберігаємо існуючі стилі
          const existingStyle = el.getAttribute("style") || ""
          // Додаємо нові стилі, зберігаючи існуючі
          el.setAttribute("style", `${existingStyle}; ${styles}`)
        })
      }

      // Додаємо стилі для заголовків
      addStylesToElements(
        "h1",
        "font-size: 2.5rem !important; font-weight: 700 !important; margin-top: 1.5em !important; margin-bottom: 0.8em !important; color: #f8f9fa !important; line-height: 1.3 !important;",
      )
      addStylesToElements(
        "h2",
        "font-size: 2rem !important; font-weight: 700 !important; margin-top: 1.4em !important; margin-bottom: 0.7em !important; color: #f8f9fa !important; line-height: 1.3 !important;",
      )
      addStylesToElements(
        "h3",
        "font-size: 1.75rem !important; font-weight: 600 !important; margin-top: 1.3em !important; margin-bottom: 0.6em !important; color: #f8f9fa !important; line-height: 1.3 !important;",
      )
      addStylesToElements(
        "h4",
        "font-size: 1.5rem !important; font-weight: 600 !important; margin-top: 1.2em !important; margin-bottom: 0.6em !important; color: #f8f9fa !important; line-height: 1.3 !important;",
      )
      addStylesToElements(
        "h5",
        "font-size: 1.25rem !important; font-weight: 600 !important; margin-top: 1.2em !important; margin-bottom: 0.5em !important; color: #f8f9fa !important; line-height: 1.3 !important;",
      )
      addStylesToElements(
        "h6",
        "font-size: 1.1rem !important; font-weight: 600 !important; margin-top: 1.2em !important; margin-bottom: 0.5em !important; color: #f8f9fa !important; line-height: 1.3 !important;",
      )

      // Додаємо стилі для параграфів, включаючи порожні
      addStylesToElements("p", "margin-bottom: 1.5em !important; margin-top: 0 !important; color: #f8f9fa !important;")

      // Додаємо стилі для списків
      addStylesToElements(
        "ul",
        "margin-bottom: 1.5em !important; padding-left: 1.5em !important; list-style-type: disc !important; list-style-position: outside !important;",
      )
      addStylesToElements(
        "ol",
        "margin-bottom: 1.5em !important; padding-left: 1.5em !important; list-style-type: decimal !important; list-style-position: outside !important;",
      )
      addStylesToElements(
        "li",
        "margin-bottom: 0.5em !important; display: list-item !important; color: #f8f9fa !important;",
      )

      // Додаємо стилі для блоків цитат
      addStylesToElements(
        "blockquote",
        "border-left: 4px solid #6c757d !important; padding-left: 1em !important; margin-left: 0 !important; margin-right: 0 !important; font-style: italic !important; margin-bottom: 1.5em !important; color: #f8f9fa !important;",
      )

      // Додаємо стилі для зображень
      addStylesToElements(
        "img",
        "max-width: 100% !important; height: auto !important; margin: 1.5em auto !important; display: block !important; border-radius: 4px !important; object-fit: contain !important;",
      )

      // Додаємо стилі для таблиць
      addStylesToElements(
        "table",
        "width: 100% !important; border-collapse: collapse !important; margin-bottom: 1.5em !important; color: #f8f9fa !important;",
      )
      addStylesToElements(
        "th",
        "border: 1px solid #4a5568 !important; padding: 0.5em !important; background-color: #2d3748 !important; color: #f8f9fa !important;",
      )
      addStylesToElements(
        "td",
        "border: 1px solid #4a5568 !important; padding: 0.5em !important; color: #f8f9fa !important;",
      )

      // Додаємо стилі для коду
      addStylesToElements(
        "pre",
        "background-color: #2d3748 !important; padding: 1em !important; border-radius: 4px !important; overflow-x: auto !important; margin-bottom: 1.5em !important; white-space: pre !important;",
      )
      addStylesToElements(
        "code",
        "background-color: #2d3748 !important; padding: 0.2em 0.4em !important; border-radius: 3px !important; font-family: 'Courier New', Courier, monospace !important; color: #f8f9fa !important;",
      )

      // Додаємо стилі для посилань
      addStylesToElements("a", "color: #90cdf4 !important; text-decoration: none !important;")

      // Зберігаємо оброблений HTML
      setProcessedHtml(doc.body.innerHTML)
    } catch (error) {
      console.error("Error processing HTML content:", error)
      // У випадку помилки, просто використовуємо оригінальний HTML
      setProcessedHtml(html)
    }
  }, [html])

  // Додаємо додаткові класи для забезпечення правильного відображення
  const combinedClassName = `${className} preserve-formatting`

  return <div className={combinedClassName} dangerouslySetInnerHTML={{ __html: processedHtml }} />
}
