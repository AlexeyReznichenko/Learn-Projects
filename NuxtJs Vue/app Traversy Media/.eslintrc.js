module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'prettier'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    "no-console": "off",
    "vue/attributes-order": "off",
    "vue/require-prop-types": "off",
    "vue/no-multiple-template-root": "off",
    "vue/order-in-components": "off",
  }
}
