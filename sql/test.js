const  mySql  = require('./sql').mySql

let n = { name: '', departure: '北京', type: '跟团游' }
console.log(mySql(n))

