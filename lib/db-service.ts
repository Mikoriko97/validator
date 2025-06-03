import { createClient } from "@supabase/supabase-js"

// Типи даних, що відповідають структурі таблиць
export interface Validator {
  id: number
  operator_address: string
  consensus_address: string | null
  pubkey: string | null
  moniker: string
  identity: string | null
  website: string | null
  details: string | null
  status: string
  jailed: boolean
  jailed_until: string | null
  commission_rate: number
  commission_max_rate: number
  commission_max_change_rate: number
  min_self_delegation: number
  voting_power: number
  tokens: number
  self_delegation: number
  delegators_count: number
  missed_blocks: number
  blocks_signed: number
  uptime: number
  network: string
  logo: string | null
  unpaid_commission: number
  unpaid_rewards: number
  unbonding_height: number | null
  unbonding_time: string | null
  total_rewards: number
  updated_at: string
}

export interface Block {
  height: number
  hash: string
  proposer: string
  transactions_count: number
  timestamp: string
  signatures_count: number
}

export interface NetworkStats {
  id: number
  total_validators: number
  active_validators: number
  total_staked: number
  average_commission: number
  total_delegators: number
  average_uptime: number
  total_rewards_distributed: number
  updated_at: string
}

export interface Delegation {
  id: number
  validator_operator_address: string
  delegator_address: string
  amount: number
  is_unbonding: boolean
  unbonding_end_time: string | null
  block_height: number
  since: string
  updated_at: string
}

export interface MissedBlock {
  id: number
  validator_operator_address: string
  height: number
  time: string
}

export interface SlashingEvent {
  id: number
  validator_operator_address: string
  block_height: number
  type: string
  amount: number
  reason: string
  date: string
  created_at: string
}

export interface PerformanceMetric {
  id: number
  validator_operator_address: string
  date: string
  uptime: number
  blocks_signed: number
  blocks_missed: number
  period: string
}

export interface HistoricalChange {
  id: number
  validator_operator_address: string
  type: string
  block_height: number
  time: string
  details: string
}

export interface BlockSignature {
  id: number
  block_height: number
  validator_address: string
  timestamp: string
  signature: string
  moniker: string
}

// Функція для отримання клієнта Supabase з детальним логуванням
export function getSupabaseClient() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    console.log("Environment check:", {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseKey,
      urlLength: supabaseUrl?.length || 0,
      keyLength: supabaseKey?.length || 0,
      nodeEnv: process.env.NODE_ENV,
    })

    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase credentials:", {
        NEXT_PUBLIC_SUPABASE_URL: supabaseUrl ? "SET" : "MISSING",
        NEXT_PUBLIC_SUPABASE_ANON_KEY: supabaseKey ? "SET" : "MISSING",
      })
      return null
    }

    // Перевіряємо формат URL
    if (!supabaseUrl.startsWith("https://") || !supabaseUrl.includes(".supabase.co")) {
      console.error("Invalid Supabase URL format:", supabaseUrl)
      return null
    }

    console.log("Creating Supabase client with URL:", supabaseUrl.substring(0, 30) + "...")
    const client = createClient(supabaseUrl, supabaseKey)
    console.log("Supabase client created successfully")

    return client
  } catch (error) {
    console.error("Error creating Supabase client:", error)
    return null
  }
}

// Функція для тестування з'єднання з базою даних
export async function testDatabaseConnection(): Promise<boolean> {
  const supabase = getSupabaseClient()
  if (!supabase) {
    console.error("No Supabase client available for connection test")
    return false
  }

  try {
    console.log("Testing database connection...")

    // Простий запит для перевірки з'єднання
    const { data, error } = await supabase.from("validators").select("count").limit(1)

    if (error) {
      console.error("Database connection test failed:", error)
      return false
    }

    console.log("Database connection test successful")
    return true
  } catch (error) {
    console.error("Database connection test exception:", error)
    return false
  }
}

