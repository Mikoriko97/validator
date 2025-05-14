"use client"

import { Activity, Server, Shield, Users, Award, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const metrics = [
  {
    title: "Active Validators",
    value: "175",
    icon: Server,
    color: "text-green-500",
  },
  {
    title: "Total Staked",
    value: "1.2M XRP",
    icon: TrendingUp,
    color: "text-blue-500",
  },
  {
    title: "Network Security",
    value: "99.9%",
    icon: Shield,
    color: "text-purple-500",
  },
  {
    title: "Delegators",
    value: "12.5K",
    icon: Users,
    color: "text-yellow-500",
  },
  {
    title: "Uptime",
    value: "99.98%",
    icon: Activity,
    color: "text-red-500",
  },
  {
    title: "Rewards Distributed",
    value: "450K XRP",
    icon: Award,
    color: "text-teal-500",
  },
]

export default function Hero() {
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

        <ValidatorsTable />
      </div>
    </section>
  )
}

function ValidatorsTable() {
  const validators = [
    {
      id: "cosmos-sentinel",
      name: "Cosmos Sentinel",
      status: "Active",
      commission: "5%",
      proposal: "245K XRP",
      uptime: "100%",
    },
    {
      id: "polkadot-guardian",
      name: "Polkadot Guardian",
      status: "Active",
      commission: "3%",
      proposal: "1.2M XRP",
      uptime: "99.9%",
    },
    {
      id: "solana-beacon",
      name: "Solana Beacon",
      status: "Active",
      commission: "7%",
      proposal: "500K XRP",
      uptime: "99.8%",
    },
    {
      id: "avalanche-peak",
      name: "Avalanche Peak",
      status: "Active",
      commission: "4%",
      proposal: "350K XRP",
      uptime: "99.95%",
    },
    {
      id: "ethereum-nexus",
      name: "Ethereum Nexus",
      status: "Active",
      commission: "6%",
      proposal: "800 XRP",
      uptime: "99.7%",
    },
  ]

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-800 relative z-10">
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
          {validators.map((validator) => (
            <tr key={validator.id} className="bg-gray-900/60 border-b border-gray-800 hover:bg-gray-800/60 relative">
              <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                {validator.name}
              </th>
              <td className="px-6 py-4">
                <span className="px-2 py-1 rounded-full text-xs bg-green-900/40 text-green-400">
                  {validator.status}
                </span>
              </td>
              <td className="px-6 py-4">{validator.commission}</td>
              <td className="px-6 py-4">{validator.proposal}</td>
              <td className="px-6 py-4">{validator.uptime}</td>
              <td className="px-6 py-4 relative z-10">
                <Link
                  href={`/validator/${validator.id}`}
                  className="text-purple-400 hover:text-purple-300 font-medium inline-block w-full h-full px-4 py-2 -mx-4 -my-2 relative z-20"
                >
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
