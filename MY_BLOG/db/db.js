//获取数据的链接对象
const mysql = require('mysql')
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'mysql_01',
    //开启多条语句查询
    multipleStatements:true
})
module.exports = conn