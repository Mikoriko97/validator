import {
  fetchValidatorById,
  fetchValidatorDelegations,
  fetchValidatorMissedBlocks,
  fetchValidatorSlashingEvents,
  fetchValidatorPerformance,
  fetchValidatorHistoricalChanges,
  fetchValidatorRecentBlocks,
  fetchLatestBlocks,
} from "./db-service"

export async function fetchValidatorDetails(operatorAddress: string) {
  try {
    console.log(`Service: Fetching validator details for ${operatorAddress}`)

    // Отримуємо основну інформацію про валідатор
    const validator = await fetchValidatorById(operatorAddress)
    if (!validator) {
      console.log(`Service: Validator ${operatorAddress} not found`)
      return null
    }

    console.log(`Service: Found validator ${validator.moniker}`)

    // Get delegations first
    const delegationsResult = await fetchValidatorDelegations(operatorAddress)
    const { delegations, unbondingDelegations } = delegationsResult

    // Get other data with safe error handling
    let missedBlocks = []
    try {
      missedBlocks = await fetchValidatorMissedBlocks(operatorAddress)
    } catch (error) {
      console.warn(`Failed to fetch missed blocks: ${error}`)
    }

    let slashingHistory = []
    try {
      slashingHistory = await fetchValidatorSlashingEvents(operatorAddress)
    } catch (error) {
      console.warn(`Failed to fetch slashing history: ${error}`)
    }

    let performanceData = []
    try {
      performanceData = await fetchValidatorPerformance(operatorAddress)
    } catch (error) {
      console.warn(`Failed to fetch performance data: ${error}`)
    }

    const performance = performanceData.map((p) => ({
      date: new Date(p.date).toLocaleString("default", { month: "short" }),
      uptime: p.uptime,
    }))

    let historicalChanges = []
    try {
      historicalChanges = await fetchValidatorHistoricalChanges(operatorAddress)
    } catch (error) {
      console.warn(`Failed to fetch historical changes: ${error}`)
    }

    let recentBlocks = []
    try {
      recentBlocks = await fetchValidatorRecentBlocks(operatorAddress, 50)
    } catch (error) {
      console.warn(`Failed to fetch recent blocks: ${error}`)
    }

    let latestBlocksData = []
    try {
      latestBlocksData = await fetchLatestBlocks(10)
    } catch (error) {
      console.warn(`Failed to fetch latest blocks: ${error}`)
    }

    const latestBlocks = latestBlocksData.map((block) => ({
      height: block.height.toString(),
      hash: block.hash,
      validator: validator.moniker,
      validatorId: validator.operator_address,
      transactions: block.transactions_count,
      timestamp: new Date(block.timestamp).toLocaleString(),
    }))

    console.log(`Service: Successfully compiled validator details for ${operatorAddress}`)

    // Формуємо повні дані про валідатор
    return {
      ...validator,
      delegations,
      unbondingDelegations,
      missedBlocks,
      slashingHistory,
      performance,
      historicalChanges,
      recentBlocks,
      latestBlocks,
    }
  } catch (error) {
    console.error(`Service Error fetching validator details for ${operatorAddress}:`, error)
    return null
  }
}
