const query = require('../dbLink/dbLInk').query

// 数据存储的数组
let dbListOne = {
    'first': 'movie',
    'second': 'reading',
    'third': 'group',
}

let dbListTwo = {
    'movie': '电影',
    'reading': '读书',
    'group': '小组',
}

const findTable = (dbListTwo, name) => {
    let keys = Object.keys(dbListTwo)
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i]
        if (dbListTwo[key] === name) {
            return key
        }
    }
    return name
}

// 查询语句
const toGetMessage = (str, request, callback) => {
    if (request.activeName === 'first') {
        getMessage1(str, request, callback)
    }
    if (request.activeName === 'second') {
        getMessage2(str, request, callback)
    }
}

const getMessage1 = (str, request, callback) => {
    // request ={ currentPage: 1, pageSize: 20, allMsgSize: 1000 }
    let start = (request.currentPage - 1) * request.pageSize
    let end = request.currentPage * request.pageSize
    let q = query(`SELECT ${str} FROM  movie where id >=${start} and id <= ${end}`)
    q.then(callback).catch(function(err) {
        console.log("err", err)
    })
}

const getMessage2 = (str, request, callback) => {
    // request ={ currentPage: 1, pageSize: 20, allMsgSize: 1000 }
    let start = (request.currentPage - 1) * request.pageSize
    let end = request.currentPage * request.pageSize
    let q = query(`SELECT ${str} FROM  reading where id >=${start} and id <= ${end}`)
    q.then(callback).catch(function(err) {
        console.log("err", err)
    })
}

const firstSelect = (requestData, callback) => {
    let newRequest = {}
    newRequest.condition = findTable(dbListTwo, requestData.condition)
    newRequest.value = requestData.value
    console.log('requestData.condition 61', newRequest)
    let sql = `SELECT * FROM ${newRequest.condition} where name like '%${newRequest.value}%'`
    let q = query(sql)
    q.then(callback).catch(function(err) {
        console.log(err)
    })
}

const secondSelect = (requestData, callback) => {
        let first = {
            condition: 'movie',
            value: requestData.value,
        }
        firstSelect(first, callback)
}

module.exports = {
    dbListOne,
    toGetMessage,
    firstSelect,
    secondSelect,
}