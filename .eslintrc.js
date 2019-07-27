module.exports = {
    parser: '@typescript-eslint/parser',

    parserOptions: {
        ecmaVersion: '2019',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        },
        project: './tsconfig.json'
    },

    plugins: ['@typescript-eslint', 'react' /*'jest' */],

    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended'
        // 'plugin:jest/recommended',
    ],

    env: {
        es6: true,
        browser: true,
        node: true,
        jest: true
    },

    rules: {
        '@typescript-eslint/no-use-before-define': 0,
        'react/no-string-refs': 0,
        'react/no-deprecated': 0
    }
};
