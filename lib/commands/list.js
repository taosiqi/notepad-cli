const fs = require('fs')
const ora = require('ora')
const inquirer = require('inquirer')
const {
  error,
} = require('../utils')


module.exports = {
  description: '所有文章',
  apply: async (env) => {
    error(
      'deploy.config.js 文件不存，请使用 deploy-cli-service init 命令创建'
    )
    process.exit(1)
  }
}
