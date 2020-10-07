module.exports = {
  docs: [
    'home',
    {
      type: 'category',
      label: 'Blockchain',
      items: ['blockchain/blockchain'],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Miners',
      items: ['miners/miners'],
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
};
