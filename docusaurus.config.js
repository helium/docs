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

 algolia: {
      apiKey: 'YOUR_API_KEY',
      indexName: 'YOUR_INDEX_NAME',

      // Optional: see doc section bellow
      contextualSearch: true,

      // Optional: Algolia search parameters
      searchParameters: {},

      //... other Algolia params
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
          href: 'https://github.com/helium',
          label: 'Whitepaper (2017)',
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
            'https://github.com/helium/docs/edit/staging',
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
