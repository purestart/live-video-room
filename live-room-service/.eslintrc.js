// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: ['html'],
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    semi: ['error', 'always'],
    'no-unused-vars': 0,
    'one-var': 0,
    eqeqeq: 'off',
    'no-callback-literal': 0,
    'standard/no-callback-literal': 0,
    "quotes": [1, "double"], //引号类型 `` "" ''
    "space-before-function-paren": [0, "always"] //函数定义时括号前面要不要有空格
  },
  globals: {
    requireModule: true
  }
}
