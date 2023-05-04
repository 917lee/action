class ajax {
    constructor(baseUrl) {
        this.baseUrl = baseUrl || 'http://localhost:8080'
    }

    get(path, param = {}) {
        let url = this.baseUrl + path
        return axios.get(url, param).then(r => r.data)
    }

    post(path, params) {
        let url = this.baseUrl + path
        return axios.post(url, params).then(r => r.data)
    }
}

class api extends ajax{
    login_pwd(params) {
        let path = '/login_pwd'
        return this.post(path, params)
    }
    image_base64(params) {
        let path = '/image_base64'
        return this.post(path, params)
    }
    search_info(params) {
        let path = '/search_info'
        return this.post(path, params)
    }
    addTableList(params) {
        let path = '/addTableList'
        return this.post(path, params)
    }
    search_stu(params) {
        let path = '/search_stu'
        return this.post(path, params)
    }
}
