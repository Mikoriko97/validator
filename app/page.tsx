import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Hero from "@/components/hero"
import LatestBlocks from "@/components/latest-blocks"

export default function Home() {
  const latestBlocks = [
    {
      height: "12345789",
      hash: "0x8a1d7b8dd64e0aafe7ea7b6c95065c9364cf99d38470c12ee807d55f7de1529a",
      validator: "Cosmos Sentinel",
      validatorId: "cosmos-sentinel",
      transactions: 156,
      timestamp: "2023-06-30 14:32:15",
    },
    {
      height: "12345788",
      hash: "0x7b2c6a9cc85f4b3d1e2a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e",
      validator: "Polkadot Guardian",
      validatorId: "polkadot-guardian",
      transactions: 89,
      timestamp: "2023-06-30 14:31:45",
    },
    {
      height: "12345787",
      hash: "0x6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d",
      validator: "Ethereum Nexus",
      validatorId: "ethereum-nexus",
      transactions: 210,
      timestamp: "2023-06-30 14:31:15",
    },
    {
      height: "12345786",
      hash: "0x5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c",
      validator: "Solana Beacon",
      validatorId: "solana-beacon",
      transactions: 312,
      timestamp: "2023-06-30 14:30:45",
    },
    {
      height: "12345785",
      hash: "0x4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3",
      validator: "Avalanche Peak",
      validatorId: "avalanche-peak",
      transactions: 78,
      timestamp: "2023-06-30 14:30:15",
    },
    {
      height: "12345784",
      hash: "0x3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2",
      validator: "Cosmos Sentinel",
      validatorId: "cosmos-sentinel",
      transactions: 143,
      timestamp: "2023-06-30 14:29:45",
    },
    {
      height: "12345783",
      hash: "0x2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1",
      validator: "Polkadot Guardian",
      validatorId: "polkadot-guardian",
      transactions: 67,
      timestamp: "2023-06-30 14:29:15",
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 to-purple-950">
      <Navbar />
      <Hero />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LatestBlocks blocks={latestBlocks} />
      </div>
      <Footer />
    </main>
  )
}
