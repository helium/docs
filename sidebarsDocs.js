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
      items: ['mine-hnt/mine-hnt', 'mine-hnt/hotspot-makers/hotspot-makers', 'mine-hnt/validators/validators','mine-hnt/light-hotspots/light-hotspots'],
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
      items: ['use-the-network/use-the-network', 'use-the-network/devices/devices', 'use-the-network/console/console', 'use-the-network/run-a-network-server/run-a-network-server', 'use-the-network/build-a-packet-forwarder/build-a-packet-forwarder', 'use-the-network/community-projects/community-projects', 'use-the-network/coverage-mapping/coverage-mapping'],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'HNT Wallets',
      items: ['wallets/wallets', 'wallets/app-wallet/app-wallet', 'wallets/ledger'],
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
    {
      type: 'category',
      label: 'FAQ',
      items: ['faq/helium-network', 'faq/security', 'faq/hotspot-manufacturers', 'faq/build-on-network', 'faq/data-credits'],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      items: ['troubleshooting/hotspot-setup-troubleshooting', 'troubleshooting/replace-sd-card', 'troubleshooting/improving-poc', 'troubleshooting/network-troubleshooting', 'troubleshooting/hotspot-led'],
      collapsed: true,
    },
  ],
  api: [
    'api/home',
   {
      type: 'category',
      label: 'Blockchain',
      items: ['api/blockchain/introduction', 'api/blockchain/stats', 'api/blockchain/blocks', 'api/blockchain/accounts', 'api/blockchain/validators', 'api/blockchain/hotspots', 'api/blockchain/cities', 'api/blockchain/locations', 'api/blockchain/transactions', 'api/blockchain/pending-transactions', 'api/blockchain/oracle-prices', 'api/blockchain/chain-variables', 'api/blockchain/ouis', 'api/blockchain/rewards'],
      collapsed: true,
    },
    'api/console',
  ],
  appwallet: [
   {
      type: 'link',
      label: '<- Back',
      href: '/wallets/app-wallet'
    },
    {
      type: 'category',
      label: 'App Wallet',
      items: ['wallets/app-wallet/twelve-words', 'wallets/app-wallet/transfer-hotspot', 'wallets/app-wallet/rak-hotspot-setup'],
      collapsed: false,
    }
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
      items: ['use-the-network/console/quickstart', 'use-the-network/console/users', 'use-the-network/console/data-credits', 'use-the-network/console/adding-devices', 'use-the-network/console/migrating-devices/migrating-devices', 'use-the-network/console/labels', 'use-the-network/console/debug', 'use-the-network/console/console-adr', 'use-the-network/console/functions', 'use-the-network/console/integrations/integrations', 'use-the-network/console/console-cli', 'use-the-network/console/console-api','use-the-network/console/my-account', 'use-the-network/console/troubleshooting'],
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
      items: ['use-the-network/console/integrations/json-schema', 'use-the-network/console/integrations/http', 'use-the-network/console/integrations/mqtt', 'use-the-network/console/integrations/aws-iot-core', 'use-the-network/console/integrations/cargo', 'use-the-network/console/integrations/datacake', 'use-the-network/console/integrations/mydevices-cayenne', 'use-the-network/console/integrations/adafruitio', 'use-the-network/console/integrations/ubidots', 'use-the-network/console/integrations/tago', 'use-the-network/console/integrations/google-sheets'],
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
  runanetworkserver: [
      {
          type: 'link',
          label: '<- Back',
          href: '/use-the-network/run-a-network-server'
      },
      {
          type: 'category',
          label: 'Run a Network Server',
          items: ['use-the-network/run-a-network-server/buy-an-oui/buy-an-oui', 'use-the-network/run-a-network-server/run-console/run-console'],
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
      items: ['use-the-network/coverage-mapping/mappers-quickstart', 'use-the-network/coverage-mapping/mappers-api', 'use-the-network/coverage-mapping/adeunis-mapper'],
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
      items: [
        'use-the-network/devices/ready-to-use/ready-to-use'
    ],
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
      items: [
        'use-the-network/devices/development/development'
      ],
      collapsed: false,
    },
  ],
  devquickstart: [
   {
      type: 'link',
      label: '<- Devices',
      href: '/use-the-network/devices'
    },
    {
      type: 'category',
      label: 'Development Quickstart',
      items: [
        'use-the-network/devices/development/quickstart-guides'
      ],
      collapsed: false,
    },
  ],
  adafruit: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/development'
    },
    {
      type: 'category',
      label: 'Arduino',
      items: [
        'use-the-network/devices/development/adafruit/adafruit-feather-m0-rfm95/adafruit-feather-m0-rfm95'
      ],
      collapsed: false,
    },
  ],
  arduino: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/development'
    },
    {
      type: 'category',
      label: 'Arduino',
      items: [
        'use-the-network/devices/development/arduino/mkr-wan-1310',
        'use-the-network/devices/development/arduino/lora-vision-shield'
      ],
      collapsed: false,
    },
  ],
  embit: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/development'
    },
    {
      type: 'category',
      label: 'Embit',
      items: [
        'use-the-network/devices/development/embit/emb-lr1280s',
        'use-the-network/devices/development/embit/emb-lrwl55'
      ],
      collapsed: false,
    },
  ],
  heltec: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/development'
    },
    {
      type: 'category',
      label: 'Heltec',
      items: [
        'use-the-network/devices/development/heltec/cubecell-gps-6502',
        'use-the-network/devices/development/heltec/cubecell-dev-board/cubecell-dev-board',
        'use-the-network/devices/development/heltec/cubecell-dev-board-plus',
        'use-the-network/devices/development/heltec/cubecell-1-2-aa-node',
        'use-the-network/devices/development/heltec/cubecell-capsule-sensor',
        'use-the-network/devices/development/heltec/cubecell-solar-sensor',
        'use-the-network/devices/development/heltec/cubecell-module',
        'use-the-network/devices/development/heltec/cubecell-module-plus',
        'use-the-network/devices/development/heltec/wifi-lora-32-v2/wifi-lora-32-v2',
        'use-the-network/devices/development/heltec/wireless-stick',
        'use-the-network/devices/development/heltec/wireless-stick-lite',
        'use-the-network/devices/development/heltec/wireless-shell',
        'use-the-network/devices/development/heltec/lora-kit-151',
        'use-the-network/devices/development/heltec/lora-node-151',
        'use-the-network/devices/development/heltec/turtle-board' 
      ],
      collapsed: false,
    },
  ],
  mcci: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/development'
    },
    {
      type: 'category',
      label: 'MCCI',
      items: [
        'use-the-network/devices/development/mcci/catena4430',
        'use-the-network/devices/development/mcci/catena4450',
        'use-the-network/devices/development/mcci/catena4460',
        'use-the-network/devices/development/mcci/catena4470',
        'use-the-network/devices/development/mcci/catena4610',
        'use-the-network/devices/development/mcci/catena4612',
        'use-the-network/devices/development/mcci/catena4618',
        'use-the-network/devices/development/mcci/catena4618m201',
        'use-the-network/devices/development/mcci/catena4801',
        'use-the-network/devices/development/mcci/catena4802',
        'use-the-network/devices/development/mcci/model4811',
        'use-the-network/devices/development/mcci/model4821',
        'use-the-network/devices/development/mcci/model4822',
        'use-the-network/devices/development/mcci/model4823',
        'use-the-network/devices/development/mcci/model4831',
        'use-the-network/devices/development/mcci/model4832',
        'use-the-network/devices/development/mcci/model4841'
      ],
      collapsed: false,
    },
  ],
  midatronics: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/development'
    },
    {
      type: 'category',
      label: 'Midatronics',
      items: [
        'use-the-network/devices/development/midatronics/windy-module',
        'use-the-network/devices/development/midatronics/windy-mkr',
        'use-the-network/devices/development/midatronics/sharky-module'
      ],
      collapsed: false,
    },
  ],
  multitech: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/development'
    },
    {
      type: 'category',
      label: 'Multi-Tech',
      items: [
        'use-the-network/devices/development/multi-tech/multi-tech-xdot'
      ],
      collapsed: false,
    },
  ],
  rakwireless: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/development'
    },
    {
      type: 'category',
      label: 'RAK Wireless',
      items: [
        'use-the-network/devices/development/rakwireless/wisblock-4631/wisblock-4631',
        'use-the-network/devices/development/rakwireless/rak7431'
      ],
      collapsed: false,
    },
  ],
  sparkfun: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/development'
    },
    {
      type: 'category',
      label: 'Sparkfun',
      items: [
        'use-the-network/devices/development/sparkfun/pro-rf/pro-rf',
      ],
      collapsed: false,
    },
  ],
  stmicroelectronics: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/development'
    },
    {
      type: 'category',
      label: 'STMicroelectronics',
      items: [
        'use-the-network/devices/development/stmicroelectronics/st-b-l072z-lrwan1/st-b-l072z-lrwan1',
        'use-the-network/devices/development/stmicroelectronics/nucleo-wl55jc1',
        'use-the-network/devices/development/stmicroelectronics/nucleo-wl55jc2'
      ],
      collapsed: false,
    },
  ],
  abeeway: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use'
    },
    {
      type: 'category',
      label: 'Abeeway',
      items: [
        'use-the-network/devices/ready-to-use/abeeway/abeeway-geolocation-module',
        'use-the-network/devices/ready-to-use/abeeway/abeeway-industrial-tracker',
        'use-the-network/devices/ready-to-use/abeeway/abeeway-compact-tracker',
        'use-the-network/devices/ready-to-use/abeeway/abeeway-micro-tracker',
        'use-the-network/devices/ready-to-use/abeeway/abeeway-smart-badge'
      ],

      collapsed: false,
    },
  ],
  adeunis: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use'
    },
    {
      type: 'category',
      label: 'Adeunis',
      items: [
        'use-the-network/devices/ready-to-use/adeunis/adeunis-field-test-device', 
      ],

      collapsed: false,
    },
  ],
  aquascope: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use'
    },
    {
      type: 'category',
      label: 'Acqua-Scope',
      items: [
        'use-the-network/devices/ready-to-use/aquascope/bvs',
        'use-the-network/devices/ready-to-use/aquascope/wwd'
      ],

      collapsed: false,
    },
  ],
  beiselen: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use'
    },
    {
      type: 'category',
      label: 'Beiselen',
      items: [
        'use-the-network/devices/ready-to-use/beiselen/radar'
      ],

      collapsed: false,
    },
  ],
  bosch: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use'
    },
    {
      type: 'category',
      label: 'Bosch',
      items: [
        'use-the-network/devices/ready-to-use/bosch/tps110'
      ],

      collapsed: false,
    },
  ],
  boatofficer: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use'
    },
    {
      type: 'category',
      label: 'BoatOfficer',
      items: [
        'use-the-network/devices/ready-to-use/boatofficer/boatofficerblue',
      ],

      collapsed: false,
    },
  ],
  comtac: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use'
    },
    {
      type: 'category',
      label: 'Comtac',
      items: [
        'use-the-network/devices/ready-to-use/comtac/lpn-td1',
        'use-the-network/devices/ready-to-use/comtac/lpn-km',
        'use-the-network/devices/ready-to-use/comtac/lpn-tsm'
      ],

      collapsed: false,
    },
  ],
  decentlab: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use'
    },
    {
      type: 'category',
      label: 'Decent Lab',
      items: [
        'use-the-network/devices/ready-to-use/decentlab/dl-iam',
        'use-the-network/devices/ready-to-use/decentlab/dl-pr26',
        'use-the-network/devices/ready-to-use/decentlab/dl-mbx',
        'use-the-network/devices/ready-to-use/decentlab/dl-5tm',
        'use-the-network/devices/ready-to-use/decentlab/dl-atm22',
        'use-the-network/devices/ready-to-use/decentlab/dl-atm41',
        'use-the-network/devices/ready-to-use/decentlab/dl-ctd10',
        'use-the-network/devices/ready-to-use/decentlab/dl-dlr2-002',
        'use-the-network/devices/ready-to-use/decentlab/dl-dlr2-003',
        'use-the-network/devices/ready-to-use/decentlab/dl-dlr2-004',
        'use-the-network/devices/ready-to-use/decentlab/dl-dlr2-005',
        'use-the-network/devices/ready-to-use/decentlab/dl-dlr2-006',
        'use-the-network/devices/ready-to-use/decentlab/dl-dlr2-008',
        'use-the-network/devices/ready-to-use/decentlab/dl-dlr2-010',
        'use-the-network/devices/ready-to-use/decentlab/dl-dlr2-012',
        'use-the-network/devices/ready-to-use/decentlab/dl-ds18',
        'use-the-network/devices/ready-to-use/decentlab/dl-dws',
        'use-the-network/devices/ready-to-use/decentlab/dl-itst',
        'use-the-network/devices/ready-to-use/decentlab/dl-kl66',
        'use-the-network/devices/ready-to-use/decentlab/dl-lid',
        'use-the-network/devices/ready-to-use/decentlab/dl-lp8p',
        'use-the-network/devices/ready-to-use/decentlab/dl-optod',
        'use-the-network/devices/ready-to-use/decentlab/dl-par',
        'use-the-network/devices/ready-to-use/decentlab/dl-pm',
        'use-the-network/devices/ready-to-use/decentlab/dl-pr21',
        'use-the-network/devices/ready-to-use/decentlab/dl-pr36',
        'use-the-network/devices/ready-to-use/decentlab/dl-pr36ctd',
        'use-the-network/devices/ready-to-use/decentlab/dl-pyr',
        'use-the-network/devices/ready-to-use/decentlab/dl-rhc',
        'use-the-network/devices/ready-to-use/decentlab/dl-sht35-001',
        'use-the-network/devices/ready-to-use/decentlab/dl-sht35-002',
        'use-the-network/devices/ready-to-use/decentlab/dl-smtp',
        'use-the-network/devices/ready-to-use/decentlab/dl-tbrg',
        'use-the-network/devices/ready-to-use/decentlab/dl-trs11',
        'use-the-network/devices/ready-to-use/decentlab/dl-trs12',
        'use-the-network/devices/ready-to-use/decentlab/dl-trs21',
        'use-the-network/devices/ready-to-use/decentlab/dl-wrm',
        'use-the-network/devices/ready-to-use/decentlab/dl-zn1',
        'use-the-network/devices/ready-to-use/decentlab/dl-zn2'
      ],

      collapsed: false,
    },
  ],
  develiot: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use'
    },
    {
      type: 'category',
      label: 'Develiot',
      items: [
        'use-the-network/devices/ready-to-use/develiot/rwmr',
        'use-the-network/devices/ready-to-use/develiot/uaqms'
      ],

      collapsed: false,
    },
  ],
  digitalmatter: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use'
    },
    {
      type: 'category',
      label: 'Digtal Matter',
      items: [
        'use-the-network/devices/ready-to-use/digital-matter/oyster',
        'use-the-network/devices/ready-to-use/digital-matter/yabby-edge',
        'use-the-network/devices/ready-to-use/digital-matter/digital-matter-lorawan-gps'
      ],

      collapsed: false,
    },
  ],
  dragino: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use'
    },
    {
      type: 'category',
      label: 'Dragino',
      items: [
        'use-the-network/devices/ready-to-use/dragino/rs485-ln',
        'use-the-network/devices/ready-to-use/dragino/rs485-bl',
        'use-the-network/devices/ready-to-use/dragino/lsn50v2-s31',
        'use-the-network/devices/ready-to-use/dragino/lsn50v2-d20',
        'use-the-network/devices/ready-to-use/dragino/ldds20',
        'use-the-network/devices/ready-to-use/dragino/ldds75',
        'use-the-network/devices/ready-to-use/dragino/lbt1',
        'use-the-network/devices/ready-to-use/dragino/lse01',
        'use-the-network/devices/ready-to-use/dragino/lwl01',
        'use-the-network/devices/ready-to-use/dragino/lds01',
        'use-the-network/devices/ready-to-use/dragino/lgt92',
        'use-the-network/devices/ready-to-use/dragino/lt22222-l',
        'use-the-network/devices/ready-to-use/dragino/lt33222-l',
        'use-the-network/devices/ready-to-use/dragino/lht65',
        'use-the-network/devices/ready-to-use/dragino/lsn50-v2'
      ],

      collapsed: false,
    },
  ],
  enthutech: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use'
    },
    {
      type: 'category',
      label: 'Enthutech',
      items: [
        'use-the-network/devices/ready-to-use/enthutech/rs485-ln',
        'use-the-network/devices/ready-to-use/enthutech/rs485-bl',
        'use-the-network/devices/ready-to-use/enthutech/lsn50v2-s31',
        'use-the-network/devices/ready-to-use/enthutech/lsn50v2-d20',
        'use-the-network/devices/ready-to-use/enthutech/ldss20',
        'use-the-network/devices/ready-to-use/enthutech/ldds75',
        'use-the-network/devices/ready-to-use/enthutech/lbt1',
        'use-the-network/devices/ready-to-use/enthutech/lse01',
        'use-the-network/devices/ready-to-use/enthutech/lwl01',
        'use-the-network/devices/ready-to-use/enthutech/lds01'
      ],

      collapsed: false,
    },
  ],
  imst: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use'
    },
    {
      type: 'category',
      label: 'IMST',
      items: [
        'use-the-network/devices/ready-to-use/imst/range-extender',
        'use-the-network/devices/ready-to-use/imst/ioke868'
      ],

      collapsed: false,
    },
  ],
  iotsens: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use'
    },
    {
      type: 'category',
      label: 'IoTsens',
      items: [
        'use-the-network/devices/ready-to-use/iotsens/sound-device',
        'use-the-network/devices/ready-to-use/iotsens/airquality-device',
        'use-the-network/devices/ready-to-use/iotsens/lidar-device'
      ],

      collapsed: false,
    },
  ],
  izinto: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use'
    },
    {
      type: 'category',
      label: 'izinto',
      items: [
        'use-the-network/devices/ready-to-use/izinto/izi-io-4840'
      ],

      collapsed: false,
    },
  ],
  laird: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use'
    },
    {
      type: 'category',
      label: 'Laird',
      items: [
        'use-the-network/devices/ready-to-use/laird/rs1xx-temp-rh-sensor',
        'use-the-network/devices/ready-to-use/laird/rs1xx-ext-temp-1w-sensor',
        'use-the-network/devices/ready-to-use/laird/rs1xx-ext-multi-sensor',
        'use-the-network/devices/ready-to-use/laird/rs1xx-ext-temp-rtd-sensor'
      ],

      collapsed: false,
    },
  ],
  mcf88: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use'
    },
    {
      type: 'category',
      label: 'mcf88',
      items: [
        'use-the-network/devices/ready-to-use/mcf88/mcf-lw06davk',
        'use-the-network/devices/ready-to-use/mcf88/mcf-lw06davpk',
        'use-the-network/devices/ready-to-use/mcf88/mcf-lw12co2',
        'use-the-network/devices/ready-to-use/mcf88/mcf-lw12met',
        'use-the-network/devices/ready-to-use/mcf88/mcf-lw12plg',
        'use-the-network/devices/ready-to-use/mcf88/mcf-lw12ter',
        'use-the-network/devices/ready-to-use/mcf88/mcf-lw12terwp',
        'use-the-network/devices/ready-to-use/mcf88/mcf-lw12terpm',
        'use-the-network/devices/ready-to-use/mcf88/mcf-lw12voc',
        'use-the-network/devices/ready-to-use/mcf88/mcf-lw13io',
        'use-the-network/devices/ready-to-use/mcf88/mcf-lw13mio',
        'use-the-network/devices/ready-to-use/mcf88/mcf-lwws00',
        'use-the-network/devices/ready-to-use/mcf88/mcf-lwws01',
        'use-the-network/devices/ready-to-use/mcf88/mcf-lwws02',
        'use-the-network/devices/ready-to-use/mcf88/mcf-lwws03'
      ],

      collapsed: false,
    },
  ],
  mclimate: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use'
    },
    {
      type: 'category',
      label: 'MClimate',
      items: [
        'use-the-network/devices/ready-to-use/mclimate/vicki',
        'use-the-network/devices/ready-to-use/mclimate/t-valve',
        'use-the-network/devices/ready-to-use/mclimate/flood-sensor',
        'use-the-network/devices/ready-to-use/mclimate/ht-sensor',
        'use-the-network/devices/ready-to-use/mclimate/aqi-sensor'
      ],

      collapsed: false,
    },
  ],
  milesightiot: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use'
    },
    {
      type: 'category',
      label: 'Milesight',
      items: [
        'use-the-network/devices/ready-to-use/milesight-iot/am107',
        'use-the-network/devices/ready-to-use/milesight-iot/em300-th',
        'use-the-network/devices/ready-to-use/milesight-iot/em500-co2',
        'use-the-network/devices/ready-to-use/milesight-iot/em500-udl'
      ],

      collapsed: false,
    },
  ],
  moko: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use'
    },
    {
      type: 'category',
      label: 'Moko',
      items: [
        'use-the-network/devices/ready-to-use/moko/lw001-bg',
        'use-the-network/devices/ready-to-use/moko/lw003-b',
        'use-the-network/devices/ready-to-use/moko/lw004',
        'use-the-network/devices/ready-to-use/moko/lw005-mp'
      ],

      collapsed: false,
    },
  ],
  netvox: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use'
    },
    {
      type: 'category',
      label: 'Netvox',
      items: [
        'use-the-network/devices/ready-to-use/netvox/r311a',
        'use-the-network/devices/ready-to-use/netvox/r311b',
        'use-the-network/devices/ready-to-use/netvox/r311g',
        'use-the-network/devices/ready-to-use/netvox/r311w',
        'use-the-network/devices/ready-to-use/netvox/r312',
        'use-the-network/devices/ready-to-use/netvox/r312a',
        'use-the-network/devices/ready-to-use/netvox/r711',
        'use-the-network/devices/ready-to-use/netvox/r718a',
        'use-the-network/devices/ready-to-use/netvox/r718ab',
        'use-the-network/devices/ready-to-use/netvox/r718b',
        'use-the-network/devices/ready-to-use/netvox/r718ck',
        'use-the-network/devices/ready-to-use/netvox/r718ct',
        'use-the-network/devices/ready-to-use/netvox/r718e',
        'use-the-network/devices/ready-to-use/netvox/r718f',
        'use-the-network/devices/ready-to-use/netvox/r718n1',
        'use-the-network/devices/ready-to-use/netvox/r718n3',
        'use-the-network/devices/ready-to-use/netvox/r718t',
        'use-the-network/devices/ready-to-use/netvox/r720a',
        'use-the-network/devices/ready-to-use/netvox/r72615',
        'use-the-network/devices/ready-to-use/netvox/r72615a',
        'use-the-network/devices/ready-to-use/netvox/ra0715',
        'use-the-network/devices/ready-to-use/netvox/ra0715y',
        'use-the-network/devices/ready-to-use/netvox/rb02i',
        'use-the-network/devices/ready-to-use/netvox/rb11e'
      ],

      collapsed: false,
    },
  ],
  nwave: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use'
    },
    {
      type: 'category',
      label: 'Nwave',
      items: [
        'use-the-network/devices/ready-to-use/nwave/nps310sm'
      ],

      collapsed: false,
    },
  ],
  seeedstudiortu: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use'
    },
    {
      type: 'category',
      label: 'Seeed Studio',
      items: [
        'use-the-network/devices/ready-to-use/seeed-studio/sensecap-soil-th',
        'use-the-network/devices/ready-to-use/seeed-studio/sensecap-air-th',
        'use-the-network/devices/ready-to-use/seeed-studio/sensecap-light',
        'use-the-network/devices/ready-to-use/seeed-studio/sensecap-co2',
        'use-the-network/devices/ready-to-use/seeed-studio/sensecap-pressure',
      ],

      collapsed: false,
    },
  ],
  seeedstudiodev: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/development'
    },
    {
      type: 'category',
      label: 'Seeed Studio',
      items: [
        'use-the-network/devices/development/seeed-studio/loramodule-e5',
        'use-the-network/devices/development/seeed-studio/loramodule-e5-devkit',
        'use-the-network/devices/development/seeed-studio/loramodule-e5-mini',
        'use-the-network/devices/development/seeed-studio/loramodule-e5-grove'
      ],

      collapsed: false,
    },
  ],
  sensedge: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use'
    },
    {
      type: 'category',
      label: 'Sensedge',
      items: [
        'use-the-network/devices/ready-to-use/sensedge/senstick-pro',
        'use-the-network/devices/ready-to-use/sensedge/senstick-pure'
      ],

      collapsed: false,
    },
  ],
  tektelic: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use'
    },
    {
      type: 'category',
      label: 'Tektelic',
      items: [
        'use-the-network/devices/ready-to-use/tektelic/t000489x-smart-room-base',
        'use-the-network/devices/ready-to-use/tektelic/t00048xx-smart-room-pir'
      ],

      collapsed: false,
    },
  ],
  tekzitel: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use'
    },
    {
      type: 'category',
      label: 'Tekzitel',
      items: [
        'use-the-network/devices/ready-to-use/tekzitel/tekzipark'
      ],

      collapsed: false,
    },
  ],
  thethingsproducts: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use'
    },
    {
      type: 'category',
      label: 'The Things Products',
      items: [
        'use-the-network/devices/ready-to-use/the-things-products/the-things-node',
        'use-the-network/devices/ready-to-use/the-things-products/the-things-uno'
      ],

      collapsed: false,
    },
  ],
  victor: [
   {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use'
    },
    {
      type: 'category',
      label: 'Victor',
      items: [
        'use-the-network/devices/ready-to-use/victor/victor-trap-v4xx'
      ],

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
      items: ['mine-hnt/hotspot-makers/approved-makers/approved-makers', 'mine-hnt/hotspot-makers/maker-approval-auditing/maker-approval-auditing', 'mine-hnt/hotspot-makers/hotspot-integration-testing/hotspot-integration-testing', 'mine-hnt/hotspot-makers/docker-integration/docker-integration', 'mine-hnt/hotspot-makers/security-requirements/security-requirements','mine-hnt/hotspot-makers/hotspot-ble-services/hotspot-ble-services', 'mine-hnt/hotspot-makers/hotspot-wifi-configuration/hotspot-wifi-configuration', 'mine-hnt/hotspot-makers/burn-hnt-to-maker-wallet/burn-hnt-to-maker-wallet'],
      collapsed: false,
    },
  ],
  validators: [
   {
      type: 'link',
      label: '<- Back',
      href: '/mine-hnt/validators'
    },
    {
      type: 'category',
      label: 'Validators',
      items: ['mine-hnt/validators/requirements', 'mine-hnt/validators/validator-deployment-guide', 'mine-hnt/validators/validator-wallet', 'mine-hnt/validators/validator-score', 'mine-hnt/validators/validator-troubleshooting', 'mine-hnt/validators/validator-testcases','mine-hnt/validators/validator-faqs-resources'],
      collapsed: false,
    },
  ],
   lightHotspots: [
   {
       type: 'link',
       label: '<- Light Hotspot',
       href: '/mine-hnt/light-hotspots'
   },
   {
       type: 'category',
       label: 'Light Hotspot Guides',
       items: ['mine-hnt/light-hotspots/guides/dragino', 'mine-hnt/light-hotspots/guides/kerlink'],
       collapsed: false,
   },
  ],
  bL072zLrwan1: [
   {
      type: 'link',
      label: '<- ST B-L072Z-LRWAN1',
      href: '/use-the-network/devices/development/stmicroelectronics/st-b-l072z-lrwan1'
    },
    {
      type: 'category',
      label: 'Firmware',
      items: ['use-the-network/devices/development/stmicroelectronics/st-b-l072z-lrwan1/arduino','use-the-network/devices/development/stmicroelectronics/st-b-l072z-lrwan1/platformio'],
      collapsed: false,
    },
  ],
  sparkfunprorf: [
   {
      type: 'link',
      label: '<- Sparkfun Pro RF',
      href: '/use-the-network/devices/development/sparkfun/pro-rf'
    },
    {
      type: 'category',
      label: 'Firmware',
      items: ['use-the-network/devices/development/sparkfun/pro-rf/arduino'],
      collapsed: false,
    },
  ],
  adafruitfeatherm0rfm95: [
   {
      type: 'link',
      label: '<- Adafruit Feather M0 RFM95',
      href: '/use-the-network/devices/development/adafruit/adafruit-feather-m0-rfm95'
    },
    {
      type: 'category',
      label: 'Firmware',
      items: ['use-the-network/devices/development/adafruit/adafruit-feather-m0-rfm95/arduino'],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Guides',
      items: ['use-the-network/devices/development/adafruit/adafruit-feather-m0-rfm95/adafruitio'],
      collapsed: false,
    },
  ],
  helteccubecelhtccab01: [
   {
      type: 'link',
      label: '<- HTCC-AB01',
      href: '/use-the-network/devices/development/heltec/cubecell-dev-board'
    },
    {
      type: 'category',
      label: 'Firmware',
      items: ['use-the-network/devices/development/heltec/cubecell-dev-board/arduino', 'use-the-network/devices/development/heltec/cubecell-dev-board/platformio'],
      collapsed: false,
    },
  ],
  rakwisblock4631: [
    {
       type: 'link',
       label: '<- RAK-Wireless WisBlock Starter Kit',
       href: '/use-the-network/devices/development/rakwireless/wisblock-4631'
     },
     {
       type: 'category',
       label: 'Firmware',
       items: ['use-the-network/devices/development/rakwireless/wisblock-4631/arduino', 'use-the-network/devices/development/rakwireless/wisblock-4631/platformio'],
       collapsed: false,
     },
   ],
  heltecwifilora32v2: [
   {
      type: 'link',
      label: '<- WiFi LoRa 32 V2',
      href: '/use-the-network/devices/development/heltec/wifi-lora-32-v2'
    },
    {
      type: 'category',
      label: 'Firmware',
      items: ['use-the-network/devices/development/heltec/wifi-lora-32-v2/arduino'],
      collapsed: false,
    },
  ]
};
