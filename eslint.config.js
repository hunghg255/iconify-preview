// @ts-check
const antfu = require('@antfu/eslint-config').default

module.exports = antfu(
  {
    ignores: [
      'src/generated',
    ],
  },
  {
    rules: {
      // overrides
    },
  },
)
