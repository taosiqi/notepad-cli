# 🍖从一个记事本入门node脚手架开发 

> 什么是脚手架，按照个人理解，脚手架就是一个项目模板（其实还可以做更多的事），在脚手架的帮助下，我们可以专注自己的业务代码开发，而不用再花时间去配置项目初始模板，而使用`NodeJS`进行开发的脚手架，我称之为`NodeJS`脚手架开发。 

## 前言

小猪配淇手上纹，我们都是打工人🤣。

使用三大金刚做前端开发的小伙伴想必都使用过各家的脚手架工具吧，不知道有没有手痒痒的想试着写一下的，啦啦啦，反正我看着作者的文章是手痒啦。之前一直想着学习`NodeJS`脚手架开发，可是每次都被自己的懒癌打败了，这次终于有时(hua)间(shui)，于是花了点时间写了个小`DEMO`，也就是文章里面的记事本工具，这个工具并没有涉及到`git`下载（可以参考掘金其他文章），它更多的是展示一个脚手架该具备的工作流程以及常用的一个工具使用。那么，我们开始吧！

代码注释写的比较清楚，期望每一位小伙伴都能看懂。当然，作者本身也只是一名初级前端，其中要是有啥讲的不对的，也请大佬们指出，拜谢🙈。



## 初始化环境

### 需求

```
实现一个nodejs记事本，记事本以txt文件形式存储在本地，能够实现对其的增删查。
```

### 项目版本

> - **NodeJS:** v12.18.3
> 

### 用到的工具库
> - **chalk:** 修改终端颜色
> - **commander:**添加版本命令提示
> - **inquirer:** 命令行交互
> - **minimis":** 命令行解析
> - **ora:** 终端旋转器
> - **prettier:** 代码格式化
> - **dayjs:** 时间格式化工具

### 项目结构

需要关注的文件

```
notepad-cli
├── bin
│   └── notepad-cli.js -- 可执行的文件
├── doc
│   └── 1610262571511.txt --
├── lib
│   ├── commands --具体命令目录
│   │   ├── add.js
│   │   ├── del.js
│   │   ├── exit.js
│   │   ├── find.js
│   │   ├── list.js
│   │   └── open.js
│   ├── config  --配置文件目录
│   │   └── index.js
│   ├── service.js --入口文件
│   └── utils   --工具类封装
│       ├── file.js
│       └── utils.js
├── package.json
```

### 下载案例

```bash
git clone https://github.com/taosiqi/notepad-cli.git
cd notepad-cli
yarn 
npm link 链接到全局库
notepad-cli open 
```

## 案例分析

### 创建项目

```
1、mkdir notepad-cli && cd notepad-cli
2、依据上文目录结构创建目录
3、安装上文提到的工具库
```

`npm init` 创建 `package.json`，添加 `bin` 命令

```json
"bin": {
    "notepad-cli": "bin/notepad-cli.js"  //执行npm link之后 可以使用notepad-cli使用脚手架
 },
```

### 入口文件notepad-cli

执行`notepad-cli`将会执行`/bin/notepad-cli.js`文件

```javascript
#!/usr/bin/env node
// 第一行不可少，其作用是它告诉系统这个脚本需要用node解释器来执行。
// 这个文件主要是用来处理接受参数的入口文件，
const Service = require('../lib/service') //引入我们的入口文件
const service = new Service() //实例化Service

const rawArgv = process.argv.slice(2)
console.log(rawArgv) //[ 'open' ]

const args = require('minimist')(rawArgv) //解析命令行参数
console.log(args) //{ _: [ 'open' ] }

const command = args._[0]
// 执行初始化
service.run(command, args, rawArgv)
```

### 命令入口service

执行`service.run(command, args, rawArgv)`将会执行`/lib/service.js`文件

```javascript
const program = require('commander') //添加版本命令提示

const { packageInfo, open } = require('./config')  //配置文件
const {readDoc}=require('./utils/file') //文件操作


module.exports = class Service {
    constructor() {
        readDoc() //读取doc下面的文件存到一个数组
        setupDefaultCommands() //设置默认命令
        registerCommands() //注册自定义命令
    }
    run(_id, _args = {}, rawArgv = []) {
        program.parse(rawArgv, { from: 'user' })  //执行相应的命令
    }
}

// 设置默认命令
const setupDefaultCommands = () => {
    program.version(packageInfo.version, '-v, --version', '输出当前版本号')
    program.helpOption('-h, --help', '获取帮助')
    program.addHelpCommand(false)
}
// 注册命令
const registerCommands = () => {
    return program.command('open').description('打开记事本').alias('o').action(() => {
        open.apply(program.args)
    })
}

```

### 打开记事本命令 open

`/lib/service.js`文件注册的自定义命令 `open` ，使用 `notepad-cli open`执行。

