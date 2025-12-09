import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // custom rules for noop storage
  // {
  //   rules: {
  //     "@typescript-eslint/no-unused-vars": [
  //       "error",
  //       {
  //         argsIgnorePattern: "^_",
  //         varsIgnorePattern: "^_",
  //         caughtErrorsIgnorePattern: "^_",
  //         ignoreRestSiblings: true
  //       }
  //     ]
  //   }
  // }
];

export default eslintConfig;
