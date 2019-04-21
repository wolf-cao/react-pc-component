const merge = require('webpack-merge')
const common = require('./webpack.config.common.js')
const sitConfig = require('./webpack.config.sit.js')
const apiConfig = require('./webpack.config.api.js')
const developConfig = require('./webpack.config.development.js')

let config = {}
const APP_ENV = process.env.NODE_ENV

if (APP_ENV === 'development') {
  config = merge(common, sitConfig)
  config = merge(config, developConfig)
} else {
  config = merge(common, apiConfig)
}

module.exports = config
