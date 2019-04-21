const config = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: '../dist',
    port: 7000,
    host: '0.0.0.0'
  }
}

module.exports = config
