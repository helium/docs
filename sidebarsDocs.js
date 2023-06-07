module.exports = {
  home: [
    {
      type: 'category',
      label: 'Home',
      link: { type: 'doc', id: 'home/home' },
      items: ['home/about-helium', 'home/helium-history'],
    },
  ],

  solanamigration: [
    {
      type: 'category',
      label: 'Solana Migration Guides',
      link: { type: 'doc', id: 'solana/migration-overview' },
      items: [
        'solana/migration-faq',
        'solana/migration/hotspot-operator',
        'solana/migration/validator-operator',
        {
          type: 'category',
          label: 'Hotspot Maker',
          items: ['solana/migration/maker', 'solana/migration/maker-hotspot-software'],
        },
        'solana/migration/exchange',
        'solana/migration/network-user',
        'solana/migration/console-operator',
        'solana/migration/application-builder',
        'solana/migration/governance',
        'solana/migration/blockchain-node',
        'solana/migration/blockchain-api',
        'solana/migration/blockchain-etl',
        'solana/migration/wallet-user',
        'solana/migration/ledger',
        'solana/migration/hst',
      ],
    },
  ],

  architecture: [
    {
      type: 'category',
      label: 'Solana',
      link: { type: 'doc', id: 'solana/solana' },
      items: ['solana/primer', 'solana/rewardable-entities', 'solana/compression-nfts'],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Oracles',
      link: { type: 'doc', id: 'oracles/oracles' },
      items: [
        'oracles/price-oracles',
        'oracles/rewards-oracles',
        'oracles/data-transfer-oracles',
        'oracles/iot-proof-of-coverage-oracles',
        'oracles/mobile-proof-of-coverage-oracles',
        'oracles/oracle-data',
      ],
      collapsed: true,
    },
  ],

  tokens: [
    'helium-tokens/hnt-token',
    'helium-tokens/iot-token',
    'helium-tokens/mobile-token',
    {
      type: 'category',
      label: 'Data Credit Tokens',
      link: { type: 'doc', id: 'helium-tokens/data-credit' },
      items: ['helium-tokens/data-credit', 'helium-tokens/data-credit-portal'],
      collapsed: true,
    },
    'vote-escrow/vehnt',
    'helium-tokens/sol-token',
    {
      type: 'category',
      label: 'Helium Wallets',
      items: [
        'wallets/wallets',
        'wallets/helium-wallet-app',
        'wallets/cli-wallet',
        'wallets/ledger',
      ],
      collapsed: true,
    },
    'wallets/wallet-seed-phrase',
  ],
  iotnetwork: [
    {
      type: 'category',
      label: 'LoRaWAN on Helium',
      link: { type: 'doc', id: 'network-iot/lorawan-on-helium' },
      items: [
        'network-iot/frequency-plans/frequency-plans',
        'network-iot/frequency-plans/region-plans',
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Mining IOT Tokens',
      link: { type: 'doc', id: 'helium-tokens/mine-iot' },
      items: [
        'blockchain/proof-of-coverage',
        'network-iot/iot-poc',
        'network-iot/crowdspot',
        'use-the-network/setup-a-packet-forwarder',
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'OpenLNS',
      link: { type: 'doc', id: 'network-iot/open-lns' },
      items: ['network-iot/open-lns-quickstart'],
    },
    {
      type: 'category',
      label: 'Roaming',
      items: [
        'use-the-network/roaming',
        'network-iot/lorawan-roaming',
        'network-iot/lorawan-roaming-quickstart',
      ],
    },
    {
      type: 'category',
      label: 'Use The IoT Network',
      items: [
        'use-the-network/use-the-network',
        {
          type: 'category',
          label: 'Devices',
          items: [
            'use-the-network/devices/devices',
            'use-the-network/devices/ready-to-use/ready-to-use',
            'use-the-network/devices/development/development',
            'use-the-network/devices/development/quickstart-guides',
          ],
        },
        'use-the-network/run-a-network-server/run-a-network-server',
        // 'use-the-network/console/console',
        // 'use-the-network/console-marketplace',
        // 'use-the-network/community-projects',
      ],
    },
    {
      type: 'category',
      label: 'Coverage Mapping',
      link: { type: 'doc', id: 'network-iot/coverage-mapping/coverage-mapping' },
      items: [
        'network-iot/coverage-mapping/mappers-api',
        'network-iot/coverage-mapping/mappers-roadmap',
        // 'use-the-network/coverage-mapping/mappers-quickstart',
        // 'use-the-network/coverage-mapping/adeunis-mapper',
      ],
    },
  ],

  mobilenetwork: [
    {
      type: 'category',
      label: '5G on Helium',
      items: [
        'network-mobile/cbrs/5g-on-helium',
        'network-mobile/cbrs/cbrs-radios',
        'network-mobile/mobile-poc',
        'network-mobile/mobile-mappers',
        'network-mobile/service-providers',
      ],
      collapsed: true,
    },
  ],

  communitygovernance: [
    {
      type: 'category',
      label: 'Governance',
      link: { type: 'doc', id: 'governance/governance' },
      items: [`governance/phase-1`, `governance/phase-2`, `governance/phase-3`],
    },
    'governance/voting',
    'vote-escrow/voting-power',
    'governance/realms',
    'vote-escrow/realms',
    'governance/working-groups',
    'governance/committees',
    {
      type: 'category',
      label: 'Improvement Proposals',
      link: { type: 'doc', id: 'governance/hip' },
      items: ['faq/write-a-hip', 'faq/edit-a-hip'],
    },
  ],

  hotspotmakers: [
    {
      type: 'category',
      label: 'Manufacturer Conformance Committee ',
      items: [
        {
          type: 'category',
          label: 'IOT Hotspot Makers',
          items: [
            'hotspot-makers/iot/light-hotspots',
            // 'hotspot-makers/iot/full-hotspots',
            {
              type: 'category',
              label: 'Data Only Hotspots',
              link: { type: 'doc', id: 'hotspot-makers/iot/data-only-hotspots' },
              items: [
                'hotspot-makers/iot/data-only/dragino',
                'hotspot-makers/iot/data-only/dragino-pg1301',
                'hotspot-makers/iot/data-only/kerlink',
                'hotspot-makers/iot/data-only/rak-concentrators',
                'hotspot-makers/iot/data-only/balena-data-only-hotspot',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: '5G Hotspot Makers',
          items: ['hotspot-makers/mobile-cbrs/5g-hardware-specification'],
        },
        'hotspot-makers/hotspot-makers',
        'hotspot-makers/mcc/maker-ethics',
        'hotspot-makers/mcc/compliance-committee',
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Become a Maker',
      items: [
        'hotspot-makers/become-a-maker/maker-approval-auditing',
        'hotspot-makers/become-a-maker/funding-a-maker-account',
        'hotspot-makers/become-a-maker/hotspot-integration-testing',
        'hotspot-makers/become-a-maker/basic-miner-operation',
        'hotspot-makers/become-a-maker/docker-integration',
        'hotspot-makers/become-a-maker/security-requirements',
        'hotspot-makers/become-a-maker/hotspot-ble-services',
        'hotspot-makers/become-a-maker/hotspot-wifi-configuration',
        'hotspot-makers/become-a-maker/burn-hnt-to-maker-wallet',
        'hotspot-makers/become-a-maker/maker-app-requirements',
        'hotspot-makers/mcc/hotspot-audit-process',
      ],
      collapsed: true,
    },
  ],

  docs: [
    {
      type: 'category',
      label: 'Blockchain',
      items: [
        'blockchain/blockchain',
        'blockchain/blockchain-primitives',
        'blockchain/mining',
        'blockchain/packet-purchasing',
        'blockchain/transaction-fees',
      ],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'Mine HNT',
      items: ['network-iot/denylist', 'network-iot/denylist-removals'],
      collapsed: true,
    },
    {
      type: 'category',
      label: 'FAQ',
      items: [
        'faq/helium-network',
        'faq/security',
        'faq/build-on-network',
        // 'faq/data-credits',
        'faq/open-source',
        'faq/docs-installation',
        'faq/privacy',
        'faq/terms',
      ],
      collapsed: true,
    },
  ],
  api: [
    'api/home',
    {
      type: 'category',
      label: 'Blockchain',
      items: [
        'api/blockchain/introduction',
        'api/blockchain/stats',
        'api/blockchain/blocks',
        'api/blockchain/accounts',
        'api/blockchain/hotspots',
        'api/blockchain/cities',
        'api/blockchain/locations',
        'api/blockchain/transactions',
        'api/blockchain/pending-transactions',
        'api/blockchain/oracle-prices',
        'api/blockchain/chain-variables',
        'api/blockchain/ouis',
        'api/blockchain/rewards',
        'api/blockchain/dc-burns',
        'api/blockchain/challenges',
        'api/blockchain/elections',
        'api/blockchain/state-channels',
        'api/blockchain/assert-locations',
        'api/blockchain/validators',
      ],
      collapsed: true,
    },
    'api/console',
  ],
  console: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/console',
    },
    {
      type: 'category',
      label: 'Console',
      items: [
        'use-the-network/console/quickstart',
        'use-the-network/console/users',
        'use-the-network/console/adding-devices',
        'use-the-network/console/migrating-devices/migrating-devices',
        'use-the-network/console/labels',
        'use-the-network/console/debug',
        'use-the-network/console/alerts',
        'use-the-network/console/multi-packets',
        'use-the-network/console/profiles',
        'use-the-network/console/flows/flows',
        'use-the-network/console/functions',
        'use-the-network/console/integrations/integrations',
        'use-the-network/console/coverage',
        'use-the-network/console/console-cli',
        'use-the-network/console/console-api',
        'use-the-network/console/my-account',
        'use-the-network/console/troubleshooting',
        'use-the-network/console/hosting-providers',
      ],
      collapsed: false,
    },
  ],
  flows: [
    {
      type: 'link',
      label: '<- Console',
      href: '/use-the-network/console/flows',
    },
    {
      type: 'category',
      label: 'Flows',
      items: [
        'use-the-network/console/flows/orientation',
        'use-the-network/console/flows/actions',
        'use-the-network/console/flows/flows-faq',
      ],
      collapsed: false,
    },
  ],
  integrations: [
    {
      type: 'link',
      label: '<- Console',
      href: '/use-the-network/console/integrations',
    },
    {
      type: 'category',
      label: 'Integrations',
      items: [
        'use-the-network/console/integrations/json-schema',
        'use-the-network/console/integrations/http',
        'use-the-network/console/integrations/mqtt',
        'use-the-network/console/integrations/azure',
        'use-the-network/console/integrations/aws-iot-core',
        'use-the-network/console/integrations/cargo',
        'use-the-network/console/integrations/datacake',
        'use-the-network/console/integrations/mydevices-cayenne',
        'use-the-network/console/integrations/adafruitio',
        'use-the-network/console/integrations/ubidots',
        'use-the-network/console/integrations/tago',
        'use-the-network/console/integrations/google-sheets',
        'use-the-network/console/integrations/microshare',
        'use-the-network/console/integrations/akenza',
      ],
      collapsed: false,
    },
  ],
  migratingdevices: [
    {
      type: 'link',
      label: '<- Console',
      href: '/use-the-network/console/migrating-devices',
    },
    {
      type: 'category',
      label: 'Migrating Devices',
      items: [
        'use-the-network/console/migrating-devices/ttn-import',
        'use-the-network/console/migrating-devices/ttn-manual',
      ],
      collapsed: false,
    },
  ],
  runanetworkserver: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/run-a-network-server',
    },
    {
      type: 'category',
      label: 'Run a Network Server',
      items: [
        'use-the-network/run-a-network-server/buy-an-oui',
        'use-the-network/run-a-network-server/run-console',
        'use-the-network/run-a-network-server/deploy-console',
        'use-the-network/run-a-network-server/debug-with-sniffer',
        'use-the-network/run-a-network-server/router-benchmarking',
      ],
      collapsed: false,
    },
  ],
  readyToUse: [
    {
      type: 'link',
      label: '<- Devices',
      href: '/use-the-network/devices',
    },
    {
      type: 'category',
      label: 'Ready To Use',
      items: ['use-the-network/devices/ready-to-use/ready-to-use'],
      collapsed: false,
    },
  ],
  development: [
    {
      type: 'link',
      label: '<- Devices',
      href: '/use-the-network/devices',
    },
    {
      type: 'category',
      label: 'Development',
      items: ['use-the-network/devices/development/development'],
      collapsed: false,
    },
  ],
  devquickstart: [
    {
      type: 'link',
      label: '<- Devices',
      href: '/use-the-network/devices',
    },
    {
      type: 'category',
      label: 'Development Quickstart',
      items: ['use-the-network/devices/development/quickstart-guides'],
      collapsed: false,
    },
  ],
  adafruit: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/development',
    },
    {
      type: 'category',
      label: 'Arduino',
      items: [
        'use-the-network/devices/development/adafruit/adafruit-feather-m0-rfm95/adafruit-feather-m0-rfm95',
      ],
      collapsed: false,
    },
  ],
  arduino: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/development',
    },
    {
      type: 'category',
      label: 'Arduino',
      items: [
        'use-the-network/devices/development/arduino/mkr-wan-1310',
        'use-the-network/devices/development/arduino/lora-vision-shield/lora-vision-shield',
      ],
      collapsed: false,
    },
  ],
  embit: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/development',
    },
    {
      type: 'category',
      label: 'Embit',
      items: [
        'use-the-network/devices/development/embit/emb-lr1280s',
        'use-the-network/devices/development/embit/emb-lrwl55',
      ],
      collapsed: false,
    },
  ],
  heltec: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/development',
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
        'use-the-network/devices/development/heltec/turtle-board',
      ],
      collapsed: false,
    },
  ],
  mcci: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/development',
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
        'use-the-network/devices/development/mcci/model4841',
      ],
      collapsed: false,
    },
  ],
  midatronics: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/development',
    },
    {
      type: 'category',
      label: 'Midatronics',
      items: [
        'use-the-network/devices/development/midatronics/windy-module',
        'use-the-network/devices/development/midatronics/windy-mkr',
        'use-the-network/devices/development/midatronics/sharky-module',
      ],
      collapsed: false,
    },
  ],
  multitech: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/development',
    },
    {
      type: 'category',
      label: 'Multi-Tech',
      items: ['use-the-network/devices/development/multi-tech/multi-tech-xdot'],
      collapsed: false,
    },
  ],
  opensourceinitiative: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/development',
    },
    {
      type: 'category',
      label: 'OpenSource Initiative',
      items: ['use-the-network/devices/development/opensourceinitiative/paxcounter'],
      collapsed: false,
    },
  ],
  rakwireless_dev: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/development',
    },
    {
      type: 'category',
      label: 'RAK Wireless',
      items: [
        'use-the-network/devices/development/rakwireless/wisblock-4631/wisblock-4631',
        'use-the-network/devices/development/rakwireless/rak7431',
      ],
      collapsed: false,
    },
  ],
  sparkfun: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/development',
    },
    {
      type: 'category',
      label: 'Sparkfun',
      items: ['use-the-network/devices/development/sparkfun/pro-rf/pro-rf'],
      collapsed: false,
    },
  ],
  stmicroelectronics: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/development',
    },
    {
      type: 'category',
      label: 'STMicroelectronics',
      items: [
        'use-the-network/devices/development/stmicroelectronics/st-b-l072z-lrwan1/st-b-l072z-lrwan1',
        'use-the-network/devices/development/stmicroelectronics/nucleo-wl55jc1',
        'use-the-network/devices/development/stmicroelectronics/nucleo-wl55jc2',
      ],
      collapsed: false,
    },
  ],
  abeeway: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use',
    },
    {
      type: 'category',
      label: 'Abeeway',
      items: [
        'use-the-network/devices/ready-to-use/abeeway/abeeway-geolocation-module',
        'use-the-network/devices/ready-to-use/abeeway/abeeway-industrial-tracker',
        'use-the-network/devices/ready-to-use/abeeway/abeeway-compact-tracker',
        'use-the-network/devices/ready-to-use/abeeway/abeeway-micro-tracker',
        'use-the-network/devices/ready-to-use/abeeway/abeeway-smart-badge',
      ],

      collapsed: false,
    },
  ],
  adeunis: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use',
    },
    {
      type: 'category',
      label: 'Adeunis',
      items: ['use-the-network/devices/ready-to-use/adeunis/adeunis-field-test-device'],

      collapsed: false,
    },
  ],
  aquascope: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use',
    },
    {
      type: 'category',
      label: 'Acqua-Scope',
      items: [
        'use-the-network/devices/ready-to-use/aquascope/bvs',
        'use-the-network/devices/ready-to-use/aquascope/wwd',
      ],

      collapsed: false,
    },
  ],
  beiselen: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use',
    },
    {
      type: 'category',
      label: 'Beiselen',
      items: ['use-the-network/devices/ready-to-use/beiselen/radar'],

      collapsed: false,
    },
  ],
  bosch: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use',
    },
    {
      type: 'category',
      label: 'Bosch',
      items: ['use-the-network/devices/ready-to-use/bosch/tps110'],

      collapsed: false,
    },
  ],
  boatofficer: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use',
    },
    {
      type: 'category',
      label: 'BoatOfficer',
      items: ['use-the-network/devices/ready-to-use/boatofficer/boatofficerblue'],

      collapsed: false,
    },
  ],
  comtac: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use',
    },
    {
      type: 'category',
      label: 'Comtac',
      items: [
        'use-the-network/devices/ready-to-use/comtac/lpn-td1',
        'use-the-network/devices/ready-to-use/comtac/lpn-km',
        'use-the-network/devices/ready-to-use/comtac/lpn-tsm',
      ],

      collapsed: false,
    },
  ],
  decentlab: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use',
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
        'use-the-network/devices/ready-to-use/decentlab/dl-zn2',
      ],

      collapsed: false,
    },
  ],
  develiot: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use',
    },
    {
      type: 'category',
      label: 'Develiot',
      items: [
        'use-the-network/devices/ready-to-use/develiot/rwmr',
        'use-the-network/devices/ready-to-use/develiot/uaqms',
      ],

      collapsed: false,
    },
  ],
  digitalmatter: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use',
    },
    {
      type: 'category',
      label: 'Digtal Matter',
      items: [
        'use-the-network/devices/ready-to-use/digital-matter/oyster',
        'use-the-network/devices/ready-to-use/digital-matter/yabby-edge',
        'use-the-network/devices/ready-to-use/digital-matter/digital-matter-lorawan-gps',
      ],

      collapsed: false,
    },
  ],
  dragino: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use',
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
        'use-the-network/devices/ready-to-use/dragino/lds02',
        'use-the-network/devices/ready-to-use/dragino/lgt92',
        'use-the-network/devices/ready-to-use/dragino/lt22222-l',
        'use-the-network/devices/ready-to-use/dragino/lt33222-l',
        'use-the-network/devices/ready-to-use/dragino/lht65',
        'use-the-network/devices/ready-to-use/dragino/lsn50-v2',
      ],

      collapsed: false,
    },
  ],
  enthutech: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use',
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
        'use-the-network/devices/ready-to-use/enthutech/lds01',
      ],

      collapsed: false,
    },
  ],
  imst: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use',
    },
    {
      type: 'category',
      label: 'IMST',
      items: [
        'use-the-network/devices/ready-to-use/imst/range-extender',
        'use-the-network/devices/ready-to-use/imst/ioke868',
      ],

      collapsed: false,
    },
  ],
  iotsens: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use',
    },
    {
      type: 'category',
      label: 'IoTsens',
      items: [
        'use-the-network/devices/ready-to-use/iotsens/sound-device',
        'use-the-network/devices/ready-to-use/iotsens/airquality-device',
        'use-the-network/devices/ready-to-use/iotsens/lidar-device',
      ],

      collapsed: false,
    },
  ],
  izinto: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use',
    },
    {
      type: 'category',
      label: 'izinto',
      items: ['use-the-network/devices/ready-to-use/izinto/izi-io-4840'],

      collapsed: false,
    },
  ],
  laird: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use',
    },
    {
      type: 'category',
      label: 'Laird',
      items: [
        'use-the-network/devices/ready-to-use/laird/rs1xx-temp-rh-sensor',
        'use-the-network/devices/ready-to-use/laird/rs1xx-ext-temp-1w-sensor',
        'use-the-network/devices/ready-to-use/laird/rs1xx-ext-multi-sensor',
        'use-the-network/devices/ready-to-use/laird/rs1xx-ext-temp-rtd-sensor',
      ],

      collapsed: false,
    },
  ],
  mcf88: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use',
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
        'use-the-network/devices/ready-to-use/mcf88/mcf-lwws03',
      ],

      collapsed: false,
    },
  ],
  mclimate: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use',
    },
    {
      type: 'category',
      label: 'MClimate',
      items: [
        'use-the-network/devices/ready-to-use/mclimate/vicki',
        'use-the-network/devices/ready-to-use/mclimate/t-valve',
        'use-the-network/devices/ready-to-use/mclimate/flood-sensor',
        'use-the-network/devices/ready-to-use/mclimate/ht-sensor',
        'use-the-network/devices/ready-to-use/mclimate/aqi-sensor',
      ],

      collapsed: false,
    },
  ],
  milesightiot: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use',
    },
    {
      type: 'category',
      label: 'Milesight',
      items: [
        'use-the-network/devices/ready-to-use/milesight-iot/am107',
        'use-the-network/devices/ready-to-use/milesight-iot/em300-th',
        'use-the-network/devices/ready-to-use/milesight-iot/em500-co2',
        'use-the-network/devices/ready-to-use/milesight-iot/em500-udl',
      ],

      collapsed: false,
    },
  ],
  moko: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use',
    },
    {
      type: 'category',
      label: 'Moko',
      items: [
        'use-the-network/devices/ready-to-use/moko/lw001-bg',
        'use-the-network/devices/ready-to-use/moko/lw003-b',
        'use-the-network/devices/ready-to-use/moko/lw004',
        'use-the-network/devices/ready-to-use/moko/lw005-mp',
      ],

      collapsed: false,
    },
  ],
  netvox: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use',
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
        'use-the-network/devices/ready-to-use/netvox/rb11e',
      ],

      collapsed: false,
    },
  ],
  nwave: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use',
    },
    {
      type: 'category',
      label: 'Nwave',
      items: ['use-the-network/devices/ready-to-use/nwave/nps310sm'],

      collapsed: false,
    },
  ],

  rakwireless: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use',
    },
    {
      type: 'category',
      label: 'RAKwireless',
      items: [
        'use-the-network/devices/ready-to-use/rakwireless/rak2171',
        'use-the-network/devices/ready-to-use/rakwireless/rak7200',
        'use-the-network/devices/ready-to-use/rakwireless/rak7201',
        'use-the-network/devices/ready-to-use/rakwireless/rak7204',
        'use-the-network/devices/ready-to-use/rakwireless/rak7431',
        'use-the-network/devices/ready-to-use/rakwireless/rak10700',
      ],

      collapsed: false,
    },
  ],
  seeedstudiortu: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use',
    },
    {
      type: 'category',
      label: 'Seeed Studio',
      items: [
        'use-the-network/devices/ready-to-use/seeed-studio/sensecap-s2100-data-logger',
        'use-the-network/devices/ready-to-use/seeed-studio/sensecap-s2101-tem-humid',
        'use-the-network/devices/ready-to-use/seeed-studio/sensecap-s2102-light',
        'use-the-network/devices/ready-to-use/seeed-studio/sensecap-s2103-co2-tem-humid',
        'use-the-network/devices/ready-to-use/seeed-studio/sensecap-s2104-soil-mois-tem',
        'use-the-network/devices/ready-to-use/seeed-studio/sensecap-s2105-soil-mois-tem-ec',
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
      href: '/use-the-network/devices/development',
    },
    {
      type: 'category',
      label: 'Seeed Studio',
      items: [
        'use-the-network/devices/development/seeed-studio/loramodule-e5',
        'use-the-network/devices/development/seeed-studio/loramodule-e5-devkit',
        'use-the-network/devices/development/seeed-studio/loramodule-e5-mini',
        'use-the-network/devices/development/seeed-studio/loramodule-e5-grove',
        'use-the-network/devices/development/seeed-studio/seeed-studio-lorawan-dev-kit',
      ],

      collapsed: false,
    },
  ],
  sensedge: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use',
    },
    {
      type: 'category',
      label: 'Sensedge',
      items: [
        'use-the-network/devices/ready-to-use/sensedge/senstick-pro',
        'use-the-network/devices/ready-to-use/sensedge/senstick-pure',
      ],

      collapsed: false,
    },
  ],
  tektelic: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use',
    },
    {
      type: 'category',
      label: 'Tektelic',
      items: [
        'use-the-network/devices/ready-to-use/tektelic/t000489x-smart-room-base',
        'use-the-network/devices/ready-to-use/tektelic/t00048xx-smart-room-pir',
      ],

      collapsed: false,
    },
  ],
  tekzitel: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use',
    },
    {
      type: 'category',
      label: 'Tekzitel',
      items: ['use-the-network/devices/ready-to-use/tekzitel/tekzipark'],

      collapsed: false,
    },
  ],
  thethingsproducts: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use',
    },
    {
      type: 'category',
      label: 'The Things Products',
      items: [
        'use-the-network/devices/ready-to-use/the-things-products/the-things-node',
        'use-the-network/devices/ready-to-use/the-things-products/the-things-uno',
      ],

      collapsed: false,
    },
  ],
  victor: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use',
    },
    {
      type: 'category',
      label: 'Victor',
      items: ['use-the-network/devices/ready-to-use/victor/victor-trap-v4xx'],

      collapsed: false,
    },
  ],
  // become_a_maker: [
  //   {
  //     type: 'link',
  //     label: '<- Full Hotspots',
  //     href: '/hotspot-makers/iot/full-hotspots',
  //   },
  //   {
  //     type: 'category',
  //     label: 'Become a Maker',
  //     items: [
  //       'hotspot-makers/become-a-maker/maker-approval-auditing',
  //       'hotspot-makers/become-a-maker/hotspot-integration-testing',
  //       'hotspot-makers/become-a-maker/basic-miner-operation',
  //       'hotspot-makers/become-a-maker/docker-integration',
  //       'hotspot-makers/become-a-maker/security-requirements',
  //       'hotspot-makers/become-a-maker/hotspot-ble-services',
  //       'hotspot-makers/become-a-maker/hotspot-wifi-configuration',
  //       'hotspot-makers/become-a-maker/burn-hnt-to-maker-wallet',
  //     ],
  //     collapsed: false,
  //   },
  // ],
  lightHotspots: [
    {
      type: 'link',
      label: '<- Light Hotspot',
      href: '/hotspot-makers/iot/light-hotspots',
    },
    {
      type: 'category',
      label: 'Data Only Hotspot Guides',
      items: [
        'hotspot-makers/iot/data-only/dragino',
        'hotspot-makers/iot/data-only/dragino-pg1301',
        'hotspot-makers/iot/data-only/kerlink',
        'hotspot-makers/iot/data-only/rak-concentrators',
        'hotspot-makers/iot/data-only/balena-data-only-hotspot',
      ],
      collapsed: false,
    },
  ],
  bL072zLrwan1: [
    {
      type: 'link',
      label: '<- ST B-L072Z-LRWAN1',
      href: '/use-the-network/devices/development/stmicroelectronics/st-b-l072z-lrwan1',
    },
    {
      type: 'category',
      label: 'Firmware',
      items: [
        'use-the-network/devices/development/stmicroelectronics/st-b-l072z-lrwan1/arduino',
        'use-the-network/devices/development/stmicroelectronics/st-b-l072z-lrwan1/platformio',
      ],
      collapsed: false,
    },
  ],
  sparkfunprorf: [
    {
      type: 'link',
      label: '<- Sparkfun Pro RF',
      href: '/use-the-network/devices/development/sparkfun/pro-rf',
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
      href: '/use-the-network/devices/development/adafruit/adafruit-feather-m0-rfm95',
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
  loravisionshieldv2: [
    {
      type: 'link',
      label: '<- Arduino LoRa Vision Shield',
      href: '/use-the-network/devices/development/arduino/lora-vision-shield',
    },
    {
      type: 'category',
      label: 'Firmware',
      items: ['use-the-network/devices/development/arduino/lora-vision-shield/arduino'],
      collapsed: false,
    },
  ],
  helteccubecelhtccab01: [
    {
      type: 'link',
      label: '<- HTCC-AB01',
      href: '/use-the-network/devices/development/heltec/cubecell-dev-board',
    },
    {
      type: 'category',
      label: 'Firmware',
      items: [
        'use-the-network/devices/development/heltec/cubecell-dev-board/arduino',
        'use-the-network/devices/development/heltec/cubecell-dev-board/platformio',
      ],
      collapsed: false,
    },
  ],
  rakwisblock4631: [
    {
      type: 'link',
      label: '<- RAK-Wireless WisBlock Starter Kit',
      href: '/use-the-network/devices/development/rakwireless/wisblock-4631',
    },
    {
      type: 'category',
      label: 'Firmware',
      items: [
        'use-the-network/devices/development/rakwireless/wisblock-4631/arduino',
        'use-the-network/devices/development/rakwireless/wisblock-4631/platformio',
      ],
      collapsed: false,
    },
  ],
  heltecwifilora32v2: [
    {
      type: 'link',
      label: '<- WiFi LoRa 32 V2',
      href: '/use-the-network/devices/development/heltec/wifi-lora-32-v2',
    },
    {
      type: 'category',
      label: 'Firmware',
      items: ['use-the-network/devices/development/heltec/wifi-lora-32-v2/arduino'],
      collapsed: false,
    },
  ],
  origo: [
    {
      type: 'link',
      label: '<- Back',
      href: '/use-the-network/devices/ready-to-use',
    },
    {
      type: 'category',
      label: 'Origo',
      items: [
        'use-the-network/devices/ready-to-use/origo/lorawan-watch',
        'use-the-network/devices/ready-to-use/origo/smart-badges',
      ],
      collapsed: false,
    },
  ],
}
