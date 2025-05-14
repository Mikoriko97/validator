export type EcosystemItem = {
  name: string
  image: string
  description: string
  buttons: {
    label: string
    url: string
    color: string
  }[]
}

// Mainnet data
export const mainnetData: EcosystemItem[] = [
  {
    name: "Cosmos Hub",
    image: "/cosmos-logo.png",
    description: "The Internet of Blockchains. Cosmos Hub is the first blockchain in the Cosmos ecosystem.",
    buttons: [
      {
        label: "Delegate",
        url: "https://wallet.keplr.app/chains/cosmos-hub?modal=validator&chain=cosmoshub-4&validator_address=cosmosvaloper1lzhlnpahvznwfv4jmay2tgaha5kmz5qxerarrl",
        color: "primary",
      },
      {
        label: "Explorer",
        url: "https://www.mintscan.io/cosmos/validators/cosmosvaloper1lzhlnpahvznwfv4jmay2tgaha5kmz5qxerarrl",
        color: "secondary",
      },
    ],
  },
  {
    name: "Polkadot",
    image: "/polkadot-logo.png",
    description: "Polkadot enables cross-blockchain transfers of any type of data or asset, not just tokens.",
    buttons: [
      {
        label: "Stake",
        url: "https://polkadot.js.org/apps/#/staking",
        color: "primary",
      },
      {
        label: "Explorer",
        url: "https://polkadot.subscan.io/validator/14QSBoJMK7f5SEEcge9fTrWEGEFKYNCFPNz3gGNrBGbGwLJc",
        color: "secondary",
      },
    ],
  },
  {
    name: "Ethereum",
    image: "/ethereum-logo.png",
    description: "Ethereum is a decentralized, open-source blockchain with smart contract functionality.",
    buttons: [
      {
        label: "Stake",
        url: "https://ethereum.org/en/staking/",
        color: "primary",
      },
      {
        label: "Explorer",
        url: "https://beaconcha.in/validator/0x8b7f54",
        color: "secondary",
      },
    ],
  },
  {
    name: "Solana",
    image: "/solana-logo.png",
    description: "Solana is a high-performance blockchain supporting builders around the world creating crypto apps.",
    buttons: [
      {
        label: "Stake",
        url: "https://solanacompass.com/validators/7v5DXDvYzkgTdFYXYB12ZLKD6z8QfzR53N9hg6XgEQJE",
        color: "primary",
      },
      {
        label: "Explorer",
        url: "https://explorer.solana.com/validator/7v5DXDvYzkgTdFYXYB12ZLKD6z8QfzR53N9hg6XgEQJE",
        color: "secondary",
      },
    ],
  },
  {
    name: "Avalanche",
    image: "/avalanche-logo.png",
    description: "Avalanche is an open, programmable smart contracts platform for decentralized applications.",
    buttons: [
      {
        label: "Stake",
        url: "https://wallet.avax.network/staking",
        color: "primary",
      },
      {
        label: "Explorer",
        url: "https://avascan.info/staking/validator/NodeID-5uYu3NKJZN2LQhP7uSbgJBpVfDNNw3can",
        color: "secondary",
      },
    ],
  },
  {
    name: "Near Protocol",
    image: "/near-logo.png",
    description:
      "NEAR is a user-friendly, carbon-neutral blockchain, built from the ground up to be performant, secure, and infinitely scalable.",
    buttons: [
      {
        label: "Stake",
        url: "https://wallet.near.org/staking",
        color: "primary",
      },
      {
        label: "Explorer",
        url: "https://explorer.near.org/validators/unitynodes.poolv1.near",
        color: "secondary",
      },
    ],
  },
]

// Testnet data
export const testnetData: EcosystemItem[] = [
  {
    name: "Cosmos Hub Testnet",
    image: "/cosmos-logo.png",
    description: "Testnet environment for the Cosmos Hub blockchain.",
    buttons: [
      {
        label: "Faucet",
        url: "https://discord.com/channels/669268347736686612/953697793476821092",
        color: "primary",
      },
      {
        label: "Explorer",
        url: "https://explorer.theta-testnet.polypore.xyz/",
        color: "secondary",
      },
    ],
  },
  {
    name: "Polkadot Westend",
    image: "/polkadot-logo.png",
    description: "Westend is Polkadot's testnet environment for developers and validators.",
    buttons: [
      {
        label: "Faucet",
        url: "https://wiki.polkadot.network/docs/learn-DOT#getting-westies",
        color: "primary",
      },
      {
        label: "Explorer",
        url: "https://westend.subscan.io/",
        color: "secondary",
      },
    ],
  },
  {
    name: "Ethereum Goerli",
    image: "/ethereum-logo.png",
    description: "Goerli is a cross-client proof-of-authority Ethereum testnet.",
    buttons: [
      {
        label: "Faucet",
        url: "https://goerlifaucet.com/",
        color: "primary",
      },
      {
        label: "Explorer",
        url: "https://goerli.etherscan.io/",
        color: "secondary",
      },
    ],
  },
  {
    name: "Solana Devnet",
    image: "/solana-logo.png",
    description: "Solana's development environment for testing applications and validators.",
    buttons: [
      {
        label: "Faucet",
        url: "https://solfaucet.com/",
        color: "primary",
      },
      {
        label: "Explorer",
        url: "https://explorer.solana.com/?cluster=devnet",
        color: "secondary",
      },
    ],
  },
  {
    name: "Avalanche Fuji",
    image: "/avalanche-logo.png",
    description: "Fuji is Avalanche's testnet for developers and validators.",
    buttons: [
      {
        label: "Faucet",
        url: "https://faucet.avax.network/",
        color: "primary",
      },
      {
        label: "Explorer",
        url: "https://testnet.avascan.info/",
        color: "secondary",
      },
    ],
  },
]

