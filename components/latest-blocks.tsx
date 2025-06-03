"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

interface BlockData {
  height: string
  hash: string
  validator: string
  validatorId: string
  transactions: number
  timestamp: string
}

interface LatestBlocksProps {
  blocks: BlockData[]
  compact?: boolean
}

export default function LatestBlocks({ blocks: initialBlocks, compact = false }: LatestBlocksProps) {
  const [blocks, setBlocks] = useState<BlockData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Если начальные блоки предоставлены, используем их
    if (initialBlocks && initialBlocks.length > 0) {
      setBlocks(initialBlocks)
    } else {
      // Иначе загружаем блоки через API
      setLoading(true)
      fetch("/api/blocks/latest?limit=10")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch latest blocks")
          }
          return response.json()
        })
        .then((data) => {
          // Проверяем структуру данных
          console.log("Received data from API:", data)

          // Извлекаем массив блоков из ответа
          const blocksArray = data.blocks || []

          if (Array.isArray(blocksArray)) {
            setBlocks(
              blocksArray.map((block) => ({
                height: block.height.toString(),
                hash: block.hash,
                validator: block.proposer,
                validatorId: block.proposer,
                transactions: block.transactions_count,
                timestamp: new Date(block.timestamp).toLocaleString(),
              })),
            )
          } else {
            console.error("API returned invalid data format:", data)
            setError("Invalid data format received from API")
            setBlocks(generatePlaceholderBlocks(7))
          }
          setLoading(false)
        })
        .catch((err) => {
          console.error("Error fetching blocks:", err)
          setError("Failed to load latest blocks")
          setLoading(false)
          // Используем заглушки при ошибке
          setBlocks(generatePlaceholderBlocks(7))
        })
    }
  }, [initialBlocks])

  // Функция для сокращения хеша
  const truncateHash = (hash: string) => {
    if (!hash) return ""
    return hash.length > 16 ? `${hash.substring(0, 8)}...${hash.substring(hash.length - 8)}` : hash
  }

  // Функция для генерации заглушек при ошибке
  function generatePlaceholderBlocks(count: number): BlockData[] {
    const placeholders = []
    const now = new Date()

    for (let i = 0; i < count; i++) {
      const height = 1000000 + i
      placeholders.push({
        height: height.toString(),
        hash: `0x${height.toString(16).padStart(8, "0")}${"0".repeat(56)}`,
        validator: `Validator ${i + 1}`,
        validatorId: `validator_address_${i + 1}`,
        transactions: Math.floor(Math.random() * 100),
        timestamp: new Date(now.getTime() - i * 60000).toLocaleString(),
      })
    }

    return placeholders
  }

  return (
    <Card className="bg-gray-900/60 border-gray-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-5 w-5 text-blue-400"
          >
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 2v4" />
            <path d="M8 2v4" />
            <path d="M2 11h20" />
          </svg>
          Latest Blocks
          {error && <span className="ml-2 text-sm text-red-400">(Error loading data)</span>}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {loading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
          </div>
        ) : blocks.length === 0 ? (
          <div className="text-center py-8 text-gray-400">No blocks available</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-gray-800/50">
                  <TableHead className="w-[100px]">Height</TableHead>
                  <TableHead>Hash</TableHead>
                  <TableHead>Validator</TableHead>
                  <TableHead className="text-right">Txs</TableHead>
                  <TableHead className="text-right">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blocks.map((block, index) => (
                  <TableRow key={block.height || index} className="hover:bg-gray-800/50">
                    <TableCell className="font-medium">
                      <a
                        href={`https://example.com/block/${block.height}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300"
                      >
                        {block.height}
                      </a>
                    </TableCell>
                    <TableCell className="font-mono text-xs text-gray-400">
                      <div className="flex items-center">
                        <span className="truncate max-w-[180px]">{truncateHash(block.hash || "")}</span>
                        {block.hash && (
                          <a
                            href={`https://example.com/tx/${block.hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-1 text-gray-500 hover:text-gray-300"
                          >
                            <ExternalLink className="h-3 w-3" />
                            <span className="sr-only">View transaction</span>
                          </a>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {block.validatorId ? (
                        <Link
                          href={`/validator/${block.validatorId}`}
                          className="text-blue-400 hover:text-blue-300 truncate max-w-[150px] inline-block"
                        >
                          {block.validator || "Unknown"}
                        </Link>
                      ) : (
                        <span className="text-gray-400">Unknown</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">{block.transactions || 0}</TableCell>
                    <TableCell className="text-right text-gray-400 text-sm">{block.timestamp || "Unknown"}</TableCell>
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
