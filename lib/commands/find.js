const inquirer = require('inquirer')
const { info, underline } = require('../utils/utils')
// 输入查找的关键词
function init() {
    const promptList = {
        type: 'input',
        message: '请输入记事文章关键词:',
        name: 'find',
        validate: (val) => {
            return val != ''
        }
    }
    return promptList
}
// 根据关键词筛选
function filtrate(keyWord) {
    const filtrateData = {
        type: 'list',
        message: '记事列表:',
        name: 'tools',
        choices: () => {
            let promptList = []
            const data = articleList.filter((item, index) => {
                return (
                    item.title.indexOf(keyWord) != -1 ||
                    item.content.indexOf(keyWord) != -1
                )
            })
            data.forEach((item, index) => {
                promptList.push({
                    name: item.title + '  ' + item.time,
                    value: index
                })
            })
            return promptList
        }
    }
    return filtrateData
}
module.exports = {
    description: '查找记事',
    apply: async () => {
        let promptList = await init()
        let keyWord = ''
        await inquirer.prompt(promptList).then((answers) => {
            keyWord = answers.find
        })
        let filtrateData = await filtrate(keyWord)
        if (filtrateData.choices().length !== 0) {
            await inquirer.prompt(filtrateData).then((answers) => {
                console.log(underline(articleList[answers.tools].content))
            })
        } else {
            info('未搜索到内容')
        }
    }
}
