import { themes } from 'prism-react-renderer'
import katex from 'rehype-katex'
import math from 'remark-math'
import webpack from 'webpack'
const darkCodeTheme = themes.dracula
const lightCodeTheme = themes.github

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
        src: 'img/icons/logo_docs_black.svg',
        srcDark: 'img/icons/logo_docs_white.svg',
      },
      items: [
        {
          to: 'tokens/hnt-token',
          label: 'Tokens',
          position: 'left',
        },
        {
          to: 'wallets',
          label: 'Wallets',
          position: 'left',
        },
        {
          to: 'iot',
          label: 'IoT Network',
          position: 'left',
        },
        {
          to: 'mobile/5g-on-helium',
          label: 'Mobile Network',
          position: 'left',
        },
        // "more" dropdown for navbar
        {
          label: 'More',
          position: 'left',
          items: [
            { label: 'Network Architecture', to: 'solana' },
            { label: 'Community Governance', to: 'governance' },
            { label: 'Dev Blog', to: 'devblog' },
            {
              href: 'https://github.com/helium',
              label: 'Helium GitHub',
            },
          ],
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
      additionalLanguages: ['protobuf', 'rust', 'toml', 'bash'],
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
        gtag: {
          trackingID: 'G-85D2WJWZNL',
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
    TOKENS_TO_RENT_SERVICE_URL: 'https://tokens-to-rent.web.helium.io',
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
  themes: ['@docusaurus/theme-mermaid', 'docslab-docusaurus'],
}
