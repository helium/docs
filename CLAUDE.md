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
- `static/` — static assets (images, icons)
- `src/` — custom React components and pages

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

## Writing Conventions

- **"Hotspot" is always capitalized** when used in copy (e.g., "Deploy a Hotspot", not "deploy a hotspot").
- Use admonitions (`:::note`, `:::warning`, etc.) sparingly — overuse breaks reading flow.
- Keep lines within 100 characters (Prettier will wrap prose automatically).
- Use GitHub-flavored Markdown syntax. See `docs/home/style-guide.mdx` for examples.
