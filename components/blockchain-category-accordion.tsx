"use client"

import { useState, useEffect, useCallback, memo } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { Blockchain } from "@/data/blog-posts"
import { getValidImageUrl, getPlaceholderImage } from "@/lib/image-utils"
import { ClientImage } from "@/components/client-image"

interface BlockchainCategoryAccordionProps {
  blockchains: Blockchain[]
  selectedBlockchain: string | null
  selectedCategory: string | null
  onSelectBlockchain: (blockchainId: string | null) => void
  onSelectCategory: (category: string | null) => void
}

function BlockchainCategoryAccordionComponent({
  blockchains,
  selectedBlockchain,
  selectedCategory,
  onSelectBlockchain,
  onSelectCategory,
}: BlockchainCategoryAccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  // Ensure the selected blockchain's accordion is open
  useEffect(() => {
    if (!isInitialized && selectedBlockchain) {
      setOpenItems([selectedBlockchain])
      setIsInitialized(true)
    } else if (selectedBlockchain && !openItems.includes(selectedBlockchain)) {
      setOpenItems((prev) => [...prev, selectedBlockchain])
    }
  }, [selectedBlockchain, openItems, isInitialized])

  const handleBlockchainClick = useCallback(
    (blockchainId: string) => {
      if (selectedBlockchain === blockchainId) {
        onSelectBlockchain(null)
      } else {
        onSelectBlockchain(blockchainId)
      }
    },
    [selectedBlockchain, onSelectBlockchain],
  )

  const handleCategoryClick = useCallback(
    (category: string, blockchainId: string) => {
      if (category && blockchainId) {
        if (selectedBlockchain === blockchainId && selectedCategory === category) {
          // Deselect the category but keep the blockchain selected
          onSelectCategory(null)
        } else {
          // Select both the blockchain and category
          if (selectedBlockchain !== blockchainId) {
            onSelectBlockchain(blockchainId)
          }
          onSelectCategory(category)
        }
      }
    },
    [selectedBlockchain, selectedCategory, onSelectBlockchain, onSelectCategory],
  )

  // Get valid image source
  const getValidImageSrc = (blockchain: Blockchain): string => {
    return getValidImageUrl(blockchain.image, getPlaceholderImage(32, 32, blockchain.name))
  }

  return (
    <Accordion
      type="multiple"
      value={openItems}
      onValueChange={setOpenItems}
      className="border border-purple-500/30 bg-black/40 backdrop-blur-sm rounded-lg overflow-hidden"
    >
      {blockchains.map((blockchain) => (
        <AccordionItem
          key={blockchain.id}
          value={blockchain.id}
          className="border-b border-purple-500/30 last:border-0"
        >
          <AccordionTrigger
            className="px-4 py-3 hover:bg-purple-900/20 transition-colors"
            onClick={(e) => {
              // Prevent the accordion from toggling when clicking the blockchain
              e.stopPropagation()
            }}
          >
            <div className="flex items-center gap-3 w-full" onClick={() => handleBlockchainClick(blockchain.id)}>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center p-1 transition-all duration-300 ${
                  selectedBlockchain === blockchain.id
                    ? "bg-purple-900/50 border border-purple-500"
                    : "bg-gray-900/50 border border-purple-500/30"
                }`}
              >
                <ClientImage
                  src={getValidImageSrc(blockchain) || "/placeholder.svg"}
                  alt={blockchain.name}
                  width={32}
                  height={32}
                  className="object-contain"
                  priority={selectedBlockchain === blockchain.id}
                  fallbackSrc={getPlaceholderImage(32, 32, blockchain.name)}
                />
              </div>
              <span
                className={`font-medium ${selectedBlockchain === blockchain.id ? "text-purple-300" : "text-gray-300"}`}
              >
                {blockchain.name}
              </span>
            </div>
            <div className="ml-auto">
              {openItems.includes(blockchain.id) ? (
                <ChevronDown className="h-4 w-4 text-gray-400" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-400" />
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-2">
            <div className="flex flex-wrap gap-2 pl-12">
              {blockchain.categories.map((category) => (
                <Badge
                  key={category}
                  variant="outline"
                  className={`cursor-pointer ${
                    selectedBlockchain === blockchain.id && selectedCategory === category
                      ? "bg-purple-900/50 border-purple-500 text-white"
                      : "bg-gray-900/30 text-gray-300 border-purple-500/30 hover:bg-purple-900/30 hover:text-purple-300"
                  }`}
                  onClick={() => handleCategoryClick(category, blockchain.id)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

// Memoize the component to prevent unnecessary re-renders
export const BlockchainCategoryAccordion = memo(BlockchainCategoryAccordionComponent)
