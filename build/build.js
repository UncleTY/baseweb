'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const fse = require('fs-extra')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start()



rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // if you are using ts-loader, setting this to true will make tyescript errors show up during build
      chunks: false,
      chunkModules: false
    }) + '\n\n')
    // 为dist目录下index.html引用的config.js添加hash,去除缓存
    fse.readFile(path.join(config.build.assetsRoot, 'index.html'), 'utf-8', function(err, html) {
      if (err) return console.error('[webpack:build]: read index.html failed')

      const hash = stats.toJson('normal').hash || Date.now();
      const content = html.replace('sysconfig.js', `sysconfig.js?${hash}`)

      fse.writeFileSync(path.join(config.build.assetsRoot, 'index.html'), content, 'utf-8')
    })

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
