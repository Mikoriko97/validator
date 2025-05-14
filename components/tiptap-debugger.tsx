"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface TipTapDebuggerProps {
  html: string
}

export function TipTapDebugger({ html }: TipTapDebuggerProps) {
  const [showDebug, setShowDebug] = useState(false)
  const [showRaw, setShowRaw] = useState(false)

  if (!html) return null

  // Format HTML for better readability
  const formatHtml = (html: string) => {
    const formatted = html
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(
        /&lt;(\/?)(p|div|h[1-6]|ul|ol|li|blockquote|pre|code|br)( [^&]*?)?&gt;/g,
        "<span class='text-green-400'>&lt;$1$2$3&gt;</span>",
      )

    return formatted
  }

  return (
    <div className="mt-8 border-t border-purple-500/30 pt-4">
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowDebug(!showDebug)}
          className="text-xs bg-purple-900/50 hover:bg-purple-800/50 text-purple-200"
        >
          {showDebug ? "Hide" : "Show"} HTML Structure
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowRaw(!showRaw)}
          className="text-xs bg-purple-900/50 hover:bg-purple-800/50 text-purple-200"
        >
          {showRaw ? "Hide" : "Show"} Raw HTML
        </Button>
      </div>

      {showDebug && (
        <div className="mt-4 p-4 bg-black/50 rounded-md overflow-auto max-h-96">
          <div className="text-xs text-gray-400" dangerouslySetInnerHTML={{ __html: formatHtml(html) }}></div>
        </div>
      )}

      {showRaw && (
        <div className="mt-4 p-4 bg-black/50 rounded-md overflow-auto max-h-96">
          <pre className="text-xs text-gray-400">{html}</pre>
        </div>
      )}
    </div>
  )
}
