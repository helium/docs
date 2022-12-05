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
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    // hideableSidebar: true,
    algolia: {
      appId: 'XC618T80WL',
      apiKey: '7d9c9bfed6c45d91cb148ac5a365079d',
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
          to: '/use-the-network/console',
          label: 'Try the New Console Today',
          position: 'right',
          activeBaseRegex: `docs`,
          className: 'announcementnav',
        },
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
      copyright: `Copyright © ${new Date().getFullYear()} Helium Foundation`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          breadcrumbs: false,
          sidebarPath: require.resolve('./sidebarsDocs.js'),
          routeBasePath: '/',
          // Please change this to your repo.
          editUrl: 'https://github.com/helium/docs/edit/master',
        },
        googleAnalytics: {
          trackingID: 'UA-52432858-10',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [],
}
