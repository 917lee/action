const submit = (db) => {
    //拿到相关DOM
    let username = e('#uid');
    let password = e('#psd');
    let fAlert = e('.fail')
    let id = e('form');
    id.addEventListener('submit', (event) => {
        let myData = new FormData(id);
        event.preventDefault();
        //拿到输入信息
        let params = {};
        params.username = username.value;
        params.password = password.value;
        params.type = myData.get('radio');
        console.log('data 15', params);
        let apis = new api();
        apis.login_pwd(params).then((data) => {
            // console.log('data 19', data);
            if (data) {
                console.log(1, myData.get('radio'))
                let type = myData.get('radio');
                    if (type === 'teacher') {
                        // console.log(24,type)
                        window.location = 'http://localhost:8080/teacher.html';
                    } else if (type === 'student') {
                        window.location = 'http://localhost:8080/student.html';
                    } else if (type === 'admin') {
                        // console.log(29,type)
                        window.location = 'http://localhost:8080/admin.html';
                    }
            } else {
                fAlert.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                        账号或密码输入错误请重新输入
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>`
            }
        })

    })
}

submit();