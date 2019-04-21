const req = require.context(
  './src/components',
  true,
  /^\.\/[^_][\w-]+\/style\/index\.js?$/
)
req.keys().forEach(mod => {
  req(mod)
})

module.exports = require('./src/components/index')
