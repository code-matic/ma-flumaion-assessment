// import js from '@eslint/js'
// import globals from 'globals'
// import reactHooks from 'eslint-plugin-react-hooks'
// import reactRefresh from 'eslint-plugin-react-refresh'
// import tseslint from 'typescript-eslint'

// export default tseslint.config(
//   { ignores: ['dist'] },
//   {
//     extends: [js.configs.recommended, ...tseslint.configs.recommended],
//     files: ['**/*.{ts,tsx}'],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//     },
//     plugins: {
//       'react-hooks': reactHooks,
//       'react-refresh': reactRefresh,
//     },
//     rules: {
//       ...reactHooks.configs.recommended.rules,
//       'semi': ['error', 'always'],
//       'quotes': ['error', 'single'],
//       'indent': ['error', 2],
//       'no-console': 'warn',
//       '@typescript-eslint/no-unused-vars': 'error',
//       '@typescript-eslint/no-explicit-any': 'error',
//       '@typescript-eslint/no-empty-object-type': 'error',
//       '@typescript-eslint/no-empty-interface': 'error',
//       '@typescript-eslint/no-empty-object-type': 'error',
//       '@typescript-eslint/no-empty-object-type': 'error',
//       '@typescript-eslint/no-empty-object-type': 'error',
//       'react-refresh/only-export-components': [
//         'warn',
//         { allowConstantExport: true },
//       ],
//     },
//   },
// )

import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      "plugin:react/recommended",
      "plugin:react/jsx-runtime",
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      semi: ["error", "always"],
      quotes: ["error", "single", { avoidEscape: true }],
      indent: ["error", 2, { SwitchCase: 1 }],
      "no-console": "warn",
      "react/react-in-jsx-scope": "off",
      "react/jsx-curly-brace-presence": "error",
      "react/self-closing-comp": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-empty-interface": "error",
      "@typescript-eslint/no-empty-object-type": "error",
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/consistent-type-imports": "error",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  }
);
