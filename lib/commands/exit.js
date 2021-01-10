const { succeed } = require('../utils/utils')
module.exports = {
    description: '退出记事',
    apply: async (env) => {
        succeed('退出成功')
        process.exit(1)
    }
}
