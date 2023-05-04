let apis = new api();


const addTable = (params) => {
    console.log('data', params)
    apis.addTableList(params).then((data) => {
        console.log('data 12314', data)
    })
}


