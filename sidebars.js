module.exports = {
  docs: [
    'home',
    {
      type: 'category',
      label: 'Blockchain',
      items: ['blockchain/blockchain', 'blockchain/mining/mining', 'blockchain/proof-of-coverage/proof-of-coverage', 'blockchain/consensus-protocol/consensus-protocol', 'blockchain/helium-token/helium-token', 'blockchain/oracles/oracles', `blockchain/transaction-fees/transaction-fees`, `blockchain/chain-variables/chain-variables`, `blockchain/blockchain-primitives/blockchain-primitives`],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Gateways',
      items: ['gateways/gateways'],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Devices',
      items: ['devices/devices', 'devices/ready-to-use/ready-to-use', 'devices/development/development'],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Console',
      items: ['console/console'],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Network Servers',
      items: ['network-servers/network-servers'],
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
      items: ['devices/ready-to-use/dragino-lht65'],
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
};
