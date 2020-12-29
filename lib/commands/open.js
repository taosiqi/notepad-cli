const fs = require('fs')
const inquirer = require('inquirer')
const chalk = require('chalk')
const path = require('path')
const commands = []
fs.readdirSync(`${__dirname}`).forEach((path) => {
    const command = require(`${__dirname}/${path}`)
    if(Object.keys(command).length!==0){
        let commandName = path.slice(0, -3)
        let data = {
            [commandName]: command
        }
        commands.push(data)
    }
})
function init() {
    const promptList = {
        type: 'list',
        message: '欢迎使用思淇记事本，请选择需要操作的功能:',
        name: 'tools',
        choices: () => {
            let promptList = []
            commands.forEach((command) => {
                const commandName=Object.keys(command)[0]
                const description=command[Object.keys(command)[0]].description
                promptList.push({
                    name: description,
                    value: commandName
                })
            })
            return promptList
        }
    }

    return promptList
}

module.exports = {
    description: '打开记事本',
    apply: async (env) => {
        let promptList = await init()
        inquirer.prompt(promptList).then((answers) => {
            // let tool=answers.tools.slice(0,3)
            console.log(answers.tools)
            // let doc=path.join(__dirname,'../../doc/')
        })
    }
}
