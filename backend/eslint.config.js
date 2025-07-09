const { defineConfig } = require('eslint/config')

module.exports = defineConfig([
  {
    ignores: [
      'node_modules/',
      '.vscode',
      '.env',
      '.env.backend.development',
      '.env.backend.development.example',
      '.env.backend.test',
      '.env.backend.production'
    ],
    rules: {
      'no-console': 1,
      'no-extra-boolean-cast': 0,
      'no-lonely-if': 1,
      'no-unused-vars': 1,
      'no-trailing-spaces': 1,
      'no-multi-spaces': 1,
      'no-multiple-empty-lines': 1,
      'space-before-blocks': ['error', 'always'],
      'object-curly-spacing': [1, 'always'],
      'indent': ['warn', 2],
      'semi': [1, 'never'],
      'quotes': ['error', 'single'],
      'array-bracket-spacing': 1,
      'linebreak-style': 0,
      'no-unexpected-multiline': 'warn',
      'keyword-spacing': 1,
      'comma-dangle': 1,
      'comma-spacing': 1,
      'arrow-spacing': 1,
      'require-await': 2,
      'no-return-await': 2,
      'no-await-in-loop': 1,
      'no-path-concat': 2
    }
  }
])
