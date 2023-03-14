const math = require('remark-math')
const katex = require('rehype-katex')

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
        // {
        //   to: '/use-the-network/console',
        //   label: 'Try the New Console Today',
        //   position: 'right',
        //   activeBaseRegex: `docs`,
        //   className: 'announcementnav',
        // },
        {
          to: '/',
          label: 'Docs',
          position: 'right',
          activeBaseRegex: `docs`,
        },
        // {
        //   to: 'api',
        //   label: 'API',
        //   position: 'right',
        //   activeBaseRegex: `api`,
        // },
        {
          to: '/devblog',
          label: 'Dev Blog',
          position: 'right',
        },
        {
          label: 'More',
          position: 'right',
          items: [
            {
              href: 'https://github.com/helium',
              label: 'Github',
            },
            {
              href: 'http://whitepaper.helium.com',
              label: 'Whitepaper',
            },
            {
              href: 'https://explorer.helium.com',
              label: 'Explorer',
            },
            {
              href: 'https://mappers.helium.com',
              label: 'Coverage Mapping',
            },
            {
              href: 'https://github.com/helium/HIP',
              label: 'Helium Improvement Proposals',
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
  plugins: [
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