// Мокові дані для використання при відсутності реальних даних
export const mockValidators: Validator[] = [
  {
    id: 1,
    operator_address: "cosmos-sentinel",
    consensus_address: "cosmosvalcons1abcdefghijklmnopqrstuvwxyz0123456789",
    pubkey: "cosmosvalconspub1addwnpepqd5xj8tgpzydxc3patr0qz7n3s2qce6l3ahm9x3gq4uf2j3ekdgwdxmh7z",
    moniker: "Cosmos Sentinel",
    identity: "ABCDEF0123456789",
    website: "https://example.com/cosmos-sentinel",
    details:
      "A reliable validator focused on the Cosmos ecosystem with enterprise-grade infrastructure and 24/7 monitoring.",
    status: "Bonded",
    jailed: false,
    jailed_until: null,
    commission_rate: 0.05,
    commission_max_rate: 0.1,
    commission_max_change_rate: 0.01,
    min_self_delegation: 10000,
    voting_power: 0.023,
    tokens: 245000,
    self_delegation: 50000,
    delegators_count: 1245,
    missed_blocks: 0,
    blocks_signed: 1245678,
    uptime: 100,
    network: "Cosmos",
    logo: "/cosmos-logo.png",
    unpaid_commission: 45678,
    unpaid_rewards: 12345,
    unbonding_height: null,
    unbonding_time: null,
    total_rewards: 1200000,
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    operator_address: "polkadot-guardian",
    consensus_address: "12D3KooWQYV9dGMFoRzNStwpXztXaBUjtPqi6aU76ZgUriHhKust",
    pubkey: "0x8eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a48",
    moniker: "Polkadot Guardian",
    identity: "FEDCBA9876543210",
    website: "https://example.com/polkadot-guardian",
    details: "Secure and reliable Polkadot validator with a focus on network security and community engagement.",
    status: "Bonded",
    jailed: false,
    jailed_until: null,
    commission_rate: 0.03,
    commission_max_rate: 0.08,
    commission_max_change_rate: 0.01,
    min_self_delegation: 50000,
    voting_power: 0.031,
    tokens: 1200000,
    self_delegation: 200000,
    delegators_count: 3782,
    missed_blocks: 12,
    blocks_signed: 987654,
    uptime: 99.9,
    network: "Polkadot",
    logo: "/polkadot-logo.png",
    unpaid_commission: 12345,
    unpaid_rewards: 5678,
    unbonding_height: null,
    unbonding_time: null,
    total_rewards: 450000,
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    operator_address: "solana-beacon",
    consensus_address: "9QU2QSxhb24FUX3Tu2FpPVXD8LKuYezwgTxU1kz9byfK",
    pubkey: "5ZWj7a1f8tWkjBESHKgrLmXshuXxqeY9SYcfbshpAqPG",
    moniker: "Solana Beacon",
    identity: "0123456789ABCDEF",
    website: "https://example.com/solana-beacon",
    details: "High-performance Solana validator with optimized hardware for maximum throughput and reliability.",
    status: "Bonded",
    jailed: false,
    jailed_until: null,
    commission_rate: 0.07,
    commission_max_rate: 0.15,
    commission_max_change_rate: 0.02,
    min_self_delegation: 25000,
    voting_power: 0.018,
    tokens: 500000,
    self_delegation: 100000,
    delegators_count: 856,
    missed_blocks: 45,
    blocks_signed: 24568912,
    uptime: 99.8,
    network: "Solana",
    logo: "/solana-logo.png",
    unpaid_commission: 8765,
    unpaid_rewards: 3456,
    unbonding_height: null,
    unbonding_time: null,
    total_rewards: 125000,
    updated_at: new Date().toISOString(),
  },
  {
    id: 4,
    operator_address: "avalanche-peak",
    consensus_address: "NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ",
    pubkey: "0x8db97c7cece249c2b98bdc0226cc4c2a57bf52fc8d0dcd77cd5f668c13c7c0c9",
    moniker: "Avalanche Peak",
    identity: "ABCDEF0123456789",
    website: "https://example.com/avalanche-peak",
    details: "Dedicated Avalanche validator with a focus on network stability and consistent returns for delegators.",
    status: "Bonded",
    jailed: false,
    jailed_until: null,
    commission_rate: 0.04,
    commission_max_rate: 0.1,
    commission_max_change_rate: 0.01,
    min_self_delegation: 20000,
    voting_power: 0.025,
    tokens: 350000,
    self_delegation: 75000,
    delegators_count: 1123,
    missed_blocks: 18,
    blocks_signed: 3456789,
    uptime: 99.95,
    network: "Avalanche",
    logo: "/avalanche-logo.png",
    unpaid_commission: 3456,
    unpaid_rewards: 1234,
    unbonding_height: null,
    unbonding_time: null,
    total_rewards: 85000,
    updated_at: new Date().toISOString(),
  },
  {
    id: 5,
    operator_address: "ethereum-nexus",
    consensus_address: "0x1d85568eEAbad713fBB5293B45a4C3370986c1Df",
    pubkey: "0x8a1d7b8dd64e0aafe7ea7b6c95065c9364cf99d38470c12ee807d55f7de1529ad29ce2c422e0b65e3d5a05c02caca249",
    moniker: "Ethereum Nexus",
    identity: "0123456789ABCDEF",
    website: "https://example.com/ethereum-nexus",
    details: "Professional Ethereum validator with a strong focus on security and decentralization principles.",
    status: "Bonded",
    jailed: false,
    jailed_until: null,
    commission_rate: 0.06,
    commission_max_rate: 0.12,
    commission_max_change_rate: 0.015,
    min_self_delegation: 32,
    voting_power: 0.008,
    tokens: 800,
    self_delegation: 200,
    delegators_count: 245,
    missed_blocks: 32,
    blocks_signed: 12345,
    uptime: 99.7,
    network: "Ethereum",
    logo: "/ethereum-logo.png",
    unpaid_commission: 2.4,
    unpaid_rewards: 0.8,
    unbonding_height: null,
    unbonding_time: null,
    total_rewards: 45,
    updated_at: new Date().toISOString(),
  },
  {
    id: 6,
    operator_address: "near-protocol",
    consensus_address: "near1abcdefghijklmnopqrstuvwxyz0123456789",
    pubkey: "ed25519:8a1d7b8dd64e0aafe7ea7b6c95065c9364cf99d38470c12ee807d55f7de1529a",
    moniker: "Near Protocol",
    identity: "NEAR123456789",
    website: "https://example.com/near-protocol",
    details: "NEAR Protocol validator focused on ecosystem development and community support.",
    status: "Bonded",
    jailed: false,
    jailed_until: null,
    commission_rate: 0.05,
    commission_max_rate: 0.1,
    commission_max_change_rate: 0.01,
    min_self_delegation: 15000,
    voting_power: 0.015,
    tokens: 180000,
    self_delegation: 30000,
    delegators_count: 567,
    missed_blocks: 8,
    blocks_signed: 890123,
    uptime: 99.85,
    network: "NEAR",
    logo: "/near-logo.png",
    unpaid_commission: 2100,
    unpaid_rewards: 890,
    unbonding_height: null,
    unbonding_time: null,
    total_rewards: 67000,
    updated_at: new Date().toISOString(),
  },
  {
    id: 7,
    operator_address: "cardano-stake",
    consensus_address: "pool1abcdefghijklmnopqrstuvwxyz0123456789",
    pubkey: "ed25519:3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2",
    moniker: "Cardano Stake",
    identity: "ADA987654321",
    website: "https://example.com/cardano-stake",
    details: "Cardano stake pool operator with focus on sustainable rewards and network decentralization.",
    status: "Bonded",
    jailed: false,
    jailed_until: null,
    commission_rate: 0.04,
    commission_max_rate: 0.08,
    commission_max_change_rate: 0.01,
    min_self_delegation: 25000,
    voting_power: 0.028,
    tokens: 420000,
    self_delegation: 80000,
    delegators_count: 1890,
    missed_blocks: 5,
    blocks_signed: 1567890,
    uptime: 99.92,
    network: "Cardano",
    logo: "/cardano-logo.png",
    unpaid_commission: 4200,
    unpaid_rewards: 1680,
    unbonding_height: null,
    unbonding_time: null,
    total_rewards: 98000,
    updated_at: new Date().toISOString(),
  },
  {
    id: 8,
    operator_address: "tezos-baker",
    consensus_address: "tz1abcdefghijklmnopqrstuvwxyz0123456789",
    pubkey: "edpk1234567890abcdefghijklmnopqrstuvwxyz",
    moniker: "Tezos Baker",
    identity: "XTZ456789012",
    website: "https://example.com/tezos-baker",
    details: "Professional Tezos baker with high-performance infrastructure and competitive rewards.",
    status: "Bonded",
    jailed: false,
    jailed_until: null,
    commission_rate: 0.06,
    commission_max_rate: 0.12,
    commission_max_change_rate: 0.02,
    min_self_delegation: 18000,
    voting_power: 0.022,
    tokens: 310000,
    self_delegation: 55000,
    delegators_count: 1234,
    missed_blocks: 15,
    blocks_signed: 2345678,
    uptime: 99.78,
    network: "Tezos",
    logo: "/tezos-logo.png",
    unpaid_commission: 3100,
    unpaid_rewards: 1240,
    unbonding_height: null,
    unbonding_time: null,
    total_rewards: 78000,
    updated_at: new Date().toISOString(),
  },
  {
    id: 9,
    operator_address: "algorand-relay",
    consensus_address: "algo1abcdefghijklmnopqrstuvwxyz0123456789",
    pubkey: "algo:8a1d7b8dd64e0aafe7ea7b6c95065c9364cf99d38470c12ee807d55f7de1529a",
    moniker: "Algorand Relay",
    identity: "ALGO345678901",
    website: "https://example.com/algorand-relay",
    details: "Algorand relay node operator committed to network security and fast transaction processing.",
    status: "Bonded",
    jailed: false,
    jailed_until: null,
    commission_rate: 0.03,
    commission_max_rate: 0.06,
    commission_max_change_rate: 0.01,
    min_self_delegation: 12000,
    voting_power: 0.019,
    tokens: 275000,
    self_delegation: 45000,
    delegators_count: 987,
    missed_blocks: 3,
    blocks_signed: 3456789,
    uptime: 99.88,
    network: "Algorand",
    logo: "/algorand-logo.png",
    unpaid_commission: 2750,
    unpaid_rewards: 1100,
    unbonding_height: null,
    unbonding_time: null,
    total_rewards: 89000,
    updated_at: new Date().toISOString(),
  },
  {
    id: 10,
    operator_address: "filecoin-miner",
    consensus_address: "f1abcdefghijklmnopqrstuvwxyz0123456789",
    pubkey: "bls:8a1d7b8dd64e0aafe7ea7b6c95065c9364cf99d38470c12ee807d55f7de1529a",
    moniker: "Filecoin Miner",
    identity: "FIL234567890",
    website: "https://example.com/filecoin-miner",
    details: "Filecoin storage miner providing reliable storage services with competitive pricing.",
    status: "Bonded",
    jailed: false,
    jailed_until: null,
    commission_rate: 0.07,
    commission_max_rate: 0.14,
    commission_max_change_rate: 0.02,
    min_self_delegation: 35000,
    voting_power: 0.035,
    tokens: 520000,
    self_delegation: 120000,
    delegators_count: 1567,
    missed_blocks: 22,
    blocks_signed: 4567890,
    uptime: 99.75,
    network: "Filecoin",
    logo: "/filecoin-logo.png",
    unpaid_commission: 5200,
    unpaid_rewards: 2080,
    unbonding_height: null,
    unbonding_time: null,
    total_rewards: 156000,
    updated_at: new Date().toISOString(),
  },
]

