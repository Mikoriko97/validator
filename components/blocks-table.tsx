"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ExternalLink, Clock, Hash, User, Activity } from "lucide-react"
import { useState, useEffect } from "react"

interface BlockData {
  height: number
  hash: string
  proposer: string
  proposer_moniker: string
  transactions_count: number
  signatures_count: number
  timestamp: string
}

interface BlocksTableProps {
  limit?: number
}

export default function BlocksTable({ limit = 10 }: BlocksTableProps) {
  const [blocks, setBlocks] = useState<BlockData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  useEffect(() => {
    const loadBlocks = async () => {
      try {
        console.log("BlocksTable: Loading latest 10 blocks...")
        setLoading(true)
        setError(null)

        const response = await fetch(`/api/blocks?limit=${limit}`)
        console.log("BlocksTable: API response status:", response.status)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log("BlocksTable: Received data:", data)

        if (data.success && Array.isArray(data.blocks)) {
          console.log(`BlocksTable: Successfully loaded ${data.blocks.length} blocks`)
          setBlocks(data.blocks)
          setLastUpdate(new Date())
        } else {
          console.error("BlocksTable: Invalid data format:", data)
          setError("Invalid data format received")
          setBlocks([])
        }
      } catch (error) {
        console.error("BlocksTable: Error loading blocks:", error)
        setError(`Failed to load blocks: ${error instanceof Error ? error.message : "Unknown error"}`)
        setBlocks([])
      } finally {
        setLoading(false)
      }
    }

    // Завантажити дані одразу
    loadBlocks()

    // Встановити інтервал для автоматичного оновлення кожні 10 секунд
    const interval = setInterval(loadBlocks, 10000)

    // Очистити інтервал при демонтажі компонента
    return () => clearInterval(interval)
  }, [limit])

  // Функція для скорочення хешу
  const truncateHash = (hash: string) => {
    if (!hash) return ""
    return hash.length > 16 ? `${hash.substring(0, 8)}...${hash.substring(hash.length - 8)}` : hash
  }

  // Функція для форматування часу
  const formatTime = (timestamp: string) => {
    try {
      return new Date(timestamp).toLocaleString()
    } catch {
      return "Invalid time"
    }
  }

  // Функція для отримання відносного часу
  const getRelativeTime = (timestamp: string) => {
    try {
      const now = new Date()
      const blockTime = new Date(timestamp)
      const diffMs = now.getTime() - blockTime.getTime()
      const diffSeconds = Math.floor(diffMs / 1000)
      const diffMinutes = Math.floor(diffSeconds / 60)
      const diffHours = Math.floor(diffMinutes / 60)

      if (diffSeconds < 60) return `${diffSeconds}s ago`
      if (diffMinutes < 60) return `${diffMinutes}m ago`
      if (diffHours < 24) return `${diffHours}h ago`
      return `${Math.floor(diffHours / 24)}d ago`
    } catch {
      return "Unknown"
    }
  }

  return (
    <Card className="bg-gray-900/60 border-gray-800 mt-8">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold flex items-center justify-between">
          <div className="flex items-center">
            <Activity className="mr-3 h-6 w-6 text-blue-400" />
            Latest 10 Blocks
            {error && <span className="ml-2 text-sm text-red-400">(Error loading data)</span>}
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
            Live • Updated {lastUpdate.toLocaleTimeString()}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {loading ? (
          <div className="flex justify-center items-center p-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500"></div>
            <span className="ml-3 text-gray-400">Loading blocks...</span>
          </div>
        ) : blocks.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <Activity className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p>No blocks available</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-gray-800/50 border-gray-800">
                  <TableHead className="w-[120px] text-gray-300">
                    <div className="flex items-center">
                      <Hash className="mr-2 h-4 w-4" />
                      Height
                    </div>
                  </TableHead>
                  <TableHead className="text-gray-300">
                    <div className="flex items-center">
                      <Hash className="mr-2 h-4 w-4" />
                      Block Hash
                    </div>
                  </TableHead>
                  <TableHead className="text-gray-300">
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Proposer
                    </div>
                  </TableHead>
                  <TableHead className="text-center text-gray-300">Txs</TableHead>
                  <TableHead className="text-center text-gray-300">Sigs</TableHead>
                  <TableHead className="text-right text-gray-300">
                    <div className="flex items-center justify-end">
                      <Clock className="mr-2 h-4 w-4" />
                      Time
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blocks.map((block, index) => (
                  <TableRow
                    key={block.height || index}
                    className="hover:bg-gray-800/50 border-gray-800 transition-colors"
                  >
                    <TableCell className="font-medium">
                      <a
                        href={`https://example.com/block/${block.height}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 transition-colors font-mono"
                      >
                        #{block.height?.toLocaleString() || "Unknown"}
                      </a>
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      <div className="flex items-center">
                        <span className="text-gray-400 truncate max-w-[200px]">{truncateHash(block.hash || "")}</span>
                        {block.hash && (
                          <a
                            href={`https://example.com/tx/${block.hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 text-gray-500 hover:text-gray-300 transition-colors"
                          >
                            <ExternalLink className="h-3 w-3" />
                            <span className="sr-only">View block details</span>
                          </a>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-blue-400 hover:text-blue-300 truncate max-w-[180px] font-medium">
                          {block.proposer_moniker || "Unknown Validator"}
                        </span>
                        <span className="text-xs text-gray-500 font-mono truncate max-w-[180px]">
                          {block.proposer ? truncateHash(block.proposer) : "N/A"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-900/40 text-green-400">
                        {block.transactions_count?.toLocaleString() || 0}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-900/40 text-blue-400">
                        {block.signatures_count?.toLocaleString() || 0}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-col items-end">
                        <span className="text-gray-400 text-sm">{getRelativeTime(block.timestamp || "")}</span>
                        <span className="text-xs text-gray-600">{formatTime(block.timestamp || "")}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
