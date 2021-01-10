const inquirer = require('inquirer')
const { succeed } = require('../utils/utils')
const { add } = require('../utils/file')
const dayjs = require('dayjs')
const promptList = [
    {
        type: 'input',
        message: '请输入标题:',
        name: 'title',
        validate: (val) => {
            return val !== ''
        }
    },
    {
        type: 'input',
        message: '请输入内容:',
        name: 'content',
        validate: (val) => {
            return val !== ''
        }
    }
]

module.exports = {
    description: '添加记事',
    apply: async () => {
        await inquirer.prompt(promptList).then(async (answers) => {
            const timestamp = new Date().getTime()
            const data = {
                ...answers,
                time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                timestamp: timestamp
            }
            add(data, timestamp)
        })
        succeed('添加成功')
        return Promise.resolve()
    }
}
