import typescriptEslint from "typescript-eslint"
import { FlatCompat } from "@eslint/eslintrc"
import perfectionist from "eslint-plugin-perfectionist"

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

/** @type {import('eslint').Linter.Config[]} */
const nextConfig = [
  ...compat.extends("next/core-web-vitals"),
  ...compat.extends("next/typescript"),
]

const ignoreConfig = {
  ignores: ["eslint.config.mjs", ".lintstagedrc.js"],
}

const customConfig = {
  rules: {
    "import/no-duplicates": ["error"],
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/consistent-type-exports": "error",
    "@typescript-eslint/method-signature-style": "error",
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: "directive", next: "*" },
      { blankLine: "any", prev: "directive", next: "directive" },
      { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
      {
        blankLine: "any",
        prev: ["const", "let", "var"],
        next: ["const", "let", "var"],
      },
      {
        blankLine: "always",
        prev: ["import"],
        next: "*",
      },
      {
        blankLine: "any",
        prev: ["import"],
        next: ["import"],
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        args: "all",
        argsIgnorePattern: "^_",
        caughtErrors: "all",
        caughtErrorsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
    "prefer-template": "error",
  },
}

export default typescriptEslint.config(
  ignoreConfig,
  typescriptEslint.configs.recommendedTypeChecked,
  typescriptEslint.configs.stylisticTypeChecked,
  perfectionist.configs["recommended-natural"],
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  ...nextConfig,
  customConfig,
)
