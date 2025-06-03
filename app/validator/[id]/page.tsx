import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ValidatorProfile from "@/components/validator-profile"
import { fetchValidatorDetails } from "@/lib/validator-service"
import { notFound } from "next/navigation"

export default async function ValidatorPage({ params }: { params: { id: string } }) {
  try {
    // Получаем детальную информацию о валидаторе
    const validatorData = await fetchValidatorDetails(params.id)

    // Проверяем наличие данных
    if (!validatorData) {
      notFound()
    }

    // Безопасное получение числовых значений с проверкой на undefined/null
    const safeNumber = (value: any, defaultValue = 0) => {
      return value !== undefined && value !== null ? Number(value) : defaultValue
    }

    // Безопасное форматирование числа с проверкой на undefined/null
    const safeFormat = (value: any, decimals = 2, defaultValue = "0") => {
      if (value === undefined || value === null) return defaultValue
      return safeNumber(value).toFixed(decimals)
    }

    // Форматируем данные для компонента
    const validator = {
      id: validatorData.operator_address,
      name: validatorData.moniker || "Unknown Validator",
      logo: validatorData.logo || "/placeholder.svg?key=q17vp",
      network: validatorData.network || "XRP Ledger",
      status: validatorData.status || "Active",
      commission: {
        current: `${safeFormat(validatorData.commission_rate * 100, 2)}%`,
        max: `${safeFormat(validatorData.commission_max_rate * 100, 2)}%`,
        maxChangeRate: `${safeFormat(validatorData.commission_max_change_rate * 100, 2)}%`,
      },
      delegated: `${safeNumber(validatorData.tokens).toLocaleString()} XRP`,
      selfDelegated: `${safeNumber(validatorData.self_delegation).toLocaleString()} XRP`,
      uptime: `${safeFormat(validatorData.uptime, 2)}%`,
      website: validatorData.website || "#",
      description: validatorData.details || "No description provided",
      operatorAddress: validatorData.operator_address,
      consensusAddress: validatorData.consensus_address || "Not available",
      publicKey: validatorData.pubkey || "Not available",
      identity: validatorData.identity || "Not provided",
      contact: validatorData.contact || "Not provided",
      minSelfDelegation: `${safeNumber(validatorData.min_self_delegation).toLocaleString()} XRP`,
      jailed: validatorData.jailed || false,
      jailedUntil: validatorData.jailed_until ? new Date(validatorData.jailed_until).toLocaleString() : undefined,
      unbondingHeight: validatorData.unbonding_height?.toString(),
      unbondingTime: validatorData.unbonding_time
        ? new Date(validatorData.unbonding_time).toLocaleDateString()
        : undefined,
      metrics: {
        totalRewards: `${safeNumber(validatorData.total_rewards).toLocaleString()} XRP`,
        delegators: safeNumber(validatorData.delegators_count).toString(),
        votingPower: `${safeFormat(safeNumber(validatorData.voting_power) * 100, 2)}%`,
        blocksSigned: safeNumber(validatorData.blocks_signed).toLocaleString(),
        missedBlocks: safeNumber(validatorData.missed_blocks).toString(),
        slashingEvents: (validatorData.slashingHistory?.length || 0).toString(),
        accumulatedCommission: `${safeNumber(validatorData.unpaid_commission).toLocaleString()} XRP`,
        accumulatedRewards: `${safeNumber(validatorData.unpaid_rewards).toLocaleString()} XRP`,
      },
      performance: validatorData.performance || [],
      slashingHistory: (validatorData.slashingHistory || []).map((s: any) => ({
        type: s.type || "Unknown",
        blockHeight: s.block_height?.toString() || "0",
        amount: `${safeNumber(s.amount).toLocaleString()} XRP`,
        reason: s.reason || "Unknown",
        date: s.date ? new Date(s.date).toLocaleString() : "Unknown",
      })),
      delegations: (validatorData.delegations || []).map((d: any) => ({
        delegator: d.delegator_address,
        amount: `${safeNumber(d.amount).toLocaleString()} XRP`,
        since: d.since ? new Date(d.since).toLocaleDateString() : "Unknown",
      })),
      unbondingDelegations: (validatorData.unbondingDelegations || []).map((d: any) => ({
        delegator: d.delegator_address,
        amount: `${safeNumber(d.amount).toLocaleString()} XRP`,
        completionTime: d.unbonding_end_time ? new Date(d.unbonding_end_time).toLocaleDateString() : "Unknown",
      })),
      missedBlocks: (validatorData.missedBlocks || []).map((m: any) => ({
        height: m.height?.toString() || "0",
        time: m.time ? new Date(m.time).toLocaleString() : "Unknown",
      })),
      historicalChanges: (validatorData.historicalChanges || []).map((h: any) => ({
        type: h.type || "Unknown",
        blockHeight: h.block_height?.toString() || "0",
        time: h.time ? new Date(h.time).toLocaleString() : "Unknown",
        details: h.details || "No details",
      })),
      recentBlocks: validatorData.recentBlocks || [],
      latestBlocks: validatorData.latestBlocks || [],
    }

    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-950 to-purple-950">
        <Navbar />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32">
          <ValidatorProfile validator={validator} />
        </div>
        <Footer />
      </main>
    )
  } catch (error) {
    console.error("Error fetching validator data:", error)
    notFound()
  }
}
