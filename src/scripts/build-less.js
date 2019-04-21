var fs = require('fs')
var path = require('path')

console.log('Building a entry less file to dist/pf-ui.less')
var componentsPath = path.join(process.cwd(), 'src', 'components')
var componentsLessContent = ''
componentsLessContent += `@import "../../src/components/${path.join(
  'style',
  'style.less'
)}";\n`

// Build components in one file: lib/style/components.less
fs.readdir(componentsPath, function(err, files) {
  files.forEach(function(file) {
    if (fs.existsSync(path.join(componentsPath, file, 'style', 'style.less'))) {
      // copy style.less文件到lib目录
      var libPath = path.join(process.cwd(), 'lib')
      fs.readFile(
        path.join(componentsPath, file, 'style', 'style.less'),
        'utf-8',
        function(err, fileData) {
          fs.writeFileSync(
            path.join(libPath, file, 'style', 'style.less'),
            fileData
          )
        }
      )
    }
  })
  fs.writeFileSync(
    path.join(process.cwd(), 'lib', 'style', 'style.less'),
    componentsLessContent
  )

  fs.writeFileSync(
    path.join(process.cwd(), 'lib', 'index.less'),
    '@import "./style/style.less";'
  )
})