// Функції для роботи з базою даних з покращеним логуванням
export async function fetchValidators(): Promise<Validator[]> {
  console.log("fetchValidators: Starting...")

  const supabase = getSupabaseClient()
  if (!supabase) {
    console.log("fetchValidators: No Supabase client, using mock data")
    return mockValidators
  }

  // Тестуємо з'єднання
  const connectionTest = await testDatabaseConnection()
  if (!connectionTest) {
    console.log("fetchValidators: Database connection failed, using mock data")
    return mockValidators
  }

  try {
    console.log("fetchValidators: Executing query...")
    const { data, error } = await supabase.from("validators").select("*").order("voting_power", { ascending: false })

    if (error) {
      console.error("fetchValidators: Database error:", error)
      return mockValidators
    }

    console.log(`fetchValidators: Query successful, received ${data?.length || 0} records`)
    return data && data.length > 0 ? data : mockValidators
  } catch (error) {
    console.error("fetchValidators: Exception:", error)
    return mockValidators
  }
}

export async function fetchValidatorById(operatorAddress: string): Promise<Validator | null> {
  const supabase = getSupabaseClient()
  if (!supabase) {
    return mockValidators.find((v) => v.operator_address === operatorAddress) || null
  }

  try {
    const { data, error } = await supabase
      .from("validators")
      .select("*")
      .eq("operator_address", operatorAddress)
      .single()

    if (error) {
      console.error(`Error fetching validator ${operatorAddress}:`, error)
      return mockValidators.find((v) => v.operator_address === operatorAddress) || null
    }

    return data
  } catch (error) {
    console.error(`Exception fetching validator ${operatorAddress}:`, error)
    return mockValidators.find((v) => v.operator_address === operatorAddress) || null
  }
}

