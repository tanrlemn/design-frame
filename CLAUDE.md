# the design frame

Tokens and a dress for every taNr.co surface. Read `README.md`. The spec
and hub live in the vault (`2. Areas/taNr.co/Digital/the design frame/`);
this repo holds no copies.

- `tokens.json` is the source; `tokens.css` is generated (`npm run build`)
  and committed; `npm test` fails on drift.
- Values change only on Tanner's ruling, recorded in the vault, then here.
- Consumers pin a commit or tag. Bumping a consumer is that repo's commit.
- No build step on install, no dependencies, no runtime fonts.
