const program = require('commander') //添加版本命令提示

const { packageInfo, open } = require('./config')  //配置文件
const {readDoc}=require('./utils/file') //文件操作


module.exports = class Service {
    constructor() {
        readDoc() //读取doc下面的文件存到一个数组
        setupDefaultCommands() //设置默认命令
        registerCommands() //注册自定义命令
    }
    run(_id, _args = {}, rawArgv = []) {
        program.parse(rawArgv, { from: 'user' })  //执行相应的命令
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
