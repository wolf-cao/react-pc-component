const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const pkg = require(path.join(process.cwd(), 'package.json'))

const config = {
  entry: {
    [`${pkg.name}.min`]: './index.js'
  },
  output: {
    library: pkg.name,
    libraryTarget: 'umd'
  },
  plugins: [new CleanWebpackPlugin(['dist'])],
  externals: {
    react: {
      root: 'React',
      commonjs2: 'React',
      commonjs: 'React',
      amd: 'React'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'ReactDOM',
      commonjs: 'ReactDOM',
      amd: 'ReactDOM'
    }
  }
}

module.exports = config
