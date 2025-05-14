"use client"

import { useEffect, useState } from "react"

export function CssDebugger() {
  const [cssStatus, setCssStatus] = useState<Record<string, boolean>>({})

  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== "development") return

    // Check if CSS files are loaded
    const cssFiles = ["/globals.css", "/blog-content.css"]

    const checkCssLoaded = () => {
      const status: Record<string, boolean> = {}

      // Check all stylesheets
      const styleSheets = document.styleSheets
      for (const file of cssFiles) {
        let found = false
        for (let i = 0; i < styleSheets.length; i++) {
          try {
            const href = styleSheets[i].href
            if (href && href.includes(file)) {
              found = true
              break
            }
          } catch (e) {
            // Some stylesheets may not be accessible due to CORS
          }
        }
        status[file] = found
      }

      setCssStatus(status)
    }

    // Check after a delay to ensure stylesheets are loaded
    setTimeout(checkCssLoaded, 1000)
  }, [])

  // Only show in development
  if (process.env.NODE_ENV !== "development") return null

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white text-xs p-2 rounded z-50">
      <div>CSS Status:</div>
      {Object.entries(cssStatus).map(([file, loaded]) => (
        <div key={file}>
          {file}: {loaded ? "✅" : "❌"}
        </div>
      ))}
    </div>
  )
}
