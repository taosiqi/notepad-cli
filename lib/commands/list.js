const inquirer = require('inquirer')

function init() {
    const promptList = {
        type: 'list',
        message: '记事列表:',
        name: 'tools',
        choices: () => {
            let promptList = []
            list.forEach((item,index) => {
                promptList.push({
                    name: item.title+'  '+item.time,
                    value: index
                })
            })
            return promptList
        }
    }
    return promptList
}

module.exports = {
    description: '记事列表',
    apply: async (env) => {
        let promptList = await init()
        if(promptList.choices().length!==0){
            await inquirer.prompt(promptList).then((answers) => {
                console.log(list[answers.tools].content)
            })
        }else {
            console.log('暂无记事')
        }


    }
}
