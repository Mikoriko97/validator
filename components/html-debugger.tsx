"use client"

import { useState } from "react"

interface HtmlDebuggerProps {
  html: string
}

export function HtmlDebugger({ html }: HtmlDebuggerProps) {
  const [showDebug, setShowDebug] = useState(false)

  if (!html) return null

  return (
    <div className="mt-8 border-t border-purple-500/30 pt-4">
      <button
        onClick={() => setShowDebug(!showDebug)}
        className="text-xs bg-purple-900/50 hover:bg-purple-800/50 text-purple-200 px-3 py-1 rounded-md"
      >
        {showDebug ? "Hide" : "Show"} HTML Structure
      </button>

      {showDebug && (
        <div className="mt-4 p-4 bg-black/50 rounded-md overflow-auto max-h-96">
          <pre className="text-xs text-gray-400">{html}</pre>
        </div>
      )}
    </div>
  )
}
