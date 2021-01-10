const program = require('commander')
const { packageInfo, open } = require('./config')
const fs = require('fs')

global.articleList = []

module.exports = class Service {
    constructor() {
        readDoc()
        setupDefaultCommands()
        registerCommands()
    }
    run(_id, _args = {}, rawArgv = []) {
        program.parse(rawArgv, { from: 'user' })
    }
}
// 读取doc目录下文件内容
const readDoc=()=> {
    fs.readdir('./doc', function(err, files) {
        files.forEach((fileName) => {
            fs.readFile(`./doc/${fileName}`, 'utf-8', function(err, data) {
                if (err) {
                    console.error(err)
                } else {
                    articleList.push(JSON.parse(data))
                }
            })
        })
        articleList.reverse()
    })
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
