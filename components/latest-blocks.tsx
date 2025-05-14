"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

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

export default function LatestBlocks({ blocks, compact = false }: LatestBlocksProps) {
  // Function to truncate hash for display
  const truncateHash = (hash: string) => {
    if (!hash) return ""
    return hash.length > 16 ? `${hash.substring(0, 8)}...${hash.substring(hash.length - 8)}` : hash
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
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
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
              {blocks.map((block) => (
                <TableRow key={block.height} className="hover:bg-gray-800/50">
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
                      <span className="truncate max-w-[180px]">{truncateHash(block.hash)}</span>
                      <a
                        href={`https://example.com/tx/${block.hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1 text-gray-500 hover:text-gray-300"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span className="sr-only">View transaction</span>
                      </a>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/validator/${block.validatorId}`}
                      className="text-blue-400 hover:text-blue-300 truncate max-w-[150px] inline-block"
                    >
                      {block.validator}
                    </Link>
                  </TableCell>
                  <TableCell className="text-right">{block.transactions}</TableCell>
                  <TableCell className="text-right text-gray-400 text-sm">{block.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
