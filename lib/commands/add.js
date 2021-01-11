const inquirer = require('inquirer') //命令行交互
const { succeed } = require('../utils/utils') //封装的提示类型log
const { add } = require('../utils/file') //文件操作
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
            // 构造文件结构
            const timestamp = new Date().getTime()
            const data = {
                ...answers,
                time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                timestamp: timestamp
            }
            // 创建记事本文件
            add(data, timestamp)
        })
        succeed('添加成功')
        return Promise.resolve()
    }
}
