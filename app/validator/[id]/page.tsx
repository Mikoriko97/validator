import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ValidatorProfile from "@/components/validator-profile"
import { notFound } from "next/navigation"

interface BlockData {
  height: string
  signed: boolean
  time: string
}

interface ValidatorData {
  id: string
  name: string
  logo: string
  network: string
  status: string
  commission: {
    current: string
    max: string
    maxChangeRate: string
  }
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
  metrics: {
    totalRewards: string
    delegators: string
    votingPower: string
    blocksSigned: string
    missedBlocks: string
    slashingEvents: string
    accumulatedCommission: string
    accumulatedRewards: string
  }
  performance: { date: string; uptime: number }[]
  slashingHistory: any[]
  delegations: { delegator: string; amount: string; since: string }[]
  unbondingDelegations: { delegator: string; amount: string; completionTime: string }[]
  missedBlocks: { height: string; time: string }[]
  historicalChanges: { type: string; blockHeight: string; time: string; details: string }[]
  recentBlocks: BlockData[]
  latestBlocks?: {
    height: string
    hash: string
    validator: string
    validatorId: string
    transactions: number
    timestamp: string
  }[]
}

// This would normally come from a database
const validators: { [key: string]: ValidatorData } = {
  "cosmos-sentinel": {
    id: "cosmos-sentinel",
    name: "Cosmos Sentinel",
    logo: "/cosmos-logo.png",
    network: "Cosmos",
    status: "Bonded",
    commission: {
      current: "5%",
      max: "10%",
      maxChangeRate: "1%",
    },
    delegated: "245,000 XRP",
    selfDelegated: "50,000 XRP",
    uptime: "100%",
    website: "https://example.com/cosmos-sentinel",
    description:
      "A reliable validator focused on the Cosmos ecosystem with enterprise-grade infrastructure and 24/7 monitoring.",
    operatorAddress: "cosmosvaloper1abcdefghijklmnopqrstuvwxyz0123456789",
    consensusAddress: "cosmosvalcons1abcdefghijklmnopqrstuvwxyz0123456789",
    publicKey: "cosmosvalconspub1addwnpepqd5xj8tgpzydxc3patr0qz7n3s2qce6l3ahm9x3gq4uf2j3ekdgwdxmh7z",
    identity: "ABCDEF0123456789",
    contact: "contact@cosmossentinel.com",
    minSelfDelegation: "10,000 XRP",
    jailed: false,
    metrics: {
      totalRewards: "1.2M XRP",
      delegators: "1,245",
      votingPower: "2.3%",
      blocksSigned: "1,245,678",
      missedBlocks: "0",
      slashingEvents: "0",
      accumulatedCommission: "45,678 XRP",
      accumulatedRewards: "12,345 XRP",
    },
    performance: [
      { date: "Jan", uptime: 100 },
      { date: "Feb", uptime: 100 },
      { date: "Mar", uptime: 99.9 },
      { date: "Apr", uptime: 100 },
      { date: "May", uptime: 100 },
      { date: "Jun", uptime: 100 },
    ],
    slashingHistory: [],
    delegations: [
      { delegator: "cosmos1abcdefghijklmnopqrstuvwxyz0123456789", amount: "50,000 XRP", since: "2023-01-15" },
      { delegator: "cosmos1bcdefghijklmnopqrstuvwxyz0123456789a", amount: "25,000 XRP", since: "2023-02-20" },
      { delegator: "cosmos1cdefghijklmnopqrstuvwxyz0123456789ab", amount: "15,000 XRP", since: "2023-03-10" },
      { delegator: "cosmos1defghijklmnopqrstuvwxyz0123456789abc", amount: "10,000 XRP", since: "2023-04-05" },
      { delegator: "cosmos1efghijklmnopqrstuvwxyz0123456789abcd", amount: "5,000 XRP", since: "2023-05-12" },
    ],
    unbondingDelegations: [
      { delegator: "cosmos1fghijklmnopqrstuvwxyz0123456789abcde", amount: "2,000 XRP", completionTime: "2023-07-15" },
      { delegator: "cosmos1ghijklmnopqrstuvwxyz0123456789abcdef", amount: "1,500 XRP", completionTime: "2023-07-20" },
    ],
    missedBlocks: [],
    historicalChanges: [
      { type: "Commission Change", blockHeight: "12345678", time: "2023-01-10", details: "Changed from 4% to 5%" },
      {
        type: "Status Change",
        blockHeight: "12300000",
        time: "2023-01-01",
        details: "Changed from Unbonded to Bonded",
      },
    ],
    recentBlocks: Array(50)
      .fill(null)
      .map((_, i) => {
        // Generate 50 blocks with 2 random missed blocks
        const isMissed = i === 12 || i === 37
        return {
          height: `${12345000 + i}`,
          signed: !isMissed,
          time: new Date(Date.now() - (50 - i) * 30000).toISOString().replace("T", " ").substring(0, 19),
        }
      }),
    latestBlocks: [
      {
        height: "12345789",
        hash: "0x8a1d7b8dd64e0aafe7ea7b6c95065c9364cf99d38470c12ee807d55f7de1529a",
        validator: "Cosmos Sentinel",
        validatorId: "cosmos-sentinel",
        transactions: 156,
        timestamp: "2023-06-30 14:32:15",
      },
      {
        height: "12345784",
        hash: "0x3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2",
        validator: "Cosmos Sentinel",
        validatorId: "cosmos-sentinel",
        transactions: 143,
        timestamp: "2023-06-30 14:29:45",
      },
    ],
  },
  "polkadot-guardian": {
    id: "polkadot-guardian",
    name: "Polkadot Guardian",
    logo: "/polkadot-logo.png",
    network: "Polkadot",
    status: "Bonded",
    commission: {
      current: "3%",
      max: "8%",
      maxChangeRate: "1%",
    },
    delegated: "1,200,000 XRP",
    selfDelegated: "200,000 XRP",
    uptime: "99.9%",
    website: "https://example.com/polkadot-guardian",
    description: "Secure and reliable Polkadot validator with a focus on network security and community engagement.",
    operatorAddress: "12D3KooWBmAwcd4PJNJvfV89HwE48nwkRmAgo8Vy3uQEyNNHBox2",
    consensusAddress: "12D3KooWQYV9dGMFoRzNStwpXztXaBUjtPqi6aU76ZgUriHhKust",
    publicKey: "0x8eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a48",
    identity: "FEDCBA9876543210",
    contact: "contact@polkadotguardian.com",
    minSelfDelegation: "50,000 XRP",
    jailed: false,
    metrics: {
      totalRewards: "450K XRP",
      delegators: "3,782",
      votingPower: "3.1%",
      blocksSigned: "987,654",
      missedBlocks: "12",
      slashingEvents: "0",
      accumulatedCommission: "12,345 XRP",
      accumulatedRewards: "5,678 XRP",
    },
    performance: [
      { date: "Jan", uptime: 99.8 },
      { date: "Feb", uptime: 99.9 },
      { date: "Mar", uptime: 100 },
      { date: "Apr", uptime: 99.9 },
      { date: "May", uptime: 99.9 },
      { date: "Jun", uptime: 100 },
    ],
    slashingHistory: [],
    delegations: [
      { delegator: "15oF4uVJwmo4TdGW7VfQxNLavjCXviqxT9S1MgbjMNHr6Sp5", amount: "100,000 XRP", since: "2023-01-20" },
      { delegator: "14Xs6hZpV8ngS3PXmTeXEKsxCiTLEQvGneA1PJYxP8qK8XL8", amount: "75,000 XRP", since: "2023-02-15" },
      { delegator: "16kZJGPJ37uYxjs7aPkQJGQVf1NdB275VTJ6wTQHGUvhRqiL", amount: "50,000 XRP", since: "2023-03-05" },
      { delegator: "13RDY9nrJpyTDBSUdmw3WruRuX9xGXHdRMK5gaZzjnz8JJ68", amount: "25,000 XRP", since: "2023-04-10" },
      { delegator: "12H7nsDUrJUSCQQJrTKAFfyCWSactiSdjoVUixqcd9CZHTGt", amount: "10,000 XRP", since: "2023-05-01" },
    ],
    unbondingDelegations: [
      {
        delegator: "15KDFYbGZgYLVmcCKCxZZQKrKxRGstH6J6NaU2cKFH6gXpgW",
        amount: "5,000 XRP",
        completionTime: "2023-07-25",
      },
    ],
    missedBlocks: [
      { height: "12345678", time: "2023-04-15 14:30:45" },
      { height: "12345680", time: "2023-04-15 14:31:15" },
    ],
    historicalChanges: [
      { type: "Commission Change", blockHeight: "9876543", time: "2023-02-05", details: "Changed from 2% to 3%" },
    ],
    recentBlocks: Array(50)
      .fill(null)
      .map((_, i) => {
        const isMissed = i === 8 || i === 22 || i === 45
        return {
          height: `${9876000 + i}`,
          signed: !isMissed,
          time: new Date(Date.now() - (50 - i) * 30000).toISOString().replace("T", " ").substring(0, 19),
        }
      }),
    latestBlocks: [
      {
        height: "12345789",
        hash: "0x8a1d7b8dd64e0aafe7ea7b6c95065c9364cf99d38470c12ee807d55f7de1529a",
        validator: "Polkadot Guardian",
        validatorId: "polkadot-guardian",
        transactions: 156,
        timestamp: "2023-06-30 14:32:15",
      },
      {
        height: "12345784",
        hash: "0x3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2",
        validator: "Polkadot Guardian",
        validatorId: "polkadot-guardian",
        transactions: 143,
        timestamp: "2023-06-30 14:29:45",
      },
    ],
  },
  "solana-beacon": {
    id: "solana-beacon",
    name: "Solana Beacon",
    logo: "/solana-logo.png",
    network: "Solana",
    status: "Bonded",
    commission: {
      current: "7%",
      max: "15%",
      maxChangeRate: "2%",
    },
    delegated: "500,000 XRP",
    selfDelegated: "100,000 XRP",
    uptime: "99.8%",
    website: "https://example.com/solana-beacon",
    description: "High-performance Solana validator with optimized hardware for maximum throughput and reliability.",
    operatorAddress: "7Np41oeYqPefeNQEHSv1UDhYrehxin3NStELsSKCT4K2",
    consensusAddress: "9QU2QSxhb24FUX3Tu2FpPVXD8LKuYezwgTxU1kz9byfK",
    publicKey: "5ZWj7a1f8tWkjBESHKgrLmXshuXxqeY9SYcfbshpAqPG",
    identity: "0123456789ABCDEF",
    contact: "contact@solanabeacon.com",
    minSelfDelegation: "25,000 XRP",
    jailed: false,
    metrics: {
      totalRewards: "125K XRP",
      delegators: "856",
      votingPower: "1.8%",
      blocksSigned: "24,568,912",
      missedBlocks: "45",
      slashingEvents: "0",
      accumulatedCommission: "8,765 XRP",
      accumulatedRewards: "3,456 XRP",
    },
    performance: [
      { date: "Jan", uptime: 99.7 },
      { date: "Feb", uptime: 99.8 },
      { date: "Mar", uptime: 99.8 },
      { date: "Apr", uptime: 99.9 },
      { date: "May", uptime: 99.8 },
      { date: "Jun", uptime: 99.9 },
    ],
    slashingHistory: [],
    delegations: [
      { delegator: "6svGeTHZNBzfQVeXNAT6kUZ8s5EzLi4Yf5s5UBdFQYrP", amount: "50,000 XRP", since: "2023-01-25" },
      { delegator: "7YHZ3rfvs1fxHgcSQfVYgPst9WkNk6PGJ6dTbZEt4dLz", amount: "40,000 XRP", since: "2023-02-10" },
      { delegator: "8rT6zyQXJWbSsGwYL2BVPxKQ1qXNJKTXkUgLLx7sSbTQ", amount: "30,000 XRP", since: "2023-03-15" },
      { delegator: "9uZxJMMrUFfFZnKhRfMQkZCWVkJ5w9EwDMHGQV6nQQ1V", amount: "20,000 XRP", since: "2023-04-20" },
      { delegator: "5vxoRv2P12q4K4cSGDkMZrJvwRqJ1tZvTM6Ck6uZWz3G", amount: "10,000 XRP", since: "2023-05-05" },
    ],
    unbondingDelegations: [],
    missedBlocks: [
      { height: "45678901", time: "2023-03-10 09:15:30" },
      { height: "45678905", time: "2023-03-10 09:16:00" },
      { height: "45678910", time: "2023-03-10 09:16:30" },
    ],
    historicalChanges: [
      { type: "Commission Change", blockHeight: "45000000", time: "2023-01-15", details: "Changed from 6% to 7%" },
      {
        type: "Status Change",
        blockHeight: "44500000",
        time: "2022-12-20",
        details: "Changed from Unbonded to Bonded",
      },
    ],
    recentBlocks: Array(50)
      .fill(null)
      .map((_, i) => {
        const isMissed = i === 5 || i === 17 || i === 31 || i === 42
        return {
          height: `${45678000 + i}`,
          signed: !isMissed,
          time: new Date(Date.now() - (50 - i) * 30000).toISOString().replace("T", " ").substring(0, 19),
        }
      }),
    latestBlocks: [
      {
        height: "12345789",
        hash: "0x8a1d7b8dd64e0aafe7ea7b6c95065c9364cf99d38470c12ee807d55f7de1529a",
        validator: "Solana Beacon",
        validatorId: "solana-beacon",
        transactions: 156,
        timestamp: "2023-06-30 14:32:15",
      },
      {
        height: "12345784",
        hash: "0x3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2",
        validator: "Solana Beacon",
        validatorId: "solana-beacon",
        transactions: 143,
        timestamp: "2023-06-30 14:29:45",
      },
    ],
  },
  "avalanche-peak": {
    id: "avalanche-peak",
    name: "Avalanche Peak",
    logo: "/avalanche-logo.png",
    network: "Avalanche",
    status: "Bonded",
    commission: {
      current: "4%",
      max: "10%",
      maxChangeRate: "1%",
    },
    delegated: "350,000 XRP",
    selfDelegated: "75,000 XRP",
    uptime: "99.95%",
    website: "https://example.com/avalanche-peak",
    description:
      "Dedicated Avalanche validator with a focus on network stability and consistent returns for delegators.",
    operatorAddress: "NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg",
    consensusAddress: "NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ",
    publicKey: "0x8db97c7cece249c2b98bdc0226cc4c2a57bf52fc8d0dcd77cd5f668c13c7c0c9",
    identity: "ABCDEF0123456789",
    contact: "contact@avalanchepeak.com",
    minSelfDelegation: "20,000 XRP",
    jailed: false,
    metrics: {
      totalRewards: "85K XRP",
      delegators: "1,123",
      votingPower: "2.5%",
      blocksSigned: "3,456,789",
      missedBlocks: "18",
      slashingEvents: "0",
      accumulatedCommission: "3,456 XRP",
      accumulatedRewards: "1,234 XRP",
    },
    performance: [
      { date: "Jan", uptime: 99.9 },
      { date: "Feb", uptime: 100 },
      { date: "Mar", uptime: 99.95 },
      { date: "Apr", uptime: 99.9 },
      { date: "May", uptime: 100 },
      { date: "Jun", uptime: 99.95 },
    ],
    slashingHistory: [],
    delegations: [
      { delegator: "P-avax1s3c874vwy9qgmp5yx7qn4w8qy5kqkpvz3hhkdg", amount: "40,000 XRP", since: "2023-01-30" },
      { delegator: "P-avax1g7nkw2t9ksmv7v9qz6nzgvza7gvp5m9ngv4kx", amount: "35,000 XRP", since: "2023-02-25" },
      { delegator: "P-avax1tnuesf93gw2kjjlgheqn5r2qvp0znlc0urccnm", amount: "30,000 XRP", since: "2023-03-20" },
      { delegator: "P-avax1zg0gxk98p7gqptpxmf5l7ufk4j2rje82g0jqk", amount: "25,000 XRP", since: "2023-04-15" },
      { delegator: "P-avax1qr6yzjykcsx0u2x05fmkjhe2xrj7jkwsyuqmg", amount: "20,000 XRP", since: "2023-05-10" },
    ],
    unbondingDelegations: [
      { delegator: "P-avax1vwn0klmkz9hm3cf7zw77yrq0rg3zy7dkzq3rh", amount: "5,000 XRP", completionTime: "2023-07-20" },
      { delegator: "P-avax1f3lq3zfm4cxmecxlz4vgj9qz2pe9jgwjhf63s", amount: "3,000 XRP", completionTime: "2023-07-25" },
    ],
    missedBlocks: [{ height: "5678901", time: "2023-02-15 11:45:20" }],
    historicalChanges: [
      { type: "Commission Change", blockHeight: "5500000", time: "2023-01-20", details: "Changed from 3% to 4%" },
    ],
    recentBlocks: Array(50)
      .fill(null)
      .map((_, i) => {
        const isMissed = i === 25
        return {
          height: `${5678000 + i}`,
          signed: !isMissed,
          time: new Date(Date.now() - (50 - i) * 30000).toISOString().replace("T", " ").substring(0, 19),
        }
      }),
    latestBlocks: [
      {
        height: "12345789",
        hash: "0x8a1d7b8dd64e0aafe7ea7b6c95065c9364cf99d38470c12ee807d55f7de1529a",
        validator: "Avalanche Peak",
        validatorId: "avalanche-peak",
        transactions: 156,
        timestamp: "2023-06-30 14:32:15",
      },
      {
        height: "12345784",
        hash: "0x3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2",
        validator: "Avalanche Peak",
        validatorId: "avalanche-peak",
        transactions: 143,
        timestamp: "2023-06-30 14:29:45",
      },
    ],
  },
  "ethereum-nexus": {
    id: "ethereum-nexus",
    name: "Ethereum Nexus",
    logo: "/ethereum-logo.png",
    network: "Ethereum",
    status: "Bonded",
    commission: {
      current: "6%",
      max: "12%",
      maxChangeRate: "1.5%",
    },
    delegated: "800 XRP",
    selfDelegated: "200 XRP",
    uptime: "99.7%",
    website: "https://example.com/ethereum-nexus",
    description: "Professional Ethereum validator with a strong focus on security and decentralization principles.",
    operatorAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    consensusAddress: "0x1d85568eEAbad713fBB5293B45a4C3370986c1Df",
    publicKey: "0x8a1d7b8dd64e0aafe7ea7b6c95065c9364cf99d38470c12ee807d55f7de1529ad29ce2c422e0b65e3d5a05c02caca249",
    identity: "0123456789ABCDEF",
    contact: "contact@ethereumnexus.com",
    minSelfDelegation: "32 XRP",
    jailed: false,
    metrics: {
      totalRewards: "45 XRP",
      delegators: "245",
      votingPower: "0.8%",
      blocksSigned: "12,345",
      missedBlocks: "32",
      slashingEvents: "0",
      accumulatedCommission: "2.4 XRP",
      accumulatedRewards: "0.8 XRP",
    },
    performance: [
      { date: "Jan", uptime: 99.6 },
      { date: "Feb", uptime: 99.7 },
      { date: "Mar", uptime: 99.8 },
      { date: "Apr", uptime: 99.7 },
      { date: "May", uptime: 99.7 },
      { date: "Jun", uptime: 99.8 },
    ],
    slashingHistory: [],
    delegations: [
      { delegator: "0x8c7D5A1B4A9D732eB0249a9c5Bef4EE2a9Ae3c56", amount: "100 XRP", since: "2023-02-05" },
      { delegator: "0x3F6E3BeCB4Adbe9dA115E1c9C4FE2fc95bC46cEa", amount: "80 XRP", since: "2023-03-10" },
      { delegator: "0x1a2B3c4D5E6F7a8B9C0D1e2F3a4B5c6D7e8F9a0B", amount: "60 XRP", since: "2023-04-15" },
      { delegator: "0x9B8c7D6E5F4a3B2c1D0E9F8a7B6C5D4e3F2a1B0C", amount: "40 XRP", since: "2023-05-20" },
      { delegator: "0x2A3B4C5D6E7F8a9B0C1D2E3F4a5B6C7D8E9F0A1B", amount: "20 XRP", since: "2023-06-25" },
    ],
    unbondingDelegations: [
      { delegator: "0x7F6E5D4C3B2A1B0C9D8E7F6A5B4C3D2E1F0A9B8C", amount: "10 XRP", completionTime: "2023-07-30" },
    ],
    missedBlocks: [
      { height: "16789012", time: "2023-05-05 16:30:10" },
      { height: "16789020", time: "2023-05-05 16:32:50" },
      { height: "16789025", time: "2023-05-05 16:33:40" },
    ],
    historicalChanges: [
      { type: "Commission Change", blockHeight: "16500000", time: "2023-03-25", details: "Changed from 5% to 6%" },
      {
        type: "Status Change",
        blockHeight: "16000000",
        time: "2023-01-10",
        details: "Changed from Unbonded to Bonded",
      },
    ],
    recentBlocks: Array(50)
      .fill(null)
      .map((_, i) => {
        const isMissed = i === 10 || i === 20 || i === 30 || i === 40
        return {
          height: `${16789000 + i}`,
          signed: !isMissed,
          time: new Date(Date.now() - (50 - i) * 30000).toISOString().replace("T", " ").substring(0, 19),
        }
      }),
    latestBlocks: [
      {
        height: "12345789",
        hash: "0x8a1d7b8dd64e0aafe7ea7b6c95065c9364cf99d38470c12ee807d55f7de1529a",
        validator: "Ethereum Nexus",
        validatorId: "ethereum-nexus",
        transactions: 156,
        timestamp: "2023-06-30 14:32:15",
      },
      {
        height: "12345784",
        hash: "0x3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2",
        validator: "Ethereum Nexus",
        validatorId: "ethereum-nexus",
        transactions: 143,
        timestamp: "2023-06-30 14:29:45",
      },
    ],
  },
}

export default function ValidatorPage({ params }: { params: { id: string } }) {
  const validator = validators[params.id]

  if (!validator) {
    notFound()
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
}
