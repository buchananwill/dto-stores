// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import vitest from "eslint-plugin-vitest";

export default tseslint.config(
    {
        ignores: ['**/build/**', '**/dist/**', "webpack.config.js", "**/graphs/**"],
    },
    eslint.configs.recommended,
    ...tseslint.configs.strict,
    ...tseslint.configs.stylistic,
    {
        files: ["**/src/**"],
        plugins: {
            '@typescript-eslint': tseslint.plugin,
        },
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: true,
            },
        },
        rules: {
            '@typescript-eslint/no-unsafe-argument': 'error',
            '@typescript-eslint/no-unsafe-assignment': 'error',
            '@typescript-eslint/no-unsafe-call': 'error',
            '@typescript-eslint/no-unsafe-member-access': 'error',
            '@typescript-eslint/no-unsafe-return': 'error',

        },
    },
    {
        files: ["**/test/**"], // or any other pattern
        plugins: {
            vitest
        },
        rules: {
            ...vitest.configs.recommended.rules, // you can also use vitest.configs.all.rules to enable all rules
            "vitest/max-nested-describe": ["error", {"max": 3}] // you can also modify rules' behavior using option like this
        },
    },
    {
        // disable type-aware linting on JS files
        files: ['**/*.js'],
        ...tseslint.configs.disableTypeChecked,
    },
);