export async function fetchLatestBlocks(limit = 10): Promise<Block[]> {
  const supabase = getSupabaseClient()
  if (!supabase) {
    return generateMockBlocks(limit)
  }

  try {
    const { data, error } = await supabase.from("blocks").select("*").order("height", { ascending: false }).limit(limit)

    if (error) {
      console.error("Error fetching latest blocks:", error)
      return generateMockBlocks(limit)
    }

    return data && data.length > 0 ? data : generateMockBlocks(limit)
  } catch (error) {
    console.error("Exception fetching latest blocks:", error)
    return generateMockBlocks(limit)
  }
}

export async function fetchBlocks(limit = 15): Promise<any[]> {
  const supabase = getSupabaseClient()
  if (!supabase) {
    return generateMockBlocksData(limit)
  }

  try {
    const { data, error } = await supabase.from("blocks").select("*").order("height", { ascending: false }).limit(limit)

    if (error) {
      console.error("Error fetching blocks:", error)
      return generateMockBlocksData(limit)
    }

    return data && data.length > 0 ? data : generateMockBlocksData(limit)
  } catch (error) {
    console.error("Exception fetching blocks:", error)
    return generateMockBlocksData(limit)
  }
}

export async function fetchNetworkStats(): Promise<NetworkStats | null> {
  const supabase = getSupabaseClient()
  if (!supabase) {
    console.log("Using mock network stats data")
    return generateMockNetworkStats()
  }

  try {
    // Змінюємо запит, щоб отримати останній запис без використання .single()
    const { data, error } = await supabase
      .from("network_stats")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(1)

    if (error) {
      console.error("Error fetching network stats:", error)
      return generateMockNetworkStats()
    }

    // Перевіряємо, чи є дані і повертаємо перший елемент або мокові дані
    return data && data.length > 0 ? data[0] : generateMockNetworkStats()
  } catch (error) {
    console.error("Exception fetching network stats:", error)
    return generateMockNetworkStats()
  }
}

