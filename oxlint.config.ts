import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["typescript", "react", "import", "jsx-a11y", "oxc"],
  categories: { correctness: "error" },
  env: { browser: true, es2024: true },
  ignorePatterns: ["dist/**", "node_modules/**", "**/routeTree.gen.ts"],
  rules: {
    "no-unused-vars": "off",
    "typescript/no-unused-vars": "error",
    "object-shorthand": "error",
    "react/react-in-jsx-scope": "off", // jsx-runtime
    "react/rules-of-hooks": "error",
    "react/exhaustive-deps": "warn",
    "import/no-duplicates": "error",
  },
  options: { typeAware: true, typeCheck: true },
});