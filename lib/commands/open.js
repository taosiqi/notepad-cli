const fs = require('fs')
const inquirer = require('inquirer')
const chalk = require('chalk')
const path = require('path')
const {succeed}= require ('../utils/index')

const commands = {}
fs.readdirSync(`${__dirname}`).forEach((path) => {
    const command = require(`${__dirname}/${path}`)
    if (Object.keys(command).length !== 0) {
        let commandName = path.slice(0, -3)
        commands[commandName] = command
    }
})
function init() {
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
        console.log(a)
        let promptList = await init()
        await inquirer.prompt(promptList).then(async (answers) => {
            await commands[answers.tools].apply()
            const command = require(`${__dirname}/open.js`)
            await command.apply()
        })
    }
}