export async function fetchValidatorDelegations(operatorAddress: string): Promise<{
  delegations: Delegation[]
  unbondingDelegations: Delegation[]
}> {
  const supabase = getSupabaseClient()
  if (!supabase) {
    return {
      delegations: generateMockDelegations(operatorAddress, 5, false),
      unbondingDelegations: generateMockDelegations(operatorAddress, 2, true),
    }
  }

  try {
    // Додаємо timeout для запитів
    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Query timeout")), 5000))

    // Отримуємо звичайні делегації з timeout
    const delegationsPromise = supabase
      .from("delegations")
      .select("*")
      .eq("validator_operator_address", operatorAddress)
      .eq("is_unbonding", false)
      .limit(100)

    // Отримуємо розділегації з timeout
    const unbondingPromise = supabase
      .from("delegations")
      .select("*")
      .eq("validator_operator_address", operatorAddress)
      .eq("is_unbonding", true)
      .limit(100)

    const [delegationsResult, unbondingResult] = await Promise.allSettled([
      Promise.race([delegationsPromise, timeoutPromise]),
      Promise.race([unbondingPromise, timeoutPromise]),
    ])

    const delegations =
      delegationsResult.status === "fulfilled" && delegationsResult.value?.data
        ? delegationsResult.value.data
        : generateMockDelegations(operatorAddress, 5, false)

    const unbondingDelegations =
      unbondingResult.status === "fulfilled" && unbondingResult.value?.data
        ? unbondingResult.value.data
        : generateMockDelegations(operatorAddress, 2, true)

    return { delegations, unbondingDelegations }
  } catch (error) {
    console.error("Exception fetching delegations:", error)
    return {
      delegations: generateMockDelegations(operatorAddress, 5, false),
      unbondingDelegations: generateMockDelegations(operatorAddress, 2, true),
    }
  }
}

