module.exports = {
  sourceMaps: true,
  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true
      }
    ],
    ['@babel/plugin-proposal-class-properties']
  ],
  presets: [
    ['@babel/preset-react'],
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: '58',
          ie: '11'
        },
        useBuiltIns: 'entry',
        corejs: '3',
        debug: false
      }
    ]
  ],
  ignore: ['node_modules']
}
