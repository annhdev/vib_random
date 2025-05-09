import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier'
import importSort from 'eslint-plugin-simple-import-sort'
import preferArrowFunctions from 'eslint-plugin-prefer-arrow'

export default tseslint.config(
    {ignores: ['dist']},
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            'prettier': prettier,
            'simple-import-sort': importSort,
            'prefer-arrow': preferArrowFunctions
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                {allowConstantExport: true},
            ],
            'no-console': 'off',
            'prefer-const': ['error', {ignoreReadBeforeAssign: true}],
            'no-undef': 'off',
            'no-var': 'warn',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    args: 'none', // 'after-used'
                    caughtErrors: 'all',
                    ignoreRestSiblings: false,
                    reportUsedIgnorePattern: false,
                },
            ],
            'prettier/prettier': [
                'warn',
                {
                    arrowParens: 'always',
                    semi: false,
                    trailingComma: 'es5',
                    tabWidth: 4,
                    endOfLine: 'auto',
                    useTabs: false,
                    singleQuote: true,
                    printWidth: 300,
                    jsxSingleQuote: true,
                },
            ],
            'simple-import-sort/imports': 'error',
            '@typescript-eslint/no-require-imports': 'off',
            "prefer-arrow/prefer-arrow-functions": [
                "error",
                {
                    "disallowPrototype": true,
                    "singleReturnOnly": false,
                    "classPropertiesAllowed": true
                }
            ],
            'prefer-arrow-callback': 'error',
        },
    },
)
