module.exports = {
  docs: [
    'home',
    {
      type: 'category',
      label: 'Blockchain',
      items: ['blockchain/blockchain', `blockchain/blockchain-primitives/blockchain-primitives`, 'blockchain/mining/mining', 'blockchain/proof-of-coverage/proof-of-coverage', 'blockchain/consensus-protocol/consensus-protocol', 'blockchain/helium-token/helium-token', 'blockchain/oracles/oracles', `blockchain/transaction-fees/transaction-fees`, `blockchain/chain-variables/chain-variables`],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Mine HNT',
      items: ['mine-hnt/mine-hnt','mine-hnt/prebuilt-miners/prebuilt-miners', 'mine-hnt/build-your-own-miner/build-your-own-miner', 'mine-hnt/convert-lorawan-gateway/convert-lorawan-gateway'],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Use The Network',
      items: ['use-the-network/use-the-network', 'use-the-network/devices/devices', 'use-the-network/console/console', `use-the-network/network-servers/network-servers`],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Coverage Mapping',
      items: ['coverage-mapping/coverage-mapping'],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Community and Governance',
      items: ['community-governance/community-governance'],
      collapsed: true,
    },
  ],
  readyToUse: [
   {
      type: 'link',
      label: '<- Devices',
      href: '../'
    }, 
    {
      type: 'category',
      label: 'Ready To Use',
      items: ['use-the-network/devices/ready-to-use/dragino-lht65'],
      collapsed: false,
    },
  ],
  mining: [
   {
      type: 'link',
      label: '<- Blockchain',
      href: '../'
    }, 
    {
      type: 'category',
      label: 'Mining',
      items: ['blockchain/mining/hnt-mining-and-rewards'],
      collapsed: false,
    },
  ],
  proofOfCoverage: [
   {
      type: 'link',
      label: '<- Blockchain',
      href: '../'
    }, 
    {
      type: 'category',
      label: 'Proof of Coverage',
      items: ['blockchain/proof-of-coverage/challenges'],
      collapsed: false,
    },
  ],
  consensusProtocol: [
   {
      type: 'link',
      label: '<- Blockchain',
      href: '../'
    }, 
    {
      type: 'category',
      label: 'Consensus Protocol',
      items: ['blockchain/consensus-protocol/design-goals'],
      collapsed: false,
    },
  ],
  heliumToken: [
   {
      type: 'link',
      label: '<- Blockchain',
      href: '../'
    }, 
    {
      type: 'category',
      label: 'Helium Token',
      items: ['blockchain/helium-token/helium-token'],
      collapsed: false,
    },
  ],
  oracles: [
   {
      type: 'link',
      label: '<- Blockchain',
      href: '../'
    }, 
    {
      type: 'category',
      label: 'Oracles',
      items: ['blockchain/oracles/oracles'],
      collapsed: false,
    },
  ],
  dataCreditsTransactionFees: [
   {
      type: 'link',
      label: '<- Blockchain',
      href: '../'
    }, 
    {
      type: 'category',
      label: 'Transaction Fees',
      items: ['blockchain/transaction-fees/helium-data-credits', 'blockchain/transaction-fees/blockchain-transaction-fees'],
      collapsed: false,
    },
  ],
  chainVariables: [
   {
      type: 'link',
      label: '<- Blockchain',
      href: '../'
    }, 
    {
      type: 'category',
      label: 'Chain Variables',
      items: ['blockchain/chain-variables/chain-variables'],
      collapsed: false,
    },
  ],
  blockchainPrimitives: [
   {
      type: 'link',
      label: '<- Blockchain',
      href: '../'
    }, 
    {
      type: 'category',
      label: 'Blockchain Primitives',
      items: ['blockchain/blockchain-primitives/blockchain-primitives'],
      collapsed: false,
    },
  ],	
  console: [
    {
    type: 'link',
    label: '<- Use The Network',
    href: '../'
   }, 
   {
    type: 'category',
    label: 'Console',
    items: ['use-the-network/console/console'],
    collapsed: false,
   },
  ],  
  devices: [
   {
    type: 'link',
    label: '<- Use The Network',
    href: '../'
   }, 
   {
    type: 'category',
    label: 'Devices',
    items: ['use-the-network/devices/devices'],
    collapsed: false,
   },
  ],
  networkServers: [
   {
    type: 'link',
    label: '<- Use The Network',
    href: '../'
   }, 
   {
    type: 'category',
    label: 'Network Servers',
    items: ['use-the-network/network-servers/network-servers'],
    collapsed: false,
   },
  ],
  buildYourOwnMiner: [
   {
    type: 'link',
    label: '<- Mine HNT',
    href: '../'
   }, 
   {
    type: 'category',
    label: 'Build an HNT Miner',
    items: ['mine-hnt/build-your-own-miner/build-your-own-miner'],
    collapsed: false,
   },
  ],
  convertLorawanGateway: [
   {
    type: 'link',
    label: '<- Mine HNT',
    href: '../'
   }, 
   {
    type: 'category',
    label: 'Convert LoRaWAN Gateway',
    items: ['mine-hnt/convert-lorawan-gateway/convert-lorawan-gateway'],
    collapsed: false,
   },
  ],
  prebuiltMiners: [
   {
    type: 'link',
    label: '<- Mine HNT',
    href: '../'
   }, 
   {
    type: 'category',
    label: 'Prebuilt Miners',
    items: ['mine-hnt/prebuilt-miners/prebuilt-miners'],
    collapsed: false,
   },
  ],   	
};