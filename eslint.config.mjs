import typescriptEslint from "typescript-eslint"
import { FlatCompat } from "@eslint/eslintrc"

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

/** @type {import('eslint').Linter.Config[]} */
const nextConfig = [
  ...compat.extends("next/core-web-vitals"),
  ...compat.extends("next/typescript"),
]

const ignoreConfig = {
  ignores: ["eslint.config.mjs"],
}

const customConfig = {
  rules: {
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/consistent-type-exports": "error",
  },
}

export default typescriptEslint.config(
  ignoreConfig,
  typescriptEslint.configs.recommendedTypeChecked,
  typescriptEslint.configs.stylisticTypeChecked,
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
