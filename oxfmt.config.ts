import { defineConfig } from "oxfmt";

export default defineConfig({
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  quoteProps: "as-needed",
  trailingComma: "all",
  arrowParens: "always",
  bracketSpacing: true,
  endOfLine: "lf",
  htmlWhitespaceSensitivity: "css",
  embeddedLanguageFormatting: "auto",
  // Not supported by Oxfmt: experimentalTernaries, insertPragma, requirePragma.

  sortImports: {
    groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
    internalPattern: ["@/", "@flux/"],
    newlinesBetween: true,
    ignoreCase: true,
  },
  ignorePatterns: ["dist/**", "coverage/**", "**/routeTree.gen.ts", "pnpm-lock.yaml"],
  overrides: [],
  sortTailwindcss: {
    // stylesheet: "./path/to/stylesheet.css",
    functions: ["clsx", "cn"],
    preserveWhitespace: true,
  },
  astro: true,
});