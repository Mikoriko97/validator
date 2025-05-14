"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useDeviceType } from "@/hooks/use-device-type"

export default function Partners() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const deviceType = useDeviceType()
  const isMobile = deviceType === "mobile"

  const partners = [
    {
      name: "Cosmos Network",
      logo: "/cosmos-logo.png",
    },
    {
      name: "Polkadot",
      logo: "/polkadot-logo.png",
    },
    {
      name: "Ethereum Foundation",
      logo: "/ethereum-logo.png",
    },
    {
      name: "Solana",
      logo: "/solana-logo.png",
    },
    {
      name: "Avalanche",
      logo: "/avalanche-logo.png",
    },
    {
      name: "Near Protocol",
      logo: "/polkadot-logo.png",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="partners" ref={ref} className="py-16 bg-black/30 relative">
      <div className="absolute inset-0 grid-pattern opacity-10"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="gradient-text text-center text-3xl md:text-4xl font-bold mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Our Partners
        </motion.h2>

        <motion.div
          className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-16 items-center"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={item}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div
                className={`${
                  isMobile ? "w-28 h-28" : "w-32 h-32 sm:w-40 sm:h-40"
                } relative flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm rounded-lg border border-purple-500/20 transition-all duration-300 group-hover:border-purple-500/60 group-hover:bg-gray-900/70`}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg"></div>
                </div>
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  width={isMobile ? 80 : 120}
                  height={isMobile ? 40 : 60}
                  className="object-contain max-h-16 md:max-h-20 transition-all duration-300 filter grayscale group-hover:grayscale-0 group-hover:brightness-110"
                />
              </div>
              <div className="mt-3 text-center">
                <p className="text-gray-400 group-hover:text-white transition-colors duration-300">{partner.name}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
