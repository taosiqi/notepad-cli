const inquirer = require('inquirer')

function init() {
    const promptList = {
        type: 'input',
        message: '请输入记事文章关键词:',
        name: 'find',
        validate: (val) => {
            return  val !='';
        }
    }
    return promptList
}
function init2(keyWord) {
    const promptList2 = {
        type: 'list',
        message: '记事列表:',
        name: 'tools',
        choices: () => {
            let promptList = []
            const data=list.filter((item,index)=>{
                return (item.title.indexOf(keyWord) != -1) || (item.content.indexOf(keyWord) != -1)
            })
            data.forEach((item,index) => {
                promptList.push({
                    name: item.title+'  '+item.time,
                    value: index
                })
            })
            return promptList
        }
    }
    return promptList2
}
module.exports = {
    description: '查找记事',
    apply: async (env) => {
        let promptList = await init()
        let keyWord=''
        await inquirer.prompt(promptList).then((answers) => {
            keyWord=answers.find
        })
        let promptList2 = await init2(keyWord)
        if(promptList2.choices().length!==0){
            await inquirer.prompt(promptList2).then((answers) => {
                console.log(list[answers.tools].content)
            })
        }else {
            console.log('未搜索到内容')
        }
    }
}
