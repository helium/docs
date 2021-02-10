module.exports = {
  docs: [
    'home',
    {
      type: 'category',
      label: 'Blockchain',
      items: ['blockchain/blockchain', `blockchain/blockchain-primitives/blockchain-primitives`, 'blockchain/mining/mining', 'blockchain/proof-of-coverage/proof-of-coverage', 'blockchain/packet-purchasing/packet-purchasing','blockchain/consensus-protocol/consensus-protocol', 'blockchain/helium-token/helium-token', 'blockchain/oracles/oracles', 'blockchain/transaction-fees/transaction-fees'],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Mine HNT',
      items: ['mine-hnt/mine-hnt', 'mine-hnt/hotspot-makers/hotspot-makers', 'mine-hnt/build-a-packet-forwarder/build-a-packet-forwarder'],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'LoRaWAN on Helium',
      items: ['lorawan-on-helium/lorawan-on-helium', 'lorawan-on-helium/frequency-plans/frequency-plans'],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Use The Network',
      items: ['use-the-network/use-the-network', 'use-the-network/devices/devices', 'use-the-network/console/console', 'use-the-network/community-projects/community-projects', 'use-the-network/coverage-mapping/coverage-mapping'],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'HNT Wallets',
      items: ['wallets/wallets', 'wallets/wallets/ledger'],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Community and Governance',
      items: ['community-governance/community-governance'],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Open Source',
      items: ['open-source/open-source'],
      collapsed: true,
    },
  ],
  api: [
    'api/home',
   { 
      type: 'category',
      label: 'Blockchain',
      items: ['api/blockchain/introduction', 'api/blockchain/stats', 'api/blockchain/blocks', 'api/blockchain/accounts', 'api/blockchain/hotspots', 'api/blockchain/cities', 'api/blockchain/locations', 'api/blockchain/transactions', 'api/blockchain/pending-transactions', 'api/blockchain/oracle-prices', 'api/blockchain/chain-variables', 'api/blockchain/ouis'],
      collapsed: true,
    },
    'api/console',
  ],
  console: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/console'
    }, 
    {
      type: 'category',
      label: 'Console',
      items: ['use-the-network/console/quickstart', 'use-the-network/console/users', 'use-the-network/console/data-credits', 'use-the-network/console/adding-devices', 'use-the-network/console/migrating-devices/migrating-devices', 'use-the-network/console/labels', 'use-the-network/console/debug', 'use-the-network/console/console-adr', 'use-the-network/console/functions', 'use-the-network/console/integrations/integrations', 'use-the-network/console/console-cli', 'use-the-network/console/console-api','use-the-network/console/my-account'],
      collapsed: false,
    }
  ],
  integrations: [
   {
      type: 'link',
      label: '<- Console',
      href: '/use-the-network/console/integrations'
    }, 
    {
      type: 'category',
      label: 'Integrations',
      items: ['use-the-network/console/integrations/json-schema', 'use-the-network/console/integrations/http', 'use-the-network/console/integrations/mqtt', 'use-the-network/console/integrations/aws-iot-core', 'use-the-network/console/integrations/cargo', 'use-the-network/console/integrations/mydevices-cayenne', 'use-the-network/console/integrations/adafruitio'],
      collapsed: false,
    },
  ],
  migratingdevices: [
   {
      type: 'link',
      label: '<- Console',
      href: '/use-the-network/console/migrating-devices'
    }, 
    {
      type: 'category',
      label: 'Migrating Devices',
      items: ['use-the-network/console/migrating-devices/ttn-import', 'use-the-network/console/migrating-devices/ttn-manual'],
      collapsed: false,
    },
  ],
  coveragemapping: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/coverage-mapping'
    }, 
    {
      type: 'category',
      label: 'Coverage Mapping',
      items: ['use-the-network/coverage-mapping/mappers-quickstart', 'use-the-network/coverage-mapping/mappers-data', 'use-the-network/coverage-mapping/mappers-api', 'use-the-network/coverage-mapping/adeunis-mapper'],
      collapsed: false,
    },
  ],
  readyToUse: [
   {
      type: 'link',
      label: '<- Devices',
      href: '/use-the-network/devices'
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
      href: '/use-the-network/devices'
    }, 
    {
      type: 'category',
      label: 'Development',
      items: ['use-the-network/devices/development/development', 'use-the-network/devices/development/st-b-l072z-lrwan1/st-b-l072z-lrwan1', 'use-the-network/devices/development/sparkfun-pro-rf/sparkfun-pro-rf', 'use-the-network/devices/development/adafruit-feather-m0-rfm95/adafruit-feather-m0-rfm95', 'use-the-network/devices/development/heltec-cubecell-htcc-ab01/heltec-cubecell-htcc-ab01', 'use-the-network/devices/development/heltec-wifi-lora-32-v2/heltec-wifi-lora-32-v2'],
      collapsed: false,
    },
  ],
  hotspotMakers: [
   {
      type: 'link',
      label: '<- Hotspot Makers',
      href: '/mine-hnt/hotspot-makers'
    }, 
    {
      type: 'category',
      label: 'Makers',
      items: ['mine-hnt/hotspot-makers/approved-makers', 'mine-hnt/hotspot-makers/maker-approval-auditing', 'mine-hnt/hotspot-makers/hotspot-integration-testing', 'mine-hnt/hotspot-makers/hotspot-ble-services', 'mine-hnt/hotspot-makers/hotspot-wifi-configuration','mine-hnt/hotspot-makers/burn-hnt-to-maker-wallet',],
      collapsed: false,
    },
  ],  
  bL072zLrwan1: [
   {
      type: 'link',
      label: '<- ST B-L072Z-LRWAN1',
      href: '/use-the-network/devices/development/st-b-l072z-lrwan1'
    }, 
    {
      type: 'category',
      label: 'Firmware',
      items: ['use-the-network/devices/development/st-b-l072z-lrwan1/arduino'],
      collapsed: false,
    },
  ],
  sparkfunprorf: [
   {
      type: 'link',
      label: '<- Sparkfun Pro RF',
      href: '/use-the-network/devices/development/sparkfun-pro-rf'
    }, 
    {
      type: 'category',
      label: 'Firmware',
      items: ['use-the-network/devices/development/sparkfun-pro-rf/arduino'],
      collapsed: false,
    },
  ],
  adafruitfeatherm0rfm95: [
   {
      type: 'link',
      label: '<- Adafruit Feather M0 RFM95',
      href: '/use-the-network/devices/development/adafruit-feather-m0-rfm95'
    }, 
    {
      type: 'category',
      label: 'Firmware',
      items: ['use-the-network/devices/development/adafruit-feather-m0-rfm95/arduino'],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Guides',
      items: ['use-the-network/devices/development/adafruit-feather-m0-rfm95/adafruitio'],
      collapsed: false,
    },
  ],
  helteccubecelhtccab01: [
   {
      type: 'link',
      label: '<- Heltec Cubecell HTCC AB01',
      href: '/use-the-network/devices/development/heltec-cubecell-htcc-ab01'
    }, 
    {
      type: 'category',
      label: 'Firmware',
      items: ['use-the-network/devices/development/heltec-cubecell-htcc-ab01/arduino'],
      collapsed: false,
    },
  ],
  heltecwifilora32v2: [
   {
      type: 'link',
      label: '<- Heltec WiFi LoRa 32 V2',
      href: '/use-the-network/devices/development/heltec-wifi-lora-32-v2'
    }, 
    {
      type: 'category',
      label: 'Firmware',
      items: ['use-the-network/devices/development/heltec-wifi-lora-32-v2/arduino'],
      collapsed: false,
    },
  ]
};