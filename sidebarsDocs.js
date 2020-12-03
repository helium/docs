module.exports = {
  docs: [
    'home',
    {
      type: 'category',
      label: 'Blockchain',
      items: ['blockchain/blockchain', `blockchain/blockchain-primitives/blockchain-primitives`, 'blockchain/mining/mining', 'blockchain/proof-of-coverage/proof-of-coverage', 'blockchain/consensus-protocol/consensus-protocol', 'blockchain/helium-token/helium-token', 'blockchain/oracles/oracles', `blockchain/transaction-fees/transaction-fees`,],
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
      items: ['community-governance/community-governance','community-governance/helium-improvement-proposals','community-governance/discord-and-chat','community-governance/social-media','community-governance/contribute-to-helium'],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Open Source',
      items: ['open-source/open-source'],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Projects',
      items: ['projects/projects', 'projects/agricultural/agricultural', 'projects/dashboards/dashboards', 'projects/environmental/environmental', 'projects/healthcare/healthcare', 'projects/industrial/industrial', 'projects/misc/misc', 'projects/security/security', 'projects/tracking/tracking', 'projects/utility/utility'],
      collapsed: true,
    },
  ],
  readyToUse: [
   {
      type: 'link',
      label: '<- Devices',
      href: '/docs/use-the-network/devices'
    }, 
    {
      type: 'category',
      label: 'Ready To Use',
      items: ['use-the-network/devices/ready-to-use/ready-to-use', 'use-the-network/devices/ready-to-use/adeunis-field-test-device', 'use-the-network/devices/ready-to-use/digital-matter-lorawan-gps', 'use-the-network/devices/ready-to-use/dragino-lht65', 'use-the-network/devices/ready-to-use/seeed-sensecap'],
      collapsed: false,
    },
  ],
  development: [
   {
      type: 'link',
      label: '<- Devices',
      href: '/docs/use-the-network/devices'
    }, 
    {
      type: 'category',
      label: 'Development',
      items: ['use-the-network/devices/development/development', 'use-the-network/devices/development/st-b-l072z-lrwan1/st-b-l072z-lrwan1'],
      collapsed: false,
    },
  ],
  bL072zLrwan1: [
   {
      type: 'link',
      label: '<- ST B-L072Z-LRWAN1',
      href: '/docs/use-the-network/devices/development/st-b-l072z-lrwan1'
    }, 
    {
      type: 'category',
      label: 'Firmware',
      items: ['use-the-network/devices/development/st-b-l072z-lrwan1/arduino'],
      collapsed: false,
    },
  ],
};