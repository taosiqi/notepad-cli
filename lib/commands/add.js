const fs = require('fs')
const ora = require('ora')
const inquirer = require('inquirer')
const { succeed } = require('../utils/utils')
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
    apply: async (env) => {
        await inquirer.prompt(promptList).then((answers) => {
            const timestamp=new Date().getTime()
            const data={
                    ...answers,
                    time:dayjs().format('YYYY-MM-DD HH:mm:ss'),
                    timestamp:timestamp
                }
                list.push(data)
                fs.writeFile(`./doc/${timestamp}.txt`, JSON.stringify(data), (error)=> {
                    if (error) {
                        console.error('写入失败了')
                    }
                })
            })
        succeed('添加成功')
        return Promise.resolve()
    }
}