```javascript
const inquirer = require('inquirer') ////命令行交互
const { readKey } = require('../utils/file')//文件操作
async function init(commands) {
    const promptList = {
        type: 'list',
        message: '欢迎使用思淇记事本，请选择需要操作的功能:',
        name: 'tools',
        choices: () => {
            let promptList = []
            // 读取commands下所有命令，供用户选择
            for (const commandsKey in commands) {
                promptList.push({
                    name: commands[commandsKey].description,
                    value: commandsKey
                })
            }
            return promptList
        }
    }
    return promptList
}

module.exports = {
    description: '打开记事本',
    apply: async () => {
        let commands = await readKey()
        let promptList = await init(commands)
        await inquirer.prompt(promptList).then(async (answers) => {
            await commands[answers.tools].apply() //执行选中的命令
            const command = require(`${__dirname}/open.js`)
            await command.apply() //执行完上述功能后回到当前功能页
        })
    }
}
```

### 增加记事本 add

```javascript
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
```

### 删除记事本 del

```javascript
const { del } = require('../utils/file')
const { succeed, info } = require('../utils/utils')
const inquirer = require('inquirer')
function init() {
    const promptList = {
        type: 'input',
        message: '请输入需要删除的记事序列号:',
        name: 'del',
        validate: (val) => {
            let value = parseInt(val)
            return (
                typeof value === 'number' &&
                !isNaN(value) &&
                value > 0 &&
                value < articleList.length + 1
            )
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
    apply: async () => {
        let promptList = await init()
        let log = await initLog() //显示所有文章列表
        info(log)
        await inquirer.prompt(promptList).then(async (answers) => {
            await del(answers['del'])
            succeed('删除成功')
            return Promise.resolve()
        })
    }
}
```

### 退出记事本 exit

```javascript
const { succeed } = require('../utils/utils')
module.exports = {
    description: '退出记事',
    apply: async (env) => {
        succeed('退出成功')
        process.exit(1)
    }
}
```

### 查找记事本 find

```javascript
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
```

### 记事本列表 list

```javascript
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
```

### 配置文件 config/index

```javascript
module.exports = {
    packageInfo: require('../../package.json'),
    open: require('../commands/open')
}
```

### 文件操作 file

```javascript
const fs = require('fs')
const path = require('path')
const docPath = path.join(__dirname, `../../doc`)
const commandPath = path.join(__dirname, `../commands`)
module.exports = {
    // 增加文件
    add: (data, timestamp) => {
        fs.writeFile(
            `${docPath}/${timestamp}.txt`,
            JSON.stringify(data),
            (error) => {
                if (error) {
                    console.error('写入失败了')
                } else {
                    articleList.push(data)
                }
            }
        )
    },
    // 删除文件
    del: (name) => {
        fs.unlinkSync(`${docPath}/${articleList[name - 1].timestamp}.txt`)
        articleList.splice(name - 1, 1)
    },
    //读取commands目录下命令
    readKey: () => {
        let commands = {}
        fs.readdirSync(commandPath).forEach((paths) => {
            const command = require(`${commandPath}/${paths}`)
            if (Object.keys(command).length !== 0) {
                let commandName = paths.slice(0, -3)
                commands[commandName] = command
            }
        })
        return commands
    },
    // 读取doc目录下文件内容
    readDoc: () => {
        global.articleList = []
        fs.readdirSync(docPath).forEach((fileName) => {
            fs.readFile(
                `${docPath}/${fileName}`,
                'utf-8',
                function (err, data) {
                    if (err) {
                        console.error(err)
                    } else {
                        articleList.push(JSON.parse(data))
                    }
                }
            )
        })
        articleList.reverse()
    }
}
```

### 文本提示util

```javascript
const ora = require('ora')
const chalk = require('chalk')

module.exports = {
  // 日志信息
  log: (message) => {
    console.log(message)
  },
  // 成功信息
  succeed: (...message) => {
    ora().succeed(chalk.greenBright.bold(message))
  },
  // 提示信息
  info: (...message) => {
    ora().info(chalk.blueBright.bold(message))
  },
  // 错误信息
  error: (...message) => {
    ora().fail(chalk.redBright.bold(message))
  },
  // 下划线重点信息
  underline: (message) => {
    return chalk.underline.blueBright.bold(message)
  }
}
```

## 总结

小而美的mitt库，里面的设计模式、以及一些小的技巧、运算符的运用，都值得我们去学习，在使用中也遇到的一些小坑，都能够让我们的基础更加稳固。
**希望看完的朋友可以动动手点个赞再走哦，你们的支持是对我最大的鼓励啊！！！**

## 引用

> 1. [deploy-cli-service](https://github.com/fuchengwei/deploy-cli-service)
