const inquirer = require('inquirer')
const { info, underline } = require('../utils/utils')
function init() {
    const promptList = {
        type: 'list',
        message: '记事列表:',
        name: 'tools',
        choices: () => {
            let promptList = []
            articleList.forEach((item, index) => {
                promptList.push({
                    name: item.title + '  ' + item.time,
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
    apply: async () => {
        let promptList = await init()
        if (promptList.choices().length !== 0) {
            await inquirer.prompt(promptList).then((answers) => {
                console.log(underline(articleList[answers.tools].content))
            })
        } else {
            info('未搜索到内容')
        }
    }
}
