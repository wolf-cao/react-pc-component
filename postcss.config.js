module.exports = {
  plugins: [
    require('postcss-flexbugs-fixes'),
    require('autoprefixer')({
      browsers: ['defaults', 'not ie < 11', '> 1%', 'last 2 versions']
    })
  ]
}
