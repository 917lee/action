const mySql = (requestData) => {
    let sql1 = `name like '%${requestData.name}%'`
    let sql2 = `departure like '${requestData.departure}%'`
    let sql3 = `type = "${requestData.type}"`
    let sql = `SELECT * FROM travel where ${sql1} and ${sql2} and ${sql3}`
    if (requestData.name === '') {
        sql = `SELECT * FROM travel where ${sql2} and ${sql3}`
    }
    if (requestData.departure === '') {
        sql = `SELECT * FROM travel where ${sql1} and ${sql3}`
    }
    if (requestData.type === '') {
        sql = `SELECT * FROM travel where ${sql1} and ${sql2}`
    }
    if (requestData.departure === '' && requestData.name === '') {
        sql = `SELECT * FROM travel where ${sql3}`
    }
    if (requestData.name === '' && requestData.type === '') {
        sql = `SELECT * FROM travel where ${sql2}`
    }
    if (requestData.departure === '' && requestData.type === '') {
        sql = `SELECT * FROM travel where ${sql1}`
    }
    if (requestData.name === '' && requestData.departure === '' && requestData.type === '') {
        sql = `SELECT * FROM travel`
    }
    return sql
}

module.exports.mySql = mySql