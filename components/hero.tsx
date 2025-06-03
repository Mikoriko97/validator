"use client"

import { Activity, Server, Shield, Users, Award, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { useEffect, useState } from "react"
import BlocksTable from "./blocks-table"

interface NetworkStats {
  total_validators?: number
  active_validators?: number
  total_staked?: number
  average_commission?: number
  total_delegators?: number
  average_uptime?: number
  total_rewards_distributed?: number
  updated_at?: string
}

interface HeroProps {
  networkStats?: NetworkStats | null
}

export default function Hero({ networkStats }: HeroProps) {
  const [allValidators, setAllValidators] = useState<any[]>([])
  const [showAllValidators, setShowAllValidators] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState<NetworkStats | null>(null)

  useEffect(() => {
    // Завантажуємо статистику мережі
    const loadNetworkStats = async () => {
      try {
        console.log("Hero: Loading network stats...")
        const response = await fetch("/api/network/stats")

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log("Hero: Network stats data:", data)

        if (data.success && data.stats) {
          console.log("Hero: Successfully loaded network stats")
          setStats(data.stats)
        } else {
          console.error("Hero: Invalid network stats format:", data)
          // Використовуємо пропси, якщо API не повернув дані
          setStats(networkStats || null)
        }
      } catch (error) {
        console.error("Hero: Error loading network stats:", error)
        // Використовуємо пропси, якщо сталася помилка
        setStats(networkStats || null)
      }
    }

    // Завантажуємо список валідаторів
    const loadValidators = async () => {
      try {
        console.log("Hero: Loading validators...")
        setLoading(true)
        setError(null)

        const response = await fetch("/api/validators")
        console.log("Hero: API response status:", response.status)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log("Hero: Received data:", data)

        // Перевіряємо структуру даних
        if (data.success && Array.isArray(data.validators)) {
          console.log(`Hero: Successfully loaded ${data.validators.length} validators`)
          setAllValidators(data.validators)
        } else {
          console.error("Hero: Invalid data format:", data)
          setError("Invalid data format received")
          setAllValidators([])
        }
      } catch (error) {
        console.error("Hero: Error loading validators:", error)
        setError(`Failed to load validators: ${error instanceof Error ? error.message : "Unknown error"}`)
        setAllValidators([])
      } finally {
        setLoading(false)
      }
    }

    loadNetworkStats()
    loadValidators()
  }, [networkStats])

  // Використовуємо дані з API або пропси, або моковані дані
  const displayStats = stats ||
    networkStats || {
      active_validators: 175,
      total_staked: 1200000,
      average_uptime: 99.9,
      total_delegators: 12500,
      total_rewards_distributed: 450000,
    }

  const metrics = [
    {
      title: "Active Validators",
      value: displayStats.active_validators?.toString() || "175",
      icon: Server,
      color: "text-green-500",
    },
    {
      title: "Total Staked",
      value: `${((displayStats.total_staked || 1200000) / 1000).toFixed(1)}K XRP`,
      icon: TrendingUp,
      color: "text-blue-500",
    },
    {
      title: "Network Security",
      value: `${(displayStats.average_uptime || 99.9).toFixed(1)}%`,
      icon: Shield,
      color: "text-purple-500",
    },
    {
      title: "Delegators",
      value: `${((displayStats.total_delegators || 12500) / 1000).toFixed(1)}K`,
      icon: Users,
      color: "text-yellow-500",
    },
    {
      title: "Uptime",
      value: `${(displayStats.average_uptime || 99.98).toFixed(2)}%`,
      icon: Activity,
      color: "text-red-500",
    },
    {
      title: "Rewards Distributed",
      value: `${((displayStats.total_rewards_distributed || 450000) / 1000).toFixed(0)}K XRP`,
      icon: Award,
      color: "text-teal-500",
    },
  ]

  return (
    <section className="relative pt-32 pb-16">
      <div className="absolute inset-0 grid-pattern opacity-30"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-10 text-center gradient-text">Validator Analytics Platform</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {metrics.map((metric, index) => (
            <Card
              key={index}
              className="bg-gray-900/60 border-gray-800 hover:border-purple-500 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-300">{metric.title}</h3>
                  <metric.icon className={`h-8 w-8 ${metric.color}`} />
                </div>
                <p className="text-4xl font-bold gradient-text">{metric.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <ValidatorsTable
          validators={allValidators}
          loading={loading}
          error={error}
          showAllValidators={showAllValidators}
          setShowAllValidators={setShowAllValidators}
        />

        {/* Додаємо табличку блоків під валідаторами */}
        <div className="mt-12">
          <BlocksTable limit={10} />
        </div>
      </div>
    </section>
  )
}

function ValidatorsTable({
  validators,
  loading,
  error,
  showAllValidators,
  setShowAllValidators,
}: {
  validators: any[]
  loading: boolean
  error: string | null
  showAllValidators: boolean
  setShowAllValidators: (show: boolean) => void
}) {
  // Мокові валідатори для використання при відсутності реальних даних
  const mockValidators = [
    {
      operator_address: "cosmos-sentinel",
      moniker: "Cosmos Sentinel",
      status: "Active",
      commission_rate: 0.05,
      tokens: 245000,
      uptime: 100,
    },
    {
      operator_address: "polkadot-guardian",
      moniker: "Polkadot Guardian",
      status: "Active",
      commission_rate: 0.03,
      tokens: 1200000,
      uptime: 99.9,
    },
    {
      operator_address: "solana-beacon",
      moniker: "Solana Beacon",
      status: "Active",
      commission_rate: 0.07,
      tokens: 500000,
      uptime: 99.8,
    },
    {
      operator_address: "avalanche-peak",
      moniker: "Avalanche Peak",
      status: "Active",
      commission_rate: 0.04,
      tokens: 350000,
      uptime: 99.95,
    },
    {
      operator_address: "ethereum-nexus",
      moniker: "Ethereum Nexus",
      status: "Active",
      commission_rate: 0.06,
      tokens: 800,
      uptime: 99.7,
    },
    {
      operator_address: "near-protocol",
      moniker: "Near Protocol",
      status: "Active",
      commission_rate: 0.05,
      tokens: 180000,
      uptime: 99.85,
    },
    {
      operator_address: "cardano-stake",
      moniker: "Cardano Stake",
      status: "Active",
      commission_rate: 0.04,
      tokens: 420000,
      uptime: 99.92,
    },
    {
      operator_address: "tezos-baker",
      moniker: "Tezos Baker",
      status: "Active",
      commission_rate: 0.06,
      tokens: 310000,
      uptime: 99.78,
    },
    {
      operator_address: "algorand-relay",
      moniker: "Algorand Relay",
      status: "Active",
      commission_rate: 0.03,
      tokens: 275000,
      uptime: 99.88,
    },
    {
      operator_address: "filecoin-miner",
      moniker: "Filecoin Miner",
      status: "Active",
      commission_rate: 0.07,
      tokens: 520000,
      uptime: 99.75,
    },
  ]

  // Використовуємо реальні дані або мокові, якщо реальних немає
  const allValidatorsData = validators.length > 0 ? validators : error ? mockValidators : []

  // Відображаємо тільки перші 10 валідаторів, якщо не потрібно показувати всі
  const displayedValidators = showAllValidators ? allValidatorsData : allValidatorsData.slice(0, 10)

  // Перевіряємо, чи потрібно показувати кнопку "Показати всі"
  const showViewAllButton = allValidatorsData.length > 10 && !showAllValidators

  // Безпечне форматування числових значень
  const formatCommission = (value: any) => {
    if (value === undefined || value === null) return "N/A"
    const num = Number(value)
    return isNaN(num) ? "N/A" : `${(num * 100).toFixed(0)}%`
  }

  const formatTokens = (value: any) => {
    if (value === undefined || value === null) return "N/A"
    const num = Number(value)
    return isNaN(num) ? "N/A" : `${num.toLocaleString()} XRP`
  }

  const formatUptime = (value: any) => {
    if (value === undefined || value === null) return "N/A"
    const num = Number(value)
    return isNaN(num) ? "N/A" : `${num.toFixed(2)}%`
  }

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto rounded-lg border border-gray-800 relative z-10">
        {loading ? (
          <div className="flex flex-col justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mb-4"></div>
            <p className="text-gray-400">Loading validators...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-400 mb-2">Error: {error}</p>
            <p className="text-gray-400 text-sm">Showing mock data instead</p>
          </div>
        ) : allValidatorsData.length === 0 ? (
          <div className="text-center py-8 text-gray-400">No validators found</div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-gray-900 text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Validator
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Commission
                </th>
                <th scope="col" className="px-6 py-3">
                  Proposal
                </th>
                <th scope="col" className="px-6 py-3">
                  Uptime
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedValidators.map((validator, index) => (
                <tr
                  key={validator.operator_address || index}
                  className="bg-gray-900/60 border-b border-gray-800 hover:bg-gray-800/60 relative"
                >
                  <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                    {validator.moniker || `Validator ${index + 1}`}
                  </th>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-900/40 text-green-400">
                      {validator.status || "Active"}
                    </span>
                  </td>
                  <td className="px-6 py-4">{formatCommission(validator.commission_rate)}</td>
                  <td className="px-6 py-4">{formatTokens(validator.tokens)}</td>
                  <td className="px-6 py-4">{formatUptime(validator.uptime)}</td>
                  <td className="px-6 py-4 relative z-10">
                    <Link
                      href={`/validator/${validator.operator_address || `validator-${index + 1}`}`}
                      className="text-purple-400 hover:text-purple-300 font-medium inline-block w-full h-full px-4 py-2 -mx-4 -my-2 relative z-20"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showViewAllButton && (
        <div className="flex justify-center mt-4 relative z-20">
          <button
            onClick={() => setShowAllValidators(true)}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
          >
            Показать все валидаторы ({allValidatorsData.length})
          </button>
        </div>
      )}

      {showAllValidators && allValidatorsData.length > 10 && (
        <div className="flex justify-center mt-4 relative z-20">
          <button
            onClick={() => setShowAllValidators(false)}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
          >
            Показать меньше
          </button>
        </div>
      )}
    </div>
  )
}
