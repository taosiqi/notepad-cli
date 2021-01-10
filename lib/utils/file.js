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
