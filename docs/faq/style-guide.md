---
id: style-guide
title: Docs Style Guide
pagination_label: Docs Style Guide
sidebar_label: Docs Style Guide
description: Helium Documentation <!-- do not change -->
image: https://docs.helium.com/img/link-image.png <!-- do not change -->
slug: /style-guide
---

You can write content using [GitHub-flavored Markdown syntax](https://github.github.com/gfm/).

## Markdown Syntax

To serve as an example page when styling markdown based Docusaurus sites.

## Headers

# H1 - Create the best documentation

## H2 - Create the best documentation

### H3 - Create the best documentation

---

## Emphasis

Emphasis, aka italics, with _underscores_.

Strong emphasis, aka bold, with **asterisks** or **underscores**.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~

---

## Lists

1. First ordered list item
1. Another item
   - Unordered sub-list.
1. Actual numbers don't matter, just that it's a number
   1. Ordered sub-list
1. And another item.

- Unordered list can use asterisks

* Or minuses

- Or pluses

---

## Links

[I'm an inline-style link](https://www.google.com/)

[I'm an inline-style link with title](https://www.google.com/ "Google's Homepage")

[I'm a reference-style link][arbitrary case-insensitive reference text]

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself].

URLs and URLs in angle brackets will automatically get turned into links. http://www.example.com/ or
<http://www.example.com/> and sometimes example.com (but not on GitHub, for example).

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://www.mozilla.org/
[1]: http://slashdot.org/
[link text itself]: http://www.reddit.com/

---

## Images

Here's our logo (hover to see the title text):

Inline-style:
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png 'Logo Title Text 1')

Reference-style: ![alt text][logo]

[logo]:
  https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png
  'Logo Title Text 2'

Images from any folder can be used by providing path to file. Path should be relative to markdown
file.

![img](../static/img/icons/logo.svg)

---

## Code

```javascript
var s = 'JavaScript syntax highlighting'
alert(s)
```

```python
s = "Python syntax highlighting"
print(s)
```

```
No language indicated, so no syntax highlighting.
But let's throw in a <b>tag</b>.
```

```js {2}
function highlightMe() {
  console.log('This line can be highlighted!')
}
```

---

## Tables

Colons can be used to align columns.

| Tables        |      Are      |   Cool |
| ------------- | :-----------: | -----: |
| col 3 is      | right-aligned | \$1600 |
| col 2 is      |   centered    |   \$12 |
| zebra stripes |   are neat    |    \$1 |

There must be at least 3 dashes separating each header cell. The outer pipes (|) are optional, and
you don't need to make the raw Markdown line up prettily. You can also use inline Markdown.

| Markdown | Less      | Pretty     |
| -------- | --------- | ---------- |
| _Still_  | `renders` | **nicely** |
| 1        | 2         | 3          |

---

## Blockquotes

> Blockquotes are very handy in email to emulate reply text. This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep
> writing to make sure this is long enough to actually wrap for everyone. Oh, you can _put_ >
> **Markdown** into a blockquote.

---

## Inline HTML

<dl>
  <dt>Definition list</dt>
  <dd>Is something people use sometimes.</dd>

  <dt>Markdown in HTML</dt>
  <dd>Does *not* work **very** well. Use HTML <em>tags</em>.</dd>
</dl>

---

## Line Breaks

Here's a line for us to start with.

This line is separated from the one above by two newlines, so it will be a _separate paragraph_.

This line is also a separate paragraph, but... This line is only separated by a single newline, so
it's a separate line in the _same paragraph_.

---

## Admonitions

:::note

This is a note

:::

:::tip

This is a tip

:::

:::important

This is important

:::

:::caution

This is a caution

:::

:::warning

This is a warning

:::

## Linking to Other Docs

When linking to other docs always use full path links or abbreviated links to full path links at the
bottom of the doc. Abbreviated links help improve the readability of the raw markdown and makes
common links reusable in the same doc.

**Abbreviated Links Example:**

**Good Example**

```markdown
Read more information on developing IOT devices on the [device development](device.development)
page.

...

[device.development]: /use-the-network/devices/development/development
```

**Not So Good Example**

```markdown
Read more information on developing IOT devices on the
[device development](/use-the-network/devices/development/development) page.
```

---

## Adding Images

When adding images, use the method shown below.

```
---
id: page-topic
title: Page Topic
slug: /page-topic
---

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
`use-the-network/devices/devices`, define a `slug:` field in the front matter to make it pretty as
shown below. This way when this doc is navigated to, the URL shown will not have repeating sections
names in it.

```
slug: use-the-network/devices
```
