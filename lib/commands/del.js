const fs = require('fs')
const inquirer = require('inquirer')
function init() {
    const promptList = {
        type: 'input',
        message: '请输入需要删除的记事序列号:',
        name: 'del',
        validate: (val) => {
            let value=parseInt(val)
            return typeof value === 'number' && !isNaN(value) && value>0 && value<articleList.length+1;
        }
    }
    return promptList
}
function initLog() {
    let log = ''
    articleList.forEach((item, index) => {
        log += `${index + 1}:${item.title} \n`
    })
    return log
}
module.exports = {
    description: '删除记事',
    apply: async (env) => {
        let promptList = await init()
        let log = await initLog()
        console.log(log)
        await inquirer.prompt(promptList).then((answers) => {
            let name=answers['del']
            fs.unlinkSync(`./doc/${articleList[name - 1].timestamp}.txt`)
            articleList.splice(name-1,1);
            console.log('删除成功')
            Promise.resolve()
        })
    }
}
