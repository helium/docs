# Helium Documentation

Documentation for the Helium network.

## Installation

Check the [Installation Guide](https://docs.helium.com/faq/docs-installation/) for the latest
information on getting started contributing to the Helium Documentation site.

---

## Contributing

Documentation is managed by the [Helium Foundation](https://www.helium.foundation), and is supported
by the Helium Community.

Contributions from the community are extremely valuable and will be reviewed in a timely fashion.
Submitting code and bug reports is a great way to get involved:

- **Contributing Code**: For new documentation, fork this repo, create a logically-named branch, and
  [submit a PR against this repo](https://github.com/helium/docs). Include a write-up of the PR with
  details on what it does.

- **Reporting Bugs**: Open an issue [against this repo](https://github.com/helium/docs/issues) with
  as much detail as possible. At the very least include steps to reproduce the problem.

### Creating a New Doc

All new documentation pages must be saved under the `docs/` directory. For a quick start, copy the
[New Page Template](docs-template.mdx) and make edits before submitting a Pull Request.

A Pull Request should include a comment with as much detail as possible on where the new document
should be located on the docs site so that the maintainers can get everything connected correctly.

**Tip:** Learn how to create sidebar links
[here](https://v2.docusaurus.io/docs/docs-introduction/#sidebar-object).

### Editing an Existing Doc

Use the style guide found [here](docs/style-guide.md) to learn what markdown syntax is available.

For more advanced content consider using
[JSX](https://v2.docusaurus.io/docs/markdown-features/#embedding-react-components-with-mdx).

---

## Build Checks

Before submitting a Pull Request, run the `yarn build` command to check for broken links and other
potential build errors.
