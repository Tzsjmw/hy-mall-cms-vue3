module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/typescript/recommended',
        'plugin:prettier/recommended'
    ],
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        // 防止起名报错
        'vue/multi-word-component-names': 0,
        // any类型警告
        "@typescript-eslint/no-explicit-any": ["off"],
        // @typescript-eslint/no-unused-vars报错
        // "@typescript-eslint/no-unused-vars": ["off"],
        '@typescript-eslint/no-var-requires': 'off'
    }
}