// eslint.config.js (ESLint 9 – flat config)
import globals from "globals";
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tseslint from "@typescript-eslint/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";

// Declaración de tipos para módulos sin tipos
declare module "eslint-config-airbnb-base";
declare module "eslint-config-airbnb-typescript/base";

// Airbnb (nota: usamos el paquete correcto para TS)
import airbnbBase from "eslint-config-airbnb-base";
import airbnbTs from "eslint-config-airbnb-typescript/base";


// Extraemos reglas de los configs legacy (pueden venir como objeto o arreglo)
const airbnbBaseRules =
  (Array.isArray(airbnbBase) ? airbnbBase[0] : airbnbBase)?.rules ?? {};

const airbnbTsConfig =
  typeof airbnbTs === "function" ? airbnbTs({}) : airbnbTs;

const airbnbTsRules =
  (Array.isArray(airbnbTsConfig) ? airbnbTsConfig[0] : airbnbTsConfig)?.rules ??
  {};

export default [
  // Recomendado base para JS
  js.configs.recommended,

  // Bloque principal (JS/TS)
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        // Poné `project: "./tsconfig.json"` si querés reglas que leen el proyecto
        project: false,
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      import: importPlugin,
      "unused-imports": unusedImports,
    },
    // Necesario para plugin-import (como en tu captura de settings)
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".ts", ".tsx"],
        },
      },
    },
    rules: {
      // Traemos reglas de Airbnb base + Airbnb TS (como en tus spreads)
      ...airbnbBaseRules,
      ...airbnbTsRules,

      // Tus overrides
      "no-unused-vars": "off",
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },

  // Archivos CJS (sourceType común)
  {
    files: ["**/*.cjs"],
    languageOptions: { sourceType: "commonjs" },
  },
];
