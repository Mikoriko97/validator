"use client"

import {
  Activity,
  Award,
  Globe,
  Server,
  Shield,
  Users,
  Clock,
  AlertTriangle,
  ArrowLeft,
  Key,
  Info,
  Percent,
  Lock,
  Unlock,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Hash,
  Database,
  History,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import LatestBlocks from "./latest-blocks"
import UptimePerformanceChart from "./uptime-performance-chart"

interface Performance {
  date: string
  uptime: number
}

interface Commission {
  current: string
  max: string
  maxChangeRate: string
}

interface SlashingEvent {
  type: string
  blockHeight: string
  amount: string
  reason: string
  date: string
}

interface Delegation {
  delegator: string
  amount: string
  since: string
}

interface UnbondingDelegation {
  delegator: string
  amount: string
  completionTime: string
}

interface BlockMissed {
  height: string
  time: string
}

interface HistoricalChange {
  type: string
  blockHeight: string
  time: string
  details: string
}

interface ValidatorMetrics {
  totalRewards: string
  delegators: string
  votingPower: string
  blocksSigned: string
  missedBlocks: string
  slashingEvents: string
  accumulatedCommission: string
  accumulatedRewards: string
}

interface BlockData {
  height: string
  hash: string
  validator: string
  validatorId: string
  transactions: number
  timestamp: string
}

interface ValidatorData {
  id: string
  name: string
  logo: string
  network: string
  status: string
  commission: Commission
  delegated: string
  selfDelegated: string
  uptime: string
  website: string
  description: string
  operatorAddress: string
  consensusAddress: string
  publicKey: string
  identity: string
  contact: string
  minSelfDelegation: string
  jailed: boolean
  jailedUntil?: string
  unbondingHeight?: string
  unbondingTime?: string
  metrics: ValidatorMetrics
  performance: Performance[]
  slashingHistory: SlashingEvent[]
  delegations: Delegation[]
  unbondingDelegations: UnbondingDelegation[]
  missedBlocks: BlockMissed[]
  historicalChanges: HistoricalChange[]
  latestBlocks?: BlockData[]
  recentBlocks?: { height: string; timestamp: string; proposer: string }[]
}

interface ValidatorProfileProps {
  validator: ValidatorData
}

export default function ValidatorProfile({ validator }: ValidatorProfileProps) {
  const [expandedSections, setExpandedSections] = useState({
    identification: true,
    status: true,
    performance: true,
    finance: true,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "bonded":
        return "text-green-400 bg-green-900/40"
      case "unbonding":
        return "text-yellow-400 bg-yellow-900/40"
      case "unbonded":
        return "text-gray-400 bg-gray-900/40"
      case "jailed":
        return "text-red-400 bg-red-900/40"
      default:
        return "text-blue-400 bg-blue-900/40"
    }
  }

  return (
    <div className="space-y-8">
      <Link href="/" className="flex items-center text-purple-400 hover:text-purple-300 mb-6">
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to Dashboard
      </Link>

      <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="relative h-24 w-24 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
            <Image
              src={validator.logo || "/placeholder.svg"}
              alt={validator.name}
              width={80}
              height={80}
              className="object-contain"
            />
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold gradient-text mb-2">{validator.name}</h1>
            <div className="flex flex-wrap gap-4 mb-4">
              <span className="px-3 py-1 rounded-full text-sm bg-blue-900/40 text-blue-400 flex items-center">
                <Server className="mr-1 h-4 w-4" />
                {validator.network}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm flex items-center ${getStatusColor(validator.status)}`}>
                <Activity className="mr-1 h-4 w-4" />
                {validator.status}
              </span>
              <span className="px-3 py-1 rounded-full text-sm bg-purple-900/40 text-purple-400 flex items-center">
                <Percent className="mr-1 h-4 w-4" />
                Commission: {validator.commission.current}
              </span>
            </div>
            <p className="text-gray-300">{validator.description}</p>
          </div>

          <a
            href={validator.website}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded bg-gray-800 hover:bg-gray-700 text-white flex items-center transition-colors"
          >
            <Globe className="mr-2 h-5 w-5" />
            Visit Website
          </a>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-gray-900/60 border-gray-800">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="delegations">Delegations</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="technical">Technical Details</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Identification Section */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-lg overflow-hidden">
            <div
              className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-800/50"
              onClick={() => toggleSection("identification")}
            >
              <h2 className="text-xl font-bold flex items-center">
                <Key className="mr-2 h-5 w-5 text-purple-400" />
                Identification
              </h2>
              {expandedSections.identification ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </div>

            {expandedSections.identification && (
              <div className="p-4 border-t border-gray-800 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Operator Address</p>
                    <div className="flex items-center mt-1">
                      <code className="bg-gray-800 p-2 rounded text-xs text-purple-300 flex-1 overflow-hidden text-ellipsis">
                        {validator.operatorAddress}
                      </code>
                      <button className="ml-2 p-1 bg-gray-800 rounded hover:bg-gray-700" title="Copy to clipboard">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-gray-400"
                        >
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">Consensus Address</p>
                    <div className="flex items-center mt-1">
                      <code className="bg-gray-800 p-2 rounded text-xs text-purple-300 flex-1 overflow-hidden text-ellipsis">
                        {validator.consensusAddress}
                      </code>
                      <button className="ml-2 p-1 bg-gray-800 rounded hover:bg-gray-700" title="Copy to clipboard">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-gray-400"
                        >
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Public Key</p>
                  <div className="flex items-center mt-1">
                    <code className="bg-gray-800 p-2 rounded text-xs text-purple-300 flex-1 overflow-hidden text-ellipsis">
                      {validator.publicKey}
                    </code>
                    <button className="ml-2 p-1 bg-gray-800 rounded hover:bg-gray-700" title="Copy to clipboard">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-400"
                      >
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Identity</p>
                    <p className="text-white mt-1">{validator.identity || "Not provided"}</p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">Contact</p>
                    <p className="text-white mt-1">{validator.contact || "Not provided"}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Status and Settings Section */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-lg overflow-hidden">
            <div
              className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-800/50"
              onClick={() => toggleSection("status")}
            >
              <h2 className="text-xl font-bold flex items-center">
                <Info className="mr-2 h-5 w-5 text-blue-400" />
                Status and Settings
              </h2>
              {expandedSections.status ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </div>

            {expandedSections.status && (
              <div className="p-4 border-t border-gray-800">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-gray-400 text-sm">Current Status</p>
                    <p className={`text-lg font-semibold mt-1 ${getStatusColor(validator.status)}`}>
                      {validator.status}
                    </p>

                    {validator.jailed && (
                      <div className="mt-2 p-2 bg-red-900/20 border border-red-900/40 rounded">
                        <p className="text-red-400 text-sm flex items-center">
                          <AlertCircle className="mr-1 h-4 w-4" />
                          Jailed until: {validator.jailedUntil}
                        </p>
                      </div>
                    )}

                    {validator.unbondingHeight && (
                      <div className="mt-2">
                        <p className="text-gray-400 text-xs">Unbonding Height: {validator.unbondingHeight}</p>
                        <p className="text-gray-400 text-xs">Unbonding Time: {validator.unbondingTime}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">Commission Parameters</p>
                    <div className="mt-2 space-y-1">
                      <p className="text-white text-sm flex justify-between">
                        <span>Current Rate:</span>
                        <span className="text-purple-400">{validator.commission.current}</span>
                      </p>
                      <p className="text-white text-sm flex justify-between">
                        <span>Max Rate:</span>
                        <span>{validator.commission.max}</span>
                      </p>
                      <p className="text-white text-sm flex justify-between">
                        <span>Max Change Rate:</span>
                        <span>{validator.commission.maxChangeRate}</span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">Minimum Self Delegation</p>
                    <p className="text-lg font-semibold mt-1">{validator.minSelfDelegation}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Performance Metrics */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-lg overflow-hidden">
            <div
              className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-800/50"
              onClick={() => toggleSection("performance")}
            >
              <h2 className="text-xl font-bold flex items-center">
                <Activity className="mr-2 h-5 w-5 text-green-400" />
                Performance Metrics
              </h2>
              {expandedSections.performance ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </div>

            {expandedSections.performance && (
              <div className="p-4 border-t border-gray-800 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-gray-900/60 border-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-gray-300 flex items-center">
                        <Clock className="mr-2 h-5 w-5 text-green-400" />
                        Blocks Signed
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold gradient-text">{validator.metrics.blocksSigned}</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900/60 border-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-gray-300 flex items-center">
                        <AlertTriangle className="mr-2 h-5 w-5 text-red-400" />
                        Missed Blocks
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold gradient-text">{validator.metrics.missedBlocks}</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900/60 border-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-gray-300 flex items-center">
                        <AlertTriangle className="mr-2 h-5 w-5 text-orange-400" />
                        Slashing Events
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold gradient-text">{validator.metrics.slashingEvents}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Use the updated Uptime Performance chart */}
                <UptimePerformanceChart performance={validator.performance} className="mb-6" />

                {/* Add the Latest Blocks component with normal size */}
                <LatestBlocks blocks={validator.latestBlocks || []} />
              </div>
            )}
          </div>

          {/* Financial Information */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-lg overflow-hidden">
            <div
              className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-800/50"
              onClick={() => toggleSection("finance")}
            >
              <h2 className="text-xl font-bold flex items-center">
                <Database className="mr-2 h-5 w-5 text-yellow-400" />
                Financial Information
              </h2>
              {expandedSections.finance ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </div>

            {expandedSections.finance && (
              <div className="p-4 border-t border-gray-800">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-gray-900/60 border-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-gray-300 flex items-center">
                        <Shield className="mr-2 h-5 w-5 text-blue-400" />
                        Voting Power
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold gradient-text">{validator.metrics.votingPower}</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900/60 border-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-gray-300 flex items-center">
                        <Users className="mr-2 h-5 w-5 text-purple-400" />
                        Delegators
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold gradient-text">{validator.metrics.delegators}</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900/60 border-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-gray-300 flex items-center">
                        <Award className="mr-2 h-5 w-5 text-yellow-400" />
                        Total Rewards
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold gradient-text">{validator.metrics.totalRewards}</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Total Delegated</p>
                    <p className="text-2xl font-bold gradient-text">{validator.delegated}</p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm mb-2">Self Delegated</p>
                    <p className="text-2xl font-bold gradient-text">{validator.selfDelegated}</p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm mb-2">Accumulated Commission</p>
                    <p className="text-2xl font-bold gradient-text">{validator.metrics.accumulatedCommission}</p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm mb-2">Accumulated Rewards</p>
                    <p className="text-2xl font-bold gradient-text">{validator.metrics.accumulatedRewards}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="delegations" className="space-y-6 mt-6">
          {/* Current Delegations */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-lg overflow-hidden">
            <div className="p-4">
              <h2 className="text-xl font-bold flex items-center">
                <Lock className="mr-2 h-5 w-5 text-green-400" />
                Current Delegations
              </h2>
            </div>

            <div className="border-t border-gray-800">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Delegator</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Since</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {validator.delegations.map((delegation, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-mono text-xs text-purple-300">{delegation.delegator}</TableCell>
                        <TableCell>{delegation.amount}</TableCell>
                        <TableCell>{delegation.since}</TableCell>
                        <TableCell className="text-right">
                          <a
                            href={`https://example.com/address/${delegation.delegator}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:text-purple-300 inline-flex items-center"
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span className="sr-only">View on Explorer</span>
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          {/* Unbonding Delegations */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-lg overflow-hidden">
            <div className="p-4">
              <h2 className="text-xl font-bold flex items-center">
                <Unlock className="mr-2 h-5 w-5 text-yellow-400" />
                Unbonding Delegations
              </h2>
            </div>

            <div className="border-t border-gray-800">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Delegator</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Completion Time</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {validator.unbondingDelegations.length > 0 ? (
                      validator.unbondingDelegations.map((delegation, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-mono text-xs text-purple-300">{delegation.delegator}</TableCell>
                          <TableCell>{delegation.amount}</TableCell>
                          <TableCell>{delegation.completionTime}</TableCell>
                          <TableCell className="text-right">
                            <a
                              href={`https://example.com/address/${delegation.delegator}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple-400 hover:text-purple-300 inline-flex items-center"
                            >
                              <ExternalLink className="h-4 w-4" />
                              <span className="sr-only">View on Explorer</span>
                            </a>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-gray-400">
                          No unbonding delegations
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6 mt-6">
          {/* Slashing History */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-lg overflow-hidden">
            <div className="p-4">
              <h2 className="text-xl font-bold flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-red-400" />
                Slashing History
              </h2>
            </div>

            <div className="border-t border-gray-800">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Block Height</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Reason</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {validator.slashingHistory.length > 0 ? (
                      validator.slashingHistory.map((event, index) => (
                        <TableRow key={index}>
                          <TableCell className="text-red-400">{event.type}</TableCell>
                          <TableCell>{event.blockHeight}</TableCell>
                          <TableCell>{event.amount}</TableCell>
                          <TableCell>{event.date}</TableCell>
                          <TableCell>{event.reason}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-gray-400">
                          No slashing events
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          {/* Missed Blocks */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-lg overflow-hidden">
            <div className="p-4">
              <h2 className="text-xl font-bold flex items-center">
                <AlertCircle className="mr-2 h-5 w-5 text-orange-400" />
                Missed Blocks
              </h2>
            </div>

            <div className="border-t border-gray-800">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Block Height</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {validator.missedBlocks.length > 0 ? (
                      validator.missedBlocks.map((block, index) => (
                        <TableRow key={index}>
                          <TableCell>{block.height}</TableCell>
                          <TableCell>{block.time}</TableCell>
                          <TableCell className="text-right">
                            <a
                              href={`https://example.com/block/${block.height}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple-400 hover:text-purple-300 inline-flex items-center"
                            >
                              <ExternalLink className="h-4 w-4" />
                              <span className="sr-only">View Block</span>
                            </a>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center text-gray-400">
                          No missed blocks
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          {/* Historical Changes */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-lg overflow-hidden">
            <div className="p-4">
              <h2 className="text-xl font-bold flex items-center">
                <History className="mr-2 h-5 w-5 text-blue-400" />
                Historical Changes
              </h2>
            </div>

            <div className="border-t border-gray-800">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Block Height</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {validator.historicalChanges.length > 0 ? (
                      validator.historicalChanges.map((change, index) => (
                        <TableRow key={index}>
                          <TableCell>{change.type}</TableCell>
                          <TableCell>{change.blockHeight}</TableCell>
                          <TableCell>{change.time}</TableCell>
                          <TableCell>{change.details}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-gray-400">
                          No historical changes
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          {/* Latest Blocks */}
          <div className="mt-6">
            <LatestBlocks blocks={validator.latestBlocks || []} />
          </div>
        </TabsContent>

        <TabsContent value="technical" className="space-y-6 mt-6">
          {/* Technical Details */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Hash className="mr-2 h-5 w-5 text-purple-400" />
              Technical Information
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Addresses</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm">Operator Address</p>
                    <div className="flex items-center mt-1">
                      <code className="bg-gray-800 p-2 rounded text-xs text-purple-300 flex-1 overflow-auto">
                        {validator.operatorAddress}
                      </code>
                      <button className="ml-2 p-1 bg-gray-800 rounded hover:bg-gray-700" title="Copy to clipboard">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-gray-400"
                        >
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">Consensus Address</p>
                    <div className="flex items-center mt-1">
                      <code className="bg-gray-800 p-2 rounded text-xs text-purple-300 flex-1 overflow-auto">
                        {validator.consensusAddress}
                      </code>
                      <button className="ml-2 p-1 bg-gray-800 rounded hover:bg-gray-700" title="Copy to clipboard">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-gray-400"
                        >
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Public Key</h3>
                <div className="flex items-center mt-1">
                  <code className="bg-gray-800 p-2 rounded text-xs text-purple-300 flex-1 overflow-auto whitespace-pre-wrap break-all">
                    {validator.publicKey}
                  </code>
                  <button className="ml-2 p-1 bg-gray-800 rounded hover:bg-gray-700" title="Copy to clipboard">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-400"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Commission Parameters</h3>
                <div className="bg-gray-800 p-4 rounded">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Current Rate</p>
                      <p className="text-white">{validator.commission.current}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Max Rate</p>
                      <p className="text-white">{validator.commission.max}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Max Change Rate</p>
                      <p className="text-white">{validator.commission.maxChangeRate}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Status Information</h3>
                <div className="bg-gray-800 p-4 rounded">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Status</p>
                      <p className={`text-lg font-semibold ${getStatusColor(validator.status)}`}>{validator.status}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Minimum Self Delegation</p>
                      <p className="text-white">{validator.minSelfDelegation}</p>
                    </div>

                    {validator.jailed && (
                      <>
                        <div>
                          <p className="text-gray-400 text-sm">Jailed</p>
                          <p className="text-red-400">Yes</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Jailed Until</p>
                          <p className="text-white">{validator.jailedUntil}</p>
                        </div>
                      </>
                    )}

                    {validator.unbondingHeight && (
                      <>
                        <div>
                          <p className="text-gray-400 text-sm">Unbonding Height</p>
                          <p className="text-white">{validator.unbondingHeight}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Unbonding Time</p>
                          <p className="text-white">{validator.unbondingTime}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
