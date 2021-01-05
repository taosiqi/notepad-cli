
const ora = require('ora')
const chalk = require('chalk')

module.exports = {
  // 日志信息
  log: (message) => {
    console.log(message)
  },
  // 成功信息
  succeed: (...message) => {
    ora().succeed(chalk.greenBright.bold(message))
  },
  // 提示信息
  info: (...message) => {
    ora().info(chalk.blueBright.bold(message))
  },
  // 错误信息
  error: (...message) => {
    ora().fail(chalk.redBright.bold(message))
  },
  // 下划线重点信息
  underline: (message) => {
    return chalk.underline.blueBright.bold(message)
  }
}
