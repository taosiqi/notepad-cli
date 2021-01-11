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
