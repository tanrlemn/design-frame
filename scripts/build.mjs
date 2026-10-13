// tokens.json is the source; this writes tokens.css from it so the two
// cannot drift (tests/build.test.mjs fails when the committed css is
// stale). Light rides :root; dark rides :root[data-scheme="dark"], chosen
// by the site, never by the OS — tanr.co is light, out loud is dark.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

export function render(tokens) {
  const lines = [];
  const decl = (name, value) => lines.push(`  --${name}: ${value};`);
  lines.push("/* generated from tokens.json by scripts/build.mjs — edit the json, run `npm run build` */");
  lines.push(":root {");
  lines.push("  color-scheme: light;");
  for (const [k, v] of Object.entries(tokens.color.light)) decl(k, v);
  for (const group of ["measure", "type", "motion"]) {
    for (const [k, v] of Object.entries(tokens[group])) decl(k, v);
  }
  lines.push("}");
  lines.push(':root[data-scheme="dark"] {');
  lines.push("  color-scheme: dark;");
  for (const [k, v] of Object.entries(tokens.color.dark)) decl(k, v);
  lines.push("}");
  return lines.join("\n") + "\n";
}

export function build() {
  const tokens = JSON.parse(readFileSync(join(root, "tokens.json"), "utf8"));
  return render(tokens);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  writeFileSync(join(root, "tokens.css"), build());
  console.log("tokens.css written");
}
