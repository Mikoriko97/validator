"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"

interface Block {
  height: string
  timestamp: string
  proposer: string
}

interface ValidatorBlocksVisualizationProps {
  blocks?: Block[]
  uptime: string
  className?: string
}

export default function ValidatorBlocksVisualization({
  blocks = [],
  uptime,
  className,
}: ValidatorBlocksVisualizationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [blocksPerRow, setBlocksPerRow] = useState(20)

  // Calculate how many blocks we can fit based on container width
  useEffect(() => {
    if (typeof window === "undefined") return

    const calculateBlocks = () => {
      if (!containerRef.current) return

      const containerWidth = containerRef.current.clientWidth
      // Block size (4px) + gap (4px)
      const blockWithGap = 8
      const calculatedBlocksPerRow = Math.floor((containerWidth - 16) / blockWithGap)
      setBlocksPerRow(Math.max(10, Math.min(calculatedBlocksPerRow, 30)))
    }

    // Calculate initially
    calculateBlocks()

    // Set up resize observer if available
    if ("ResizeObserver" in window) {
      const resizeObserver = new ResizeObserver(calculateBlocks)
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current)
      }

      return () => {
        if (resizeObserver && containerRef.current) {
          resizeObserver.disconnect()
        }
      }
    } else {
      // Fallback for browsers without ResizeObserver
      window.addEventListener("resize", calculateBlocks)
      return () => window.removeEventListener("resize", calculateBlocks)
    }
  }, [])

  const rows = 2
  const totalBlocks = blocksPerRow * rows

  // Generate blocks array with status (signed or missed)
  const blockItems = Array.from({ length: totalBlocks }).map((_, index) => {
    // For demo purposes, let's say a few blocks are missed
    const isMissed = [4, 17, 25, 38, 42].includes(index % 50)
    return { isMissed }
  })

  return (
    <Card className={`bg-gray-900/60 border-gray-800 ${className || ""}`}>
      <CardHeader className="pb-2 flex flex-row justify-between items-center">
        <CardTitle className="text-gray-300">Recent Blocks</CardTitle>
        <div className="text-purple-400 font-bold text-lg">{uptime}</div>
      </CardHeader>
      <CardContent className="pt-0 pb-3">
        <div ref={containerRef} className="w-full overflow-hidden">
          <div className="flex flex-col gap-1">
            {/* First row */}
            <div className="flex flex-row gap-1 overflow-hidden">
              {blockItems.slice(0, blocksPerRow).map((block, index) => (
                <div
                  key={`row1-${index}`}
                  className={`aspect-square rounded-sm ${
                    block.isMissed ? "bg-red-500/80" : "bg-green-500/80"
                  } h-4 w-4 flex-shrink-0`}
                />
              ))}
            </div>

            {/* Second row */}
            <div className="flex flex-row gap-1 overflow-hidden">
              {blockItems.slice(blocksPerRow, totalBlocks).map((block, index) => (
                <div
                  key={`row2-${index}`}
                  className={`aspect-square rounded-sm ${
                    block.isMissed ? "bg-red-500/80" : "bg-green-500/80"
                  } h-4 w-4 flex-shrink-0`}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