// Other data
export const otherData: EcosystemItem[] = [
  {
    name: "Celestia",
    image: "/celestial-abstract.png",
    description: "Celestia is a modular data availability network that securely scales with the number of users.",
    buttons: [
      {
        label: "Website",
        url: "https://celestia.org/",
        color: "primary",
      },
      {
        label: "Explorer",
        url: "https://celenium.io/",
        color: "secondary",
      },
    ],
  },
  {
    name: "Sui",
    image: "/sui-blockchain-abstract.png",
    description: "Sui is a Layer 1 blockchain designed from the ground up to enable creators and developers.",
    buttons: [
      {
        label: "Website",
        url: "https://sui.io/",
        color: "primary",
      },
      {
        label: "Explorer",
        url: "https://suiscan.xyz/",
        color: "secondary",
      },
    ],
  },
  {
    name: "Aptos",
    image: "/aptos-abstract-flow.png",
    description: "Aptos is a Layer 1 blockchain built with Move, a safe and reliable language.",
    buttons: [
      {
        label: "Website",
        url: "https://aptoslabs.com/",
        color: "primary",
      },
      {
        label: "Explorer",
        url: "https://explorer.aptoslabs.com/",
        color: "secondary",
      },
    ],
  },
  {
    name: "Sei",
    image: "/sei-network-abstract-logo.png",
    description: "Sei is a specialized Layer 1 blockchain designed for trading.",
    buttons: [
      {
        label: "Website",
        url: "https://www.sei.io/",
        color: "primary",
      },
      {
        label: "Explorer",
        url: "https://www.seiscan.app/",
        color: "secondary",
      },
    ],
  },
]

// Ambassador data
export const ambassadorData: EcosystemItem[] = [
  {
    name: "Cosmos Hub",
    image: "/cosmos-logo.png",
    description: "Official ambassador for the Cosmos Hub ecosystem, helping to grow and support the community.",
    buttons: [
      {
        label: "Community",
        url: "https://discord.gg/cosmosnetwork",
        color: "primary",
      },
      {
        label: "Resources",
        url: "https://cosmos.network/community",
        color: "secondary",
      },
    ],
  },
  {
    name: "Polkadot",
    image: "/polkadot-logo.png",
    description: "Polkadot ambassador program member, providing education and support to the community.",
    buttons: [
      {
        label: "Community",
        url: "https://dot.li/discord",
        color: "primary",
      },
      {
        label: "Resources",
        url: "https://polkadot.network/ambassadors/",
        color: "secondary",
      },
    ],
  },
  {
    name: "Near Protocol",
    image: "/near-logo.png",
    description: "NEAR Certified Developer and ambassador, helping to grow the NEAR ecosystem.",
    buttons: [
      {
        label: "Community",
        url: "https://near.org/ecosystem",
        color: "primary",
      },
      {
        label: "Resources",
        url: "https://near.org/learn",
        color: "secondary",
      },
    ],
  },
]

// Moderator data
export const moderatorData: EcosystemItem[] = [
  {
    name: "Cosmos Hub",
    image: "/cosmos-logo.png",
    description: "Official moderator for Cosmos Hub community channels, ensuring a positive and helpful environment.",
    buttons: [
      {
        label: "Discord",
        url: "https://discord.gg/cosmosnetwork",
        color: "primary",
      },
      {
        label: "Telegram",
        url: "https://t.me/cosmosproject",
        color: "secondary",
      },
    ],
  },
  {
    name: "Polkadot",
    image: "/polkadot-logo.png",
    description: "Moderator for Polkadot community channels, helping users and maintaining community guidelines.",
    buttons: [
      {
        label: "Discord",
        url: "https://dot.li/discord",
        color: "primary",
      },
      {
        label: "Telegram",
        url: "https://t.me/PolkadotOfficial",
        color: "secondary",
      },
    ],
  },
  {
    name: "Avalanche",
    image: "/avalanche-logo.png",
    description: "Community moderator for Avalanche, helping to grow and support the ecosystem.",
    buttons: [
      {
        label: "Discord",
        url: "https://discord.com/invite/RwXY7P6",
        color: "primary",
      },
      {
        label: "Telegram",
        url: "https://t.me/avalancheavax",
        color: "secondary",
      },
    ],
  },
]
