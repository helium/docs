module.exports = {
  title: 'Helium Documentation',
  tagline: 'Documentation for the Helium Network',
  url: 'https://helium-docs.herokuapp.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon/favicon.ico',
  organizationName: 'helium', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.
  themeConfig: {
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
        src: 'img/icons/logo.svg',
      },
      items: [
        {
          href: 'https://github.com/helium',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
        {
          to: 'docs',
          label: 'Docs',
          position: 'left',
          activeBaseRegex: `docs`,
        },
        {
          to: 'api',
          label: 'API',
          position: 'left',
          activeBaseRegex: `api`,
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
          routeBasePath: 'docs',
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
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'api',
        path: 'api',
        editUrl: 'https://github.com/helium/docs/edit/staging',
        routeBasePath: 'api',
        sidebarPath: require.resolve('./sidebarsAPI.js'),
      },
    ],
  ],
};
