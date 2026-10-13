# the design frame

The one header, footer, type and button style every taNr.co surface wears
— tanr.co, the dashboard, out loud — as tokens and a dress. Ruled a shared
package 2026-10-12 (Tanner: "Let's call it design frame. It can take a
dark scheme"). The values are the tanr.co store's own, carried from
`house/app/globals.css` "the frame". Hub in the vault:
`2. Areas/taNr.co/Digital/the design frame/_the design frame.md`.

## What it ships

- `tokens.json` — the source. Colour (a light and a dark scheme with the
  same names), measure, type, motion. Data, so anything that is not CSS
  (Swift screens, the card scripts, an email) reads the same numbers.
- `tokens.css` — generated from the json by `npm run build`, never edited.
  Light on `:root`; dark on `:root[data-scheme="dark"]`. A site picks its
  scheme by setting the attribute on `<html>`; the OS never does.
- `frame.css` — the dress, under `.frame`: the voice, headings, labels,
  the store's `.btn` and its ghost, the quiet button, nav links, fields,
  the sticky header, the warm footer, a narrow column, 44px tap targets.
  It imports `tokens.css` first.

Four variables are the site's to set, never the frame's: `--font-rubik`
and `--font-space-mono` (next/font on `<body>`, self-hosted — no external
fonts at runtime), `--z-header` (the site's stacking contract, 2 by
default) and `--bar-h` (a fixed bar the footer clears, 0 by default).

## Wearing it

```
"@tanr/design-frame": "github:tanrlemn/design-frame#<commit or tag>"
```

```ts
// app/layout.tsx
import "@tanr/design-frame/frame.css";
import { Rubik, Space_Mono } from "next/font/google";
const rubik = Rubik({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-rubik", display: "swap" });
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-space-mono", display: "swap" });
// <html data-scheme="dark"> for a dark site; <body className={`frame ${rubik.variable} ${spaceMono.variable}`}>
```

A site pins a commit (or a tag), so a change to the frame reaches a site
only when that site bumps the pin: one deploy never restyles three sites.

## Changing it

Edit `tokens.json` or `frame.css`, run `npm run build` and `npm test`,
commit. `tokens.css` out of step with the json fails the test, as does a
variable the dress reads that nothing defines.

What stays out: a site's interior language (the book's ground and type,
the dashboard's lane colours, out loud's accent and danger), a site's
stacking numbers, and anything a Player or a cart needs.
