# Helium Documentation

Documentation for the Helium network.

## Requirements

- [Node.js](https://nodejs.org/en/download) version >= 10.15.1

- [Yarn](https://yarnpkg.com/getting-started/install) version >= 1.5

## Installation

Note: Windows Node.js installation you do not need to install the Compiler and Chocolaty dependencies.

After you install Node.js, which will install Node.js and npm as a dependency you can do the following. 

```
$ npm install -g yarn

> yarn@1.22.11 preinstall /path/to/npm/node_modules/yarn
> :; (node ./preinstall.js > /dev/null 2>&1 || true)

$ cd ~/path/to/project
$ yarn set version berry

Resolving berry to a url...
Downloading https://github.com/yarnpkg/berry/raw/master/packages/berry-cli/bin/berry.js...
Saving it into /path/to/fork/docs/.yarn/releases\yarn-berry.cjs...
Updating /path/to/prjoect/docs/.yarnrc.yml...
Done!

$ yarn install

 YN0070: Migrating from Yarn 1; automatically enabling the compatibility node-modules linker 
 ...
 YN0007: │ yarn@npm:1.22.10 must be built because it never has been before or the last one failed
 YN0007: │ core-js@npm:3.12.1 must be built because it never has been before or the last one failed
 YN0007: │ core-js-pure@npm:3.12.1 must be built because it never has been before or the last one failed
 YN0000: └ Completed in 42s 725ms
 YN0000: Done with warnings in 1m 31s

```

Check the final version and confirm that it is >= 1.5

```
yarn --version
```

## Local Development

```
$ yarn start

Starting the development server...
Docusaurus website is running at: http://localhost:3000/

√ Client
  Compiled successfully in 5.90s

i ｢wds｣: Project is running at http://localhost:3000/
i ｢wds｣: webpack output is served from /
i ｢wds｣: Content not from webpack is served from /path/to/project/docs
i ｢wds｣: 404s will fallback to /index.html

* Client ... done (99%) plugins
 WebpackDevMiddleware
 
```

This command starts a local development server and open up a browser window.
Most changes are reflected live without having to restart the server.

###NOTICE:

**You can not use `git add .` anymore at the root to add all your files to the commit queue. There are yarn files in the root of the project that can not be committed**

## Contributing

Documentation is managed by Helium, but supported by the community.

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for more instructions.

## Creating a New Doc

When authoring a new doc, be sure to apply `prettier` to it during review. For
example: `npx prettier --write --prose-wrap always docs/blockchain/new_doc.mdx`

It will apply appropriate line wraps and other formatting niceties.

## Editing an Existing Doc

When editing an existing doc, line wrap should not be applied (don't run
`prettier`), and lines that run wider than 80 chars in width are okay. Applying
`prettier` would cause many unimportant line changes and make review more
difficult.

Instead, from time to time, `prettier` will be run against the documents and
those unimportant commits will be added to `.git-blame-ignore-revs`

Use the style guide found [here](docs/style-guide.md) to learn what markdown syntax
is available.

For more advanced content consider using
[JSX](https://v2.docusaurus.io/docs/markdown-features/#embedding-react-components-with-mdx).

## Linking to Other Docs

When linking to other docs always use full path links or abbreviated links to
full path links at the bottom of the doc. Abbreviated links help improve
readability of the raw markdown and makes common links reusable in the same doc.

Abbreviated Links Example:  
If you would like to link to the development devices introduction page found at
`/use-the-network/devices/development`, use
`[development devices][devices.development]` inline with your text content.
Next, create the link to the full path at the very bottom of the doc markdown
like this `[devices.development]: /use-the-network/devices/development`.

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

When creating a new doc, use the following front matter at the very top of the
doc with the following fields:

`id: ` This should match the filename without the extension.  
`title: ` The title of your document. If this field is not present, the document's title will default to its id.  
`description: ` The description of your document.  
`sidebar_label: ` This should match id name but with spaces and capitalized
first letters.

```
---
id: devices
title: Devices
description: Learn about Helium Devices
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
## Check for dead links

`yarn build` does a good job of checking for dead links.

TODO: add to CI

## Sidebar Links

Learn how to create sidebar links
[here](https://v2.docusaurus.io/docs/docs-introduction/#sidebar-object).

### Category Type

When adding items use the raw id path, slug paths will not work.

## Attribution

This website is built using [Docusaurus 2](https://v2.docusaurus.io/), a modern
static website generator.
