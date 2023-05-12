const math = require('remark-math')
const katex = require('rehype-katex')
const webpack = require('webpack')

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

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
        srcDark: 'img/icons/logowhite.svg',
      },
      items: [
        {
          to: 'solana/',
          label: 'Architecture',
          position: 'left',
        },
        {
          to: 'helium-tokens/hnt',
          label: 'Tokens',
          position: 'left',
        },
        {
          to: 'lorawan-on-helium',
          label: 'IoT Network',
          position: 'left',
        },
        {
          to: '5g-on-helium',
          label: 'Mobile Network',
          position: 'left',
        },
        {
          to: '/governance',
          label: 'Governance',
          position: 'left',
        },
        {
          to: '/devblog',
          label: 'Dev Blog',
          position: 'left',
        },
        {
          to: '/solana/migration/',
          label: 'Solana Migration Guides',
          position: 'right',
          className: 'announcementnav',
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
      additionalLanguages: ['protobuf', 'rust', 'toml'],
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
          remarkPlugins: [math],
          rehypePlugins: [katex],
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
  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300..600&display=swap',
    },
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity: 'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
  customFields: {
    MIGRATION_SERVICE_URL: 'https://migration.web.helium.io',
    SOLANA_URL: 'https://solana-rpc.web.helium.io/?session-key=Pluto',
    HNT_TO_RENT_SERVICE_URL: 'https://hnt-to-rent.web.helium.io',
  },
  plugins: [
    function (context, options) {
      return {
        name: 'webpack-plugin',
        // eslint-disable-next-line
        configureWebpack(config, isServer, utils) {
          return {
            plugins: [
              new webpack.ProvidePlugin({
                process: require.resolve('process/browser'),
              }),
            ],
            resolve: {
              fallback: {
                assert: false,
                crypto: false,
                stream: false,
              },
            },
          }
        },
      }
    },
    // uncomment and repair for multiple blogs
    // [
    //   '@docusaurus/plugin-content-blog',
    //   {
    //     id: 'blog',
    //     routeBasePath: 'blog',
    //     path: './blog',
    //   },
    // ],
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'engineering-blog',
        routeBasePath: 'devblog',
        path: './devblog',
        blogTitle: 'Helium Engineering Blog',
        blogDescription: 'Helium Engineering Blog',
        postsPerPage: 'ALL',
        blogSidebarCount: 0,
        authorsMapPath: 'authors.yaml',
      },
    ],
  ],
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
}
