"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function NetlifyCssDebugger() {
  // Змінна для контролю відображення дебагера
  const isDevelopment = process.env.NODE_ENV === "development"
  const showDebugButton = false // Встановіть в true, якщо потрібно показати кнопку

  // Якщо не в режимі розробки і не потрібно показувати кнопку, повертаємо null
  if (!isDevelopment && !showDebugButton) {
    return null
  }

  const [showDebug, setShowDebug] = useState(false)
  const [cssRules, setCssRules] = useState<string[]>([])
  const [missingRules, setMissingRules] = useState<string[]>([])

  useEffect(() => {
    let allRules: string[] = []
    let missing: string[] = []

    if (showDebug) {
      // Collect all CSS rules that apply to lists
      allRules = []
      const expectedRules = ["ul", "ol", "li", ".prose ul", ".prose ol", ".prose li", "list-style-type"]

      // Check which expected rules are missing
      missing = []

      // Get all stylesheets
      for (let i = 0; i < document.styleSheets.length; i++) {
        try {
          const sheet = document.styleSheets[i]
          const rules = sheet.cssRules || sheet.rules

          if (rules) {
            for (let j = 0; j < rules.length; j++) {
              const rule = rules[j]
              const ruleText = rule.cssText

              // Check if this rule applies to lists
              if (expectedRules.some((term) => ruleText.includes(term))) {
                allRules.push(ruleText)
              }
            }
          }
        } catch (e) {
          // CORS error when accessing stylesheet from different origin
          console.warn("Cannot access stylesheet", e)
        }
      }

      // Check which expected rules are missing
      expectedRules.forEach((rule) => {
        const hasRule = allRules.some((r) => r.includes(rule))
        if (!hasRule) {
          missing.push(rule)
        }
      })
    }

    setCssRules(allRules)
    setMissingRules(missing)
  }, [showDebug])

  // Якщо не потрібно показувати кнопку, але ми в режимі розробки,
  // все одно виконуємо логіку, але не відображаємо UI
  if (!showDebugButton) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button onClick={() => setShowDebug(!showDebug)} className="bg-purple-600 hover:bg-purple-700">
        {showDebug ? "Сховати" : "Показати"} CSS Діагностику
      </Button>

      {showDebug && (
        <div className="fixed inset-0 bg-black/90 overflow-auto p-4">
          <div className="max-w-4xl mx-auto bg-gray-900 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">CSS Діагностика для списків</h2>
              <Button onClick={() => setShowDebug(false)} variant="outline">
                Закрити
              </Button>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-purple-300 mb-2">Тестові списки:</h3>
              <div className="bg-black/50 p-4 rounded-md mb-4">
                <h4 className="text-white mb-2">Нумерований список:</h4>
                <ol className="prose prose-invert">
                  <li>Перший пункт</li>
                  <li>Другий пункт</li>
                  <li>Третій пункт</li>
                </ol>
              </div>

              <div className="bg-black/50 p-4 rounded-md">
                <h4 className="text-white mb-2">Маркований список:</h4>
                <ul className="prose prose-invert">
                  <li>Перший пункт</li>
                  <li>Другий пункт</li>
                  <li>Третій пункт</li>
                </ul>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-purple-300 mb-2">Відсутні CSS правила:</h3>
              {missingRules.length > 0 ? (
                <div className="bg-red-900/30 p-4 rounded-md">
                  <ul className="list-disc pl-5 text-red-300">
                    {missingRules.map((rule, index) => (
                      <li key={index}>{rule}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="bg-green-900/30 p-4 rounded-md text-green-300">Всі очікувані CSS правила знайдено.</div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-purple-300 mb-2">Знайдені CSS правила для списків:</h3>
              <div className="bg-black/50 p-4 rounded-md overflow-auto max-h-96">
                <pre className="text-xs text-gray-400">
                  {cssRules.length > 0 ? cssRules.join("\n\n") : "Не знайдено CSS правил для списків."}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
