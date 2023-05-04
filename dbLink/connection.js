const mysql = require("mysql")
// 连接数据库
// 配置数据库信息
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "students"
})


connection.connect(function(err, result) {
    if(err) {
        console.log(err)
    } else {
        console.log(result)
    }
})

module.exports = {
    connection,
}
