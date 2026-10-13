// Two invariants: the committed tokens.css is what tokens.json renders,
// and every variable frame.css reads is one the frame defines or one of
// the four the site owns.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { build } from "../scripts/build.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (f) => readFileSync(join(root, f), "utf8");

test("tokens.css is tokens.json rendered", () => {
  assert.equal(read("tokens.css"), build(), "run `npm run build` and commit tokens.css");
});

test("frame.css reads only defined variables", () => {
  const defined = new Set([...read("tokens.css").matchAll(/--([a-z0-9-]+):/g)].map((m) => m[1]));
  const site = new Set(["font-rubik", "font-space-mono", "z-header", "bar-h"]);
  const used = new Set([...read("frame.css").matchAll(/var\(--([a-z0-9-]+)/g)].map((m) => m[1]));
  const unknown = [...used].filter((v) => !defined.has(v) && !site.has(v));
  assert.deepEqual(unknown, [], "undefined variables");
});

test("light and dark carry the same colour names", () => {
  const t = JSON.parse(read("tokens.json"));
  assert.deepEqual(Object.keys(t.color.dark), Object.keys(t.color.light));
});
