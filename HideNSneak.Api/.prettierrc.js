module.exports = {
  tabWidth: 2,
  printWidth: 80,
  endOfLine: 'auto',
  arrowParens: 'avoid',
  trailingComma: 'none',
  semi: true,
  useTabs: false,
  singleQuote: true,
  bracketSpacing: true,
  jsxBracketSameLine: true,
  overrides: [
    {
      files: '*.yml',
      options: {
        tabWidth: 4,
        singleQuote: true
      }
    }
  ]
};
