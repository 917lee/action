const connection = require('./connection.js').connection
// 对数据库进行增删改查操作
// 此操作是异步进行
const query = function query(sql) {
    //使用promise函数只调函数执行完成时才会返回调用
    return new Promise(function(resolve, reject) {
        connection.query(sql,function(err, data) {
            if(err) {
                reject(err)
            }
            else{
                let newData = JSON.stringify(data)
                let msg = JSON.parse(newData)
                resolve(msg)
            }
        })
    })
}

module.exports = {
    query: query,
}