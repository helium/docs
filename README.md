# Helium Documentation

Documentation for the Helium network.

### Requirements

* [Node.js](https://nodejs.org/en/download) version >= 10.15.1

* [Yarn](https://classic.yarnpkg.com/en/docs/install) version >= 1.5

### Installation
```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

### Contributing

Documentation is managed by Helium, but supported by the community. 

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for more instructions.

### Editing an Existing Doc

Use the style guide found [here](docs/style-guide) to learn what markdown syntax is available.

For more advanced content consider using [JSX](https://v2.docusaurus.io/docs/markdown-features/#embedding-react-components-with-mdx).

### Adding Images

When adding images, use the method shown below.
```
---
id: my-doc
title: My Doc
---

// Add to the top of the file below the front matter.
import useBaseUrl from '@docusaurus/useBaseUrl';

...

<img alt="Image Description" src={useBaseUrl('img/image.svg')} />
```

### Adding a New Doc

Create a new *.mdx extension file following the existing naming conventions.

### Attribution

This website is built using [Docusaurus 2](https://v2.docusaurus.io/), a modern static website generator.