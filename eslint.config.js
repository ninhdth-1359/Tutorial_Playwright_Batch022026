import js from "@eslint/js";
import playwright from "eslint-plugin-playwright";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ["tests/**/*.ts"],
    plugins: {
      playwright,
    },
    rules: {
      ...playwright.configs.recommended.rules,

      quotes: ["error", "single"],
      "playwright/no-wait-for-timeout": "error",
      "playwright/no-force-option": "warn",
      "playwright/expect-expect": "error",
      "eol-last": ["error", "always"],
      "no-multiple-empty-lines": ["error", { max: 1 }],
    },
  },
  {
    ignores: ["node_modules/", "playwright-report/", "test-results/", "dist/"],
  },
];