// Update the fetchValidatorMissedBlocks function to better handle timeouts
export async function fetchValidatorMissedBlocks(operatorAddress: string): Promise<MissedBlock[]> {
  const supabase = getSupabaseClient()
  if (!supabase) {
    return generateMockMissedBlocks(operatorAddress, 3)
  }

  // Special case for this validator that's causing timeouts
  if (operatorAddress === "ethmvaloper1x6484gj63ctd9f9nz49hjtkl9wxhtqtf8pe735") {
    console.log(`Skipping missed blocks query for known problematic validator: ${operatorAddress}`)
    return []
  }

  try {
    console.log(`Fetching missed blocks for ${operatorAddress}`)

    // Use Promise.race with a timeout
    let timeoutId: NodeJS.Timeout

    const timeoutPromise = new Promise<{ data: null; error: Error }>((resolve) => {
      timeoutId = setTimeout(() => {
        console.log(`Query timeout for missed blocks of ${operatorAddress}`)
        resolve({
          data: null,
          error: new Error("Query timeout"),
        })
      }, 3000)
    })

    const queryPromise = supabase
      .from("missed_blocks")
      .select("*")
      .eq("validator_operator_address", operatorAddress)
      .order("time", { ascending: false })
      .limit(20)

    const result = await Promise.race([queryPromise, timeoutPromise])

    // Clear timeout if query completed
    if (timeoutId) clearTimeout(timeoutId)

    // Handle the result
    if (result.error) {
      console.warn(`Warning fetching missed blocks for ${operatorAddress}: ${result.error.message}`)
      return []
    }

    return result.data && result.data.length > 0 ? result.data : []
  } catch (error) {
    console.warn(`Warning fetching missed blocks for ${operatorAddress}: ${error}`)
    // Return empty array instead of throwing
    return []
  }
}

