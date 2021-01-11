const inquirer = require('inquirer') ////命令行交互
const { readKey } = require('../utils/file')//文件操作
async function init(commands) {
    const promptList = {
        type: 'list',
        message: '欢迎使用思淇记事本，请选择需要操作的功能:',
        name: 'tools',
        choices: () => {
            let promptList = []
            // 读取commands下所有命令，供用户选择
            for (const commandsKey in commands) {
                promptList.push({
                    name: commands[commandsKey].description,
                    value: commandsKey
                })
            }
            return promptList
        }
    }
    return promptList
}

module.exports = {
    description: '打开记事本',
    apply: async () => {
        let commands = await readKey()
        let promptList = await init(commands)
        await inquirer.prompt(promptList).then(async (answers) => {
            await commands[answers.tools].apply() //执行选中的命令
            const command = require(`${__dirname}/open.js`)
            await command.apply() //执行完上述功能后回到当前功能页
        })
    }
}
