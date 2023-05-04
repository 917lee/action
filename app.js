const fs = require('fs')
const log = console.log.bind(console)

const app = require('./dbLink/Get').app

// 连接数据库
const query = require('./dbLink/dbLInk').query

// 拿到 select 相关函数和数据
// const allSelect = require('./sql/selectTool')
const sendJSON = (response, data) => {
    let r = JSON.stringify(data, null, 2)
    response.send(r)
}

let menus = {
    teacher: 'tNumber',
    student: 'sNumber',
    admin: 'aNumber'
}


app.post('/login_pwd', (request, response) => {
    let requestData = request.body
    console.log('requestData', requestData)
    let q = query(`SELECT * FROM ${requestData.type} WHERE ${menus[requestData.type]} = "${requestData.username}"`)
    //查询成功时执行
    q.then(function(data) {
        log(data)
        if (JSON.stringify(data) === '[]') {
            sendJSON(response, false)
            return 0
        }
        let newData = data[0].pass_word
        sendJSON(response, newData === requestData.password)
    }).catch(function(err) {
        console.log("err", err)
    })
})

const getBlogCount = (tableName, callback) => {
    let q = query(`select MAX(id) from ${tableName};`)
    q.then(callback).catch((err) => {
        console.log(err)
    })
}

// 添加学生 / 教师 / 管理员
app.post('/addTableList', (request, response) => {
    let requestData = request.body
    getBlogCount(requestData.type, (data) =>{
        let count = data[0]['MAX(id)']
        let id = count + 1
        let sql = `insert into ${requestData.type} VALUES (${id}, '${requestData.addNumber}', '${requestData.addName}', '${requestData.password}');`
        if(requestData.type === 'student') {

            sql = `insert into ${requestData.type} VALUES (${id}, '${requestData.addNumber}', '${requestData.addName}', '${requestData.addClass}', '${requestData.password}', false);`
        }
        query(sql).then((data) => {
            sendJSON(response, {action:true})
        }).catch((err) => {
            console.log(err)
            sendJSON(response, {action:false})
        })
    })
    console.log('requestData in addTableList', requestData)
})

// 修改学生 / 教师 / 管理员
app.post('/editTableList', (request, response) => {
    let requestData = request.body
    getBlogCount(requestData.type, (data) =>{
        let count = data[0]['MAX(id)']
        let id = count + 1
        let sql = `insert into ${requestData.type} VALUES (${id}, '${requestData.addNumber}', '${requestData.addName}', '${requestData.password}');`
        if(requestData.type === 'student') {

            sql = `insert into ${requestData.type} VALUES (${id}, '${requestData.addNumber}', '${requestData.addName}', '${requestData.addClass}', '${requestData.password}', false);`
        }
        query(sql).then((data) => {
            sendJSON(response, {action:true})
        }).catch((err) => {
            console.log(err)
            sendJSON(response, {action:false})
        })
    })
    console.log('requestData in addTableList', requestData)
})

app.post('/search_stu', (request, response) => {
    let requestData = request.body
    let sql = `select * from student`
    let q = query(sql);

    q.then( (data) => {
        console.log('requestData in search_stu', data)
        sendJSON(response, data)
    }).catch( (err) => {
    })
})

app.post('/image_base64', (request, response) => {
    // console.log('1',request.body)
    let requestData = request.body
    baiduApi(requestData.value, function(result) {
        let obj = {};
        find(result, obj, (data) => {
            console.log(data[0]);
            obj.uid = data[0].sName;
            console.log(obj);
            sendJSON(response, obj);
        })
    });
})


const find = (data, obj, callback) => {
    if (findScore(data, 'score') > 85) {
        obj.tof = true;
        let num = findScore(data, 'user_id') / 1;
        // query(`UPDATE stu SET state = 0 WHERE stuNumber = ${num}`).then();
        let q = query(`SELECT sName FROM student WHERE sNumber = ${num}`);
        q.then(callback);
    } else {
        console.log(106)
        obj.tof = false;
        console.log(obj)
        callback(' ');
    }
}


const findScore = (json, find) => {
    for (let i in json) {
        if (i === find){
            return json[i];
        }else if (typeof json[i] === "object") {
            if (findScore(json[i], find) !== undefined) {
                return findScore(json[i], find);
            }
        }
    }
}


const AipFaceClient = require("baidu-aip-sdk").face;

const baiduApi = (image, callback) => {

    const APP_ID = "23757527";
    const API_KEY = "GmDvjIuiGYhokzt2xX0WGP10";
    const SECRET_KEY = "GuTfSnRnlQpfn95tiZwY6T88ajkjG1ly";

// 新建一个对象，建议只保存一个对象调用服务接口
    const client = new AipFaceClient(APP_ID, API_KEY, SECRET_KEY);

    let imageType = "BASE64";

    let groupIdList = "sutdent_group_1";

    // 调用人脸搜索 M:N 识别
    client.search(image, imageType, groupIdList).then(callback).catch(function(err) {
        // 如果发生网络错误
        return err;
    });
}

const main = () => {
    // actionGet()
    let port = 8080
    let server = app.listen(port, () => {
        // let host = server.address().address
        // let port = server.address().port
        log(`应用实例，访问地址为 http://localhost:${port}/`)
    })
}

main()

