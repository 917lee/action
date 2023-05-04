const app = require('./newApp').app
const fs = require('fs')

const sendHtml = (response, path) => {
    let options = {
        encoding: 'utf-8',
    }
    let newPath = './template/' + path;
    fs.readFile(newPath, options, (error, data) => {
        // log(`读取的 html 文件 ${path} 内容是`, data)
        response.send(data)
    })
}

app.get('/', (request, response) => {
    let path = 'login.html'
    console.log(1)
    sendHtml(response, path)
})
app.get('/login.html', (request, response) => {
    let path = 'login.html'
    sendHtml(response, path)
})
app.get('/admin.html', (request, response) => {
    let path = `${request.url.split('?')[0]}`
    // console.log(path)
    sendHtml(response, path)
})
app.get('/index.html', (request, response) => {
    let path = `${request.url}`
    sendHtml(response, path)
})
app.get('/students.html', (request, response) => {
    let path = `${request.url}`
    sendHtml(response, path)
})
app.get('/teachers.html', (request, response) => {
    let path = `${request.url}`
    sendHtml(response, path)
})
app.get('/subjects.html', (request, response) => {
    let path = `${request.url}`
    sendHtml(response, path)
})
app.get('/face.html', (request, response) => {
    let path = `${request.url.split('?')[0]}`
    sendHtml(response, path)
})
app.get('/teacher.html', (request, response) => {
    let path = `${request.url.split('?')[0]}`
    sendHtml(response, path)
})
app.get('/teacher-info.html', (request, response) => {
    let path = `${request.url.split('?')[0]}`
    sendHtml(response, path)
})
app.get('/student-details.html', (request, response) => {
    let path = `${request.url}`
    sendHtml(response, path)
})
app.get('/add-student.html', (request, response) => {
    let path = `${request.url}`
    sendHtml(response, path)
})
app.get('/edit-student.html', (request, response) => {
    let path = `${request.url}`
    sendHtml(response, path)
})
app.get('/add-teacher.html', (request, response) => {
    let path = `${request.url}`
    sendHtml(response, path)
})
app.get('/edit-teacher.html', (request, response) => {
    let path = `${request.url}`
    sendHtml(response, path)
})
app.get('/add-subject.html', (request, response) => {
    let path = `${request.url}`
    sendHtml(response, path)
})
app.get('/forgot-password.html', (request, response) => {
    let path = `${request.url}`
    sendHtml(response, path)
})
app.get('/kaoqin.html', (request, response) => {
    let path = `${request.url.split('?')[0]}`
    sendHtml(response, path)
})
app.get('/student.html', (request, response) => {
    let path = `${request.url.split('?')[0]}`
    sendHtml(response, path)
})
app.get('/student-info.html', (request, response) => {
    let path = `${request.url.split('?')[0]}`
    sendHtml(response, path)
})
app.get('/kaoqin-info.html', (request, response) => {
    let path = `${request.url}`
    sendHtml(response, path)
})
app.get('/edit-subject.html', (request, response) => {
    let path = `${request.url}`
    sendHtml(response, path)
})

app.get('/blank-page.html', (request, response) => {
    let path = `${request.url}`
    sendHtml(response, path)
})


module.exports = {
    app,

}