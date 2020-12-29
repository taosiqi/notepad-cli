const fs = require('fs')
const ora = require('ora')
const inquirer = require('inquirer')
const { succeed } = require('../utils')

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
      process.exit(1)
        inquirer
            .prompt(promptList)
            .then((answers) => {
                console.log(answers) // 返回的结果

            })
    }
}
