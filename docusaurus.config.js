// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Helium Documentation',
  tagline: 'Documentation for the Helium Network',
  url: 'https://docs.helium.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'helium', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          breadcrumbs: false,
          sidebarPath: require.resolve('./sidebarsDocs.js'),
          routeBasePath: '/',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/helium/docs/edit/master',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        googleAnalytics: {
          trackingID: 'UA-52432858-10',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        appId: 'XC618T80WL',
        apiKey: '7d9c9bfed6c45d91cb148ac5a365079d',
        indexName: 'helium',
        contextualSearch: false,
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
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],
}

module.exports = config
