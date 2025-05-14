"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

// Import data from TypeScript files
import {
  type EcosystemItem,
  mainnetData,
  testnetData,
  otherData,
  ambassadorData,
  moderatorData,
} from "@/data/ecosystems/data"

export default function Ecosystems() {
  const [activeTab, setActiveTab] = useState("mainnet")
  const [items, setItems] = useState<EcosystemItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Define tabs
  const tabs = [
    { id: "mainnet", label: "Mainnet" },
    { id: "testnet", label: "Testnet" },
    { id: "other", label: "Other" },
    { id: "ambassador", label: "Ambassador" },
    { id: "moderator", label: "Moderator" },
  ]

  // Load data based on active tab
  useEffect(() => {
    setIsLoaded(false)

    // Small delay for animation
    const timer = setTimeout(() => {
      let newItems: EcosystemItem[] = []

      switch (activeTab) {
        case "mainnet":
          newItems = mainnetData || []
          break
        case "testnet":
          newItems = testnetData || []
          break
        case "other":
          newItems = otherData || []
          break
        case "ambassador":
          newItems = ambassadorData || []
          break
        case "moderator":
          newItems = moderatorData || []
          break
        default:
          newItems = mainnetData || []
      }

      setItems(newItems)
      setIsLoaded(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [activeTab])

  // Fallback image for error handling
  const fallbackImage = "/interconnected-blocks.png"

  return (
    <section id="ecosystems" className="py-20 relative">
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Projects and Achievements</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We invite you to familiarize yourself with all the projects we serve, and additional achievements in the
            projects.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-12">
          <div className="relative border-b border-gray-700 w-full max-w-2xl flex justify-between overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-4 py-2 text-lg font-medium transition-colors relative ${
                  activeTab === tab.id ? "text-white" : "text-gray-400 hover:text-gray-200"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600"
                    layoutId="underline"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {isLoaded &&
              items.map((item, index) => (
                <motion.div
                  key={`${activeTab}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="border border-purple-500/30 bg-black/40 backdrop-blur-sm hover:border-purple-500/70 transition-all duration-300 h-full group">
                    <CardContent className="p-6 flex flex-col items-center text-center h-full">
                      <div className="w-24 h-24 mb-6 relative group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                        <Image
                          src={item.image || fallbackImage}
                          alt={item.name || "Blockchain Project"}
                          width={100}
                          height={100}
                          className="object-contain neon-glow max-w-full max-h-full"
                          onError={(e) => {
                            // Fallback if image fails to load
                            const target = e.target as HTMLImageElement
                            if (target.src !== fallbackImage) {
                              target.src = fallbackImage
                            }
                          }}
                        />
                      </div>
                      <h3 className="text-xl font-bold mb-3 gradient-text">{item.name || "Unknown Project"}</h3>
                      <p className="text-gray-400 mb-6 flex-grow">{item.description || "No description available."}</p>

                      <div className="flex flex-col sm:flex-row gap-3 w-full mt-auto">
                        {(item.buttons || []).map((button, buttonIndex) => (
                          <Button
                            key={buttonIndex}
                            variant={button.color === "primary" ? "default" : "outline"}
                            className={`flex-1 ${
                              button.color === "primary"
                                ? "bg-purple-600 hover:bg-purple-700"
                                : "border-purple-500 text-white hover:bg-purple-950/50"
                            }`}
                            asChild
                          >
                            <a
                              href={button.url || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center"
                            >
                              {button.label || "View"}
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
