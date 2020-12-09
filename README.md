# Helium Documentation

Documentation for the Helium network.

## Requirements

- [Node.js](https://nodejs.org/en/download) version >= 10.15.1

- [Yarn](https://classic.yarnpkg.com/en/docs/install) version >= 1.5

## Installation

```
$ yarn
```

## Local Development

```
$ yarn start
```

This command starts a local development server and open up a browser window.
Most changes are reflected live without having to restart the server.

## Contributing

Documentation is managed by Helium, but supported by the community.

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for more instructions.

## Editing an Existing Doc

Use the style guide found [here](docs/style-guide) to learn what markdown syntax
is available.

For more advanced content consider using
[JSX](https://v2.docusaurus.io/docs/markdown-features/#embedding-react-components-with-mdx).

## Linking to Other Docs

When linking to other docs always use full path links or abbreviated links to
full path links at the bottom of the doc. Abbreviated links help improve
readability of the raw markdown and makes common links reusable in the same doc.

Abbreviated Links Example:  
If you would like to link to the development devices introduction page found at
`/docs/use-the-network/devices/development`, use
`[development devices][devices.development]` inline with your text content.
Next, create the link to the full path at the very bottom of the doc markdown
like this `[devices.development]: /docs/use-the-network/devices/development`.

## Adding Images

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

### Image Naming

When naming images with multiple words, use `-` to separate the words only.

## Adding a New Doc

Create a new \*.mdx extension file following the existing naming conventions.

### Doc Front Matter

When creating a new doc, use the following front matter at the very top of the
doc with the following fields:

`id: ` This should match the filename without the extension.  
`hide_title: ` Always set this true.  
`sidebar_label: ` This should match id name but with spaces and capitalized
first letters.

```
---
id: devices
hide_title: true
sidebar_label: Devices
---
```

`slug: ` If the doc id path has repeated sections like the following doc path
`use-the-network/devices/devices`, define a `slug:` field in the front matter to
make it pretty as shown below. This way when this doc is navigated to, the URL
shown will not have repeating sections names in it.

```
slug: use-the-network/devices
```

## Sidebar Links

Learn how to create sidebar links
[here](https://v2.docusaurus.io/docs/docs-introduction/#sidebar-object).

### Category Type

When adding items use the raw id path, slug paths will not work.

## Attribution

This website is built using [Docusaurus 2](https://v2.docusaurus.io/), a modern
static website generator.
