const express = require('express')
const bodyParser = require('body-parser')

// cors 模块用来解决跨域问题
const cors = require('cors')
const app = express()

// 配置静态文件目录
app.use(express.static('static'));
app.use(cors())
// 自己解析前端发送过来的 json 格式的数据
app.use(bodyParser.json({limit:'100mb'}));

module.exports = {
    app,
}