# Helium Documentation

Documentation for the Helium network.

## Requirements

- [Node.js](https://nodejs.org/en/download) version >= 10.15.1

- [Yarn](https://yarnpkg.com/getting-started/install) version >= 1.5

## Helium Documentation Installation Guide

- [Installation Guide](https://docs.helium.com/faq/docs-installation/)

## Contributing

Documentation is managed by Helium, but supported by the community.

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for more instructions.

## Creating a New Doc

When authoring a new doc, be sure to apply `prettier` to it during review. For example:
`npx prettier --write --prose-wrap always docs/blockchain/new_doc.mdx`

It will apply appropriate line wraps and other formatting niceties.

## Editing an Existing Doc

When editing an existing doc, line wrap should not be applied (don't run `prettier`), and lines that
run wider than 80 chars in width are okay. Applying `prettier` would cause many unimportant line
changes and make review more difficult.

Instead, from time to time, `prettier` will be run against the documents and those unimportant
commits will be added to `.git-blame-ignore-revs`

Use the style guide found [here](docs/style-guide.md) to learn what markdown syntax is available.

For more advanced content consider using
[JSX](https://v2.docusaurus.io/docs/markdown-features/#embedding-react-components-with-mdx).

## Linking to Other Docs

When linking to other docs always use full path links or abbreviated links to full path links at the
bottom of the doc. Abbreviated links help improve readability of the raw markdown and makes common
links reusable in the same doc.

Abbreviated Links Example: If you would like to link to the development devices introduction page
found at `/network-iot/devices/development`, use `[development devices][devices.development]` inline
with your text content. Next, create the link to the full path at the very bottom of the doc
markdown like this `[devices.development]: /network-iot/devices/development`.

## Adding Images

When adding images, use the method shown below.

```
---
id: my-doc
title: My Doc
---

# Doc Title

// Add to the top of the file below the front matter and title.
import useBaseUrl from '@docusaurus/useBaseUrl';

...

<img alt="Image Description" src={useBaseUrl('img/image.svg')} />
```

### Image Naming

When naming images with multiple words, use `-` to separate the words only.

## Adding a New Doc

Create a new \*.mdx extension file following the existing naming conventions.

### Doc Front Matter

When creating a new doc, use the following front matter at the very top of the doc with the
following fields:

`id: ` This should match the filename without the extension. `title: ` The title of your document.
If this field is not present, the document's title will default to its id. `description: ` The
description of your document. `sidebar_label: ` This should match id name but with spaces and
capitalized first letters.

```
---
id: devices
title: Devices
description: Learn about Helium Devices
sidebar_label: Devices
---
```

`slug: ` If the doc id path has repeated sections like the following doc path
`network-iot/devices/devices`, define a `slug:` field in the front matter to make it pretty as shown
below. This way when this doc is navigated to, the URL shown will not have repeating sections names
in it.

```
slug: network-iot/devices
```

## Check for dead links

`yarn build` does a good job of checking for dead links.

<!-- TODO: add to CI -->

## Sidebar Links

Learn how to create sidebar links
[here](https://v2.docusaurus.io/docs/docs-introduction/#sidebar-object).

### Category Type

When adding items use the raw id path, slug paths will not work.

## Attribution

This website is built using [Docusaurus 2](https://v2.docusaurus.io/), a modern static website
generator.
