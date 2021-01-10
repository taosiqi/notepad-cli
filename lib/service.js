const program = require('commander')

const { packageInfo, open } = require('./config')
const {readDoc}=require('./utils/file')


module.exports = class Service {
    constructor() {
        readDoc() //读取doc下面的文件存到一个数组
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
    return program.command('open').description('打开记事本').alias('o').action(() => {
        open.apply(program.args)
    })
}
