const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const moment = require('moment')
//获取数据的链接对象
const mysql = require('mysql')
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'mysql_01'
})

app.set('views engine', 'ejs')
//设置存放目录,如果不设置默认views
app.set('views','./views')
app.use('/node_modules',express.static('./node_modules')) //node_modules静态托管
app.use(bodyParser.urlencoded({ extended: false })) //中间件

//渲染首页
app.get('/',(req,res)=>{
    res.render('index.ejs',{})
})

//渲染注册
app.get('/register',(req,res)=>{
    res.render('./user/register.ejs', {})
})

//渲染登录
app.get('/login',(req,res)=>{
    res.render('./user/login.ejs', {})
})

//注册接口
app.post('/register',(req,res)=>{
    const uesrInfo = req.body
    if(uesrInfo.username.trim().length <=0 || uesrInfo.password.trim().length <=0 || uesrInfo.nickname.trim().length <=0 ){
        return res.status(400).send({status:400,msg:'请输入正确的用户名信息'})
    }
    // console.log(uesrInfo);
    // res.send({status:200,msg:'成功'})
    const sql1 = 'select count(*) as count from blog where username = ? '
    conn.query(sql1,uesrInfo.username,(err,result)=>{
        // console.log(result);
        if(result.count) return res.status(400).send({status:400,msg:'用户名已被使用'}) 
        const sql2 = 'insert into blog set ?'
        uesrInfo.ctime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss') //设置时间
        conn.query(sql2,uesrInfo,(err,result)=>{
            if(err) return res.status(500).send({status:500,msg:'注册失败!'})
            res.send({status:200,msg:'注册成功!'})
        })
    })

    // res.redirect('./login')  重定向
})
//登录接口
app.post('/login',(req,res)=>{
    const loginInfo = req.body
    // console.log(loginInfo);
    const loginSql = 'select * from blog where username = ? and password = ?'
    conn.query(loginSql,[loginInfo.username,loginInfo.password],(err,result)=>{
        // console.log(result);
        if(err || result.length == 0) return res.status(400).send({status:400,msg:'登录失败!请重试'}) 
        
        res.send({status:200,msg:'登录成功!'})
    })

    // res.redirect('./login')  重定向
})
app.listen(80,()=>{
    console.log('http://127.0.0.1:80');
})
