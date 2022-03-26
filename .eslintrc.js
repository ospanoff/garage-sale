module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "react-hooks",
    "prettier",
    "simple-import-sort",
  ],
  rules: {
    "react/jsx-filename-extension": [
      "warn",
      {
        extensions: [".tsx"],
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
        tsx: "never",
      },
    ],
    "react/react-in-jsx-scope": "off",
    "no-empty-function": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
};