export async function fetchValidatorSlashingEvents(operatorAddress: string): Promise<SlashingEvent[]> {
  const supabase = getSupabaseClient()
  if (!supabase) {
    return [] // За замовчуванням немає подій слешінгу
  }

  try {
    // Додаємо timeout для запиту
    const timeoutPromise = new Promise<never>((_, reject) => setTimeout(() => reject(new Error("Query timeout")), 3000))

    const queryPromise = supabase
      .from("slashing_events")
      .select("*")
      .eq("validator_operator_address", operatorAddress)
      .order("date", { ascending: false })
      .limit(50)

    const { data, error } = await Promise.race([queryPromise, timeoutPromise])

    if (error) {
      console.error("Error fetching slashing events:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Exception fetching slashing events:", error)
    return []
  }
}

export async function fetchValidatorPerformance(operatorAddress: string): Promise<PerformanceMetric[]> {
  const supabase = getSupabaseClient()
  if (!supabase) {
    return generateMockPerformance(operatorAddress)
  }

  try {
    // Додаємо timeout для запиту
    const timeoutPromise = new Promise<never>((_, reject) => setTimeout(() => reject(new Error("Query timeout")), 3000))

    const queryPromise = supabase
      .from("performance_metrics")
      .select("*")
      .eq("validator_operator_address", operatorAddress)
      .order("date", { ascending: true })
      .limit(100)

    const { data, error } = await Promise.race([queryPromise, timeoutPromise])

    if (error) {
      console.error("Error fetching performance metrics:", error)
      return generateMockPerformance(operatorAddress)
    }

    return data && data.length > 0 ? data : generateMockPerformance(operatorAddress)
  } catch (error) {
    console.error("Exception fetching performance metrics:", error)
    return generateMockPerformance(operatorAddress)
  }
}

export async function fetchValidatorHistoricalChanges(operatorAddress: string): Promise<HistoricalChange[]> {
  const supabase = getSupabaseClient()
  if (!supabase) {
    return generateMockHistoricalChanges(operatorAddress)
  }

  try {
    // Додаємо timeout для запиту
    const timeoutPromise = new Promise<never>((_, reject) => setTimeout(() => reject(new Error("Query timeout")), 3000))

    const queryPromise = supabase
      .from("historical_changes")
      .select("*")
      .eq("validator_operator_address", operatorAddress)
      .order("time", { ascending: false })
      .limit(50)

    const { data, error } = await Promise.race([queryPromise, timeoutPromise])

    if (error) {
      console.error("Error fetching historical changes:", error)
      return generateMockHistoricalChanges(operatorAddress)
    }

    return data && data.length > 0 ? data : generateMockHistoricalChanges(operatorAddress)
  } catch (error) {
    console.error("Exception fetching historical changes:", error)
    return generateMockHistoricalChanges(operatorAddress)
  }
}

export async function fetchValidatorRecentBlocks(operatorAddress: string, limit = 50): Promise<any[]> {
  const supabase = getSupabaseClient()
  if (!supabase) {
    return generateMockRecentBlocks(operatorAddress, limit)
  }

  try {
    // Додаємо timeout для запиту
    const timeoutPromise = new Promise<never>((_, reject) => setTimeout(() => reject(new Error("Query timeout")), 3000))

    const queryPromise = supabase
      .from("block_signatures")
      .select("block_height, timestamp")
      .eq("validator_address", operatorAddress)
      .order("block_height", { ascending: false })
      .limit(limit)

    const { data, error } = await Promise.race([queryPromise, timeoutPromise])

    if (error) {
      console.error("Error fetching recent blocks:", error)
      return generateMockRecentBlocks(operatorAddress, limit)
    }

    return data && data.length > 0
      ? data.map((b) => ({
          height: b.block_height.toString(),
          signed: true,
          time: b.timestamp,
        }))
      : generateMockRecentBlocks(operatorAddress, limit)
  } catch (error) {
    console.error("Exception fetching recent blocks:", error)
    return generateMockRecentBlocks(operatorAddress, limit)
  }
}

export async function fetchBlockSignatures(limit = 20): Promise<any[]> {
  const supabase = getSupabaseClient()
  if (!supabase) {
    return generateMockBlockSignatures(limit)
  }

  try {
    // Простий запит без JOIN, оскільки moniker вже є в таблиці
    const { data, error } = await supabase
      .from("block_signatures")
      .select("*")
      .order("block_height", { ascending: false })
      .limit(limit)

    if (error) {
      console.error("Error fetching block signatures:", error)
      return generateMockBlockSignatures(limit)
    }

    if (!data || data.length === 0) {
      console.log("No block signatures found, using mock data")
      return generateMockBlockSignatures(limit)
    }

    // Повертаємо дані в потрібному форматі
    return data.map((signature) => ({
      block_height: signature.block_height,
      validator_address: signature.validator_address,
      signature: signature.signature,
      moniker: signature.moniker || "Unknown Validator",
      timestamp: signature.timestamp,
    }))
  } catch (error) {
    console.error("Exception fetching block signatures:", error)
    return generateMockBlockSignatures(limit)
  }
}

// Допоміжні функції для генерації мокових даних
function generateMockBlocks(count: number): Block[] {
  const blocks = []
  const now = new Date()

  for (let i = 0; i < count; i++) {
    const height = 1000000 + i
    blocks.push({
      height,
      hash: `0x${height.toString(16).padStart(8, "0")}${"0".repeat(56)}`,
      proposer: mockValidators[i % mockValidators.length].moniker,
      transactions_count: Math.floor(Math.random() * 100),
      timestamp: new Date(now.getTime() - i * 60000).toISOString(),
      signatures_count: 100 + Math.floor(Math.random() * 50),
    })
  }

  return blocks
}

function generateMockNetworkStats(): NetworkStats {
  return {
    id: 1,
    total_validators: 200,
    active_validators: 175,
    total_staked: 1200000,
    average_commission: 0.05,
    total_delegators: 12500,
    average_uptime: 99.98,
    total_rewards_distributed: 450000,
    updated_at: new Date().toISOString(),
  }
}

function generateMockDelegations(operatorAddress: string, count: number, isUnbonding: boolean): Delegation[] {
  const delegations = []
  const now = new Date()

  for (let i = 0; i < count; i++) {
    delegations.push({
      id: i + 1,
      validator_operator_address: operatorAddress,
      delegator_address: `delegator_${operatorAddress}_${i + 1}`,
      amount: 10000 + Math.floor(Math.random() * 40000),
      is_unbonding: isUnbonding,
      unbonding_end_time: isUnbonding ? new Date(now.getTime() + 1000000000).toISOString() : null,
      block_height: 900000 + i,
      since: new Date(now.getTime() - i * 86400000 * 30).toISOString(),
      updated_at: new Date().toISOString(),
    })
  }

  return delegations
}

function generateMockMissedBlocks(operatorAddress: string, count: number): MissedBlock[] {
  const missedBlocks = []
  const now = new Date()

  for (let i = 0; i < count; i++) {
    missedBlocks.push({
      id: i + 1,
      validator_operator_address: operatorAddress,
      height: 950000 + i,
      time: new Date(now.getTime() - i * 3600000).toISOString(),
    })
  }

  return missedBlocks
}

function generateMockPerformance(operatorAddress: string): PerformanceMetric[] {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
  const performance = []

  for (let i = 0; i < months.length; i++) {
    performance.push({
      id: i + 1,
      validator_operator_address: operatorAddress,
      date: `2023-${(i + 1).toString().padStart(2, "0")}-01`,
      uptime: 99.5 + Math.random() * 0.5,
      blocks_signed: 10000 + Math.floor(Math.random() * 5000),
      blocks_missed: Math.floor(Math.random() * 10),
      period: months[i],
    })
  }

  return performance
}

function generateMockHistoricalChanges(operatorAddress: string): HistoricalChange[] {
  return [
    {
      id: 1,
      validator_operator_address: operatorAddress,
      type: "Commission Change",
      block_height: 900000,
      time: new Date(Date.now() - 30 * 86400000).toISOString(),
      details: "Changed from 4% to 5%",
    },
    {
      id: 2,
      validator_operator_address: operatorAddress,
      type: "Status Change",
      block_height: 850000,
      time: new Date(Date.now() - 60 * 86400000).toISOString(),
      details: "Changed from Unbonded to Bonded",
    },
  ]
}

function generateMockRecentBlocks(operatorAddress: string, count: number): any[] {
  const blocks = []
  const now = new Date()

  for (let i = 0; i < count; i++) {
    // Генеруємо кілька пропущених блоків для візуалізації
    const isMissed = [4, 17, 25, 38, 42].includes(i)

    blocks.push({
      height: `${950000 + i}`,
      signed: !isMissed,
      time: new Date(now.getTime() - (count - i) * 30000).toISOString(),
    })
  }

  return blocks
}

function generateMockBlockSignatures(count: number): any[] {
  const signatures = []
  const now = new Date()

  for (let i = 0; i < count; i++) {
    const validator = mockValidators[i % mockValidators.length]
    signatures.push({
      block_height: 1000000 + i,
      validator_address: validator.operator_address,
      signature: `0x${Math.random().toString(16).substr(2, 64)}`,
      moniker: validator.moniker,
      timestamp: new Date(now.getTime() - i * 30000).toISOString(),
    })
  }

  return signatures
}

// Додаємо функцію для перевірки наявності таблиць
export async function checkTablesExist() {
  const supabase = getSupabaseClient()
  if (!supabase) {
    return false
  }

  try {
    // Перевіряємо наявність таблиці validators
    const { error } = await supabase.from("validators").select("id").limit(1)

    if (error) {
      console.error("Error checking tables:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Exception checking tables:", error)
    return false
  }
}

function generateMockBlocksData(count: number): any[] {
  const blocks = []
  const now = new Date()
  // Починаємо з більш реалістичної висоти блоку
  const startHeight = 15847392

  for (let i = 0; i < count; i++) {
    const height = startHeight - i // Найновіші блоки мають більшу висоту
    const validator = mockValidators[i % mockValidators.length]

    blocks.push({
      height,
      hash: `0x${height.toString(16).padStart(8, "0")}${Math.random().toString(16).substr(2, 56)}`,
      proposer: validator.operator_address,
      proposer_moniker: validator.moniker,
      transactions_count: Math.floor(Math.random() * 150) + 10,
      signatures_count: Math.floor(Math.random() * 50) + 100,
      timestamp: new Date(now.getTime() - i * 12000).toISOString(), // Блоки кожні 12 секунд
    })
  }

  return blocks
}
