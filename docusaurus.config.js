module.exports = {
  title: 'Helium Documentation',
  tagline: 'Documentation for the Helium Network',
  url: 'https://docs.helium.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon/favicon.ico',
  organizationName: 'helium', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.
  themeConfig: {
    googleAnalytics: {
      trackingID: 'UA-52432858-10',
    },
    algolia: {
      apiKey: 'd5ff5c42607f0141934032162dab2cc2',
      indexName: 'helium',
      contextualSearch: false,
    },
    colorMode: {
      // "light" | "dark"
      defaultMode: 'light',

      // Hides the switch in the navbar
      // Useful if you want to support a single color mode
      disableSwitch: true,

      // Should we use the prefers-color-scheme media-query,
      // using user system preferences, instead of the hardcoded defaultMode
      respectPrefersColorScheme: false,
    },
    announcementBar: {
      id: 'join_discord', // Any value that will identify this message.
      content:
        '<a target="https://discord.gg/helium" rel="noopener noreferrer" href="#">Join</a> 11,000 others in the Helium Discord Server!',
      backgroundColor: '#A334FB', // Defaults to `#fff`.
      textColor: '#FFFFFF', // Defaults to `#000`.
      isCloseable: true, // Defaults to `true`.
    },
    navbar: {
      title: '',
      style: 'primary',
      logo: {
        alt: 'Helium Logo',
        src: 'img/icons/logoblack.svg',
        srcDark: 'img/logowhite.svg',
      },
      items: [

        {
          to: '/',
          label: 'Docs',
          position: 'right',
          activeBaseRegex: `docs`,
        },
        {
          to: 'api',
          label: 'API',
          position: 'right',
          activeBaseRegex: `api`,
        },
        {
          href: 'https://github.com/helium',
          position: 'right',
          label: 'Github',
        },
        {
          href: 'http://whitepaper.helium.com',
          label: 'Whitepaper (2018)',
          position: 'right',
        },

        {
          href: 'https://explorer.helium.com',
          label: 'Explorer',
          position: 'right',
        },
        {
          href: 'https://network.helium.com/coverage',
          label: 'Coverage Map',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Helium Systems Inc.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebarsDocs.js'),
          routeBasePath: '/',
          // Please change this to your repo.
          editUrl:
            'https://github.com/helium/docs/edit/master',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
  ],
};
