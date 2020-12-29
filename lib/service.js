const program = require('commander')
const { packageInfo } = require('./config')

module.exports = class Service {
  constructor() {
    setupDefaultCommands()
    registerCommands()
  }

  run(_id, _args = {}, rawArgv = []) {
    program.parse(rawArgv, { from: 'user' })
  }
}

// 设置默认命令
const setupDefaultCommands = () => {
  program.version(packageInfo.version, '-v, --version', '输出当前版本号')
  program.helpOption('-h, --help', '获取帮助')
  program.addHelpCommand(false)
}

// 注册命令
const registerCommands = () => {
  const commandsPath = `${__dirname}/commands`

  const idToPlugin = () => {
    const command = require(`${commandsPath}/open.js`)
      program
          .command('open')
          .description('打开记事本')
          .alias('o')
          .action(() => {
            command.apply(program.args)
          })
  }
  return idToPlugin()
}
