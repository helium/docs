# Helium Docs

Docusaurus documentation site for the Helium Network.

## Local Development

```sh
npm install
npm run start          # starts on port 3000
npm run build          # production build
```

## Project Structure

- `docs/` — all documentation pages (`.mdx` files)
- `static/img/` — images, organized by section (e.g., `network-iot/`, `network-mobile/`)
- `src/theme/` — custom React components
- `sidebarsDocs.js` — sidebar navigation structure

## Formatting & Linting

All `.mdx` files are formatted with **Prettier** on save. Before committing, run:

```sh
npx prettier --check 'docs/**/*.mdx'
```

To auto-fix:

```sh
npx prettier --write 'docs/**/*.mdx'
```

Prettier config (`.prettierrc`):
- Print width: 100
- Prose wrap: always
- No semicolons, single quotes, 2-space indent

## Spell Check

Use the project spell dictionary at `.vscode/spellright.dict` for domain-specific terms.
Review all content for typos and spelling errors before committing.

## Page Structure

Every `.mdx` file must have frontmatter:

```yaml
---
id: page-id
title: Full Page Title
pagination_label: Full Page Title
sidebar_label: Short Label
description: >-
  Brief description for search and social sharing.
image: https://docs.helium.com/img/link-image.png
slug: /category/page-name
---
```

- `id` must be kebab-case and match the filename.
- Do **not** add an H1 in the body — the `title` field renders as the page heading.
- `sidebar_label` can be shorter than `title` for compact navigation.

## Imports & Components

Most pages import `useBaseUrl` for image paths:

```js
import useBaseUrl from '@docusaurus/useBaseUrl'
```

Other common imports: `Tabs`/`TabItem` from `@theme`, `BrowserOnly` from `@docusaurus`,
`YouTube`/`Tweet` from `mdx-embed`.

## Images

Images live in `static/img/` in subdirectories matching the content section.

Header images at the top of a page:

```jsx
<img className="docsheader" src={useBaseUrl('img/section/header.png')} />
```

Screenshots with captions:

```jsx
<figure className="screensnippet-wrapper">
  <img
    className="add-shadow add-shadow-margin add-border-radius"
    style={{ width: '100%', maxHeight: 'initial' }}
    src={useBaseUrl('img/section/screenshot.jpg')}
  />
  <figcaption>Caption text.</figcaption>
</figure>
```

## Links

- Cross-doc links use slug paths: `[Link text](/iot/lorawan-on-helium)`
- External links use full URLs.

## Writing Conventions

- **"Hotspot" is always capitalized** when used in copy.
- **Product term casing**: LoRaWAN, ChirpStack, Data Credits (DC), HNT, IoT, Solana.
- Use admonitions (`:::note`, `:::warning`, etc.) sparingly — overuse breaks reading flow.
- Keep lines within 100 characters (Prettier will wrap prose automatically).
- Use GitHub-flavored Markdown syntax. See `docs/home/style-guide.mdx` for examples.
- File and directory names use kebab-case.
