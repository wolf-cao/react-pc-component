const autoprefixer = require('autoprefixer')

const config = {
  resolve: {
    alias: {
      react: 'react/cjs/react.production.min.js',
      'react-dom': 'react-dom/cjs/react-dom.production.min.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.(eot|svg|ttf|woff)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.js$/,
        loader: require.resolve('babel-loader'),
        exclude: /node_modules/
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'less-loader',
            options: { javascriptEnabled: true }
          }
        ]
      }
    ]
  }
}

module.exports = config
