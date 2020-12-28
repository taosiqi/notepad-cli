const fs = require('fs')
const childProcess = require('child_process')
const inquirer = require('inquirer')
const {
  checkDeployConfigExists,
  succeed,
  error,
  underline
} = require('../utils')
const { inquirerConfig } = require('../config')

// 获取用户输入信息
const getUserInputInfo = () => {
  return inquirer.prompt(inquirerConfig)
}


module.exports = {
  description: '删除文章',
  apply: () => {
    error(
      'deploy.config.js 文件不存，请使用 deploy-cli-service init 命令创建'
    )
    process.exit(1)
  }
}
