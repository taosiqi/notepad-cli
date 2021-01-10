const fs = require('fs')
const inquirer = require('inquirer')
const chalk = require('chalk')
const path = require('path')
const {succeed}= require ('../utils/utils')

//读取commands目录下命令
function readKey(){
    const commands = {}
    fs.readdirSync(`${__dirname}`).forEach((path) => {
        const command = require(`${__dirname}/${path}`)
        if (Object.keys(command).length !== 0) {
            let commandName = path.slice(0, -3)
            commands[commandName] = command
        }
    })
    return commands
}

async function init(commands) {
    const promptList = {
        type: 'list',
        message: '欢迎使用思淇记事本，请选择需要操作的功能:',
        name: 'tools',
        choices: () => {
            let promptList = []
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
    apply: async (env) => {
        let commands=await readKey()
        let promptList = await init(commands)
        await inquirer.prompt(promptList).then(async (answers) => {
            await commands[answers.tools].apply()
            const command = require(`${__dirname}/open.js`)
            await command.apply()
        })
    }
}
