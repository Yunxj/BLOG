const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
// console.log(express);
// const idnexRouter = require('./router/index.js')
// const userRouter = require('./router/user.js')
//获取数据的链接对象
app.use(session({
    secret: '这是加密的钥匙',
    resave: false,
    saveUninitialized: false,
    // saveUninitialized: true,
    cookie: { maxAge: 1000*60*60*24*30 } //过期时间
  }))
app.set('views engine', 'ejs')
//设置存放目录,如果不设置默认views
app.set('views','./views')
app.use(bodyParser.urlencoded({ extended: false })) //中间件 放在app就可以
app.use('/node_modules',express.static('./node_modules')) //node_modules静态托管

// app.use(idnexRouter)
// app.use(userRouter)
//用fs模块读取router目录下所有的文件名, 循环添加路由模块
fs.readdir(path.join(__dirname,'./router'),(err,filenames)=>{
    if(err) return console.log('读取路由失败')
    // console.log(filenames) //[ 'article.js', 'index.js', 'user.js' ]
    filenames.forEach(fname=>{
        //绝对路径
        //let 和 const 在循环里面,每次循环const的作用域不一样,是下一个新的作用域,新的一个const
        const router = require(path.join(__dirname,'./router',fname))
        // const router = require('./router' + fname)) //相对路径
        app.use(router)
    })
})
app.listen(80,()=>{
    console.log('http://127.0.0.1:80');
})

//高内聚  能在自己内部完成的一定不要干扰外部
//低耦合  尽可能的降低模块之间的耦合度
//MVC  后端思想 Model-View-Controller
//MVP  现在的主流思想 Modle-View-Presenter
//MVVM M V VM 前端思想 Modle View view modle
//cookie 用来做 客户端和服务器之间的状态保持的技术
//cookie是 客户端的 (来配合传递钥匙) session 会话机制是服务器端  取消登录时 session在服务器清除掉 (json web token)


// const express = require('express')
// const app = express()
// const bodyParser = require('body-parser')
// const moment = require('moment')
// //获取数据的链接对象
// const mysql = require('mysql')
// const conn = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'root',
//     database:'mysql_01'
// })

// app.set('views engine', 'ejs')
// //设置存放目录,如果不设置默认views
// app.set('views','./views')
// app.use('/node_modules',express.static('./node_modules')) //node_modules静态托管
// app.use(bodyParser.urlencoded({ extended: false })) //中间件

// //渲染首页
// app.get('/',(req,res)=>{
//     res.render('index.ejs',{})
// })

// //渲染注册
// app.get('/register',(req,res)=>{
//     res.render('./user/register.ejs', {})
// })

// //渲染登录
// app.get('/login',(req,res)=>{
//     res.render('./user/login.ejs', {})
// })

// //注册接口
// app.post('/register',(req,res)=>{
//     const uesrInfo = req.body
//     if(uesrInfo.username.trim().length <=0 || uesrInfo.password.trim().length <=0 || uesrInfo.nickname.trim().length <=0 ){
//         return res.status(400).send({status:400,msg:'请输入正确的用户名信息'})
//     }
//     // console.log(uesrInfo);
//     // res.send({status:200,msg:'成功'})
//     const sql1 = 'select count(*) as count from blog where username = ? '
//     conn.query(sql1,uesrInfo.username,(err,result)=>{
//         // console.log(result);
//         if(result.count) return res.status(400).send({status:400,msg:'用户名已被使用'}) 
//         const sql2 = 'insert into blog set ?'
//         uesrInfo.ctime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss') //设置时间
//         conn.query(sql2,uesrInfo,(err,result)=>{
//             if(err) return res.status(500).send({status:500,msg:'注册失败!'})
//             res.send({status:200,msg:'注册成功!'})
//         })
//     })

//     // res.redirect('./login')  重定向
// })
// //登录接口
// app.post('/login',(req,res)=>{
//     const loginInfo = req.body
//     // console.log(loginInfo);
//     const loginSql = 'select * from blog where username = ? and password = ?'
//     conn.query(loginSql,[loginInfo.username,loginInfo.password],(err,result)=>{
//         // console.log(result);
//         if(err || result.length == 0) return res.status(400).send({status:400,msg:'登录失败!请重试'}) 
        
//         res.send({status:200,msg:'登录成功!'})
//     })

//     // res.redirect('./login')  重定向
// })
// app.listen(80,()=>{
//     console.log('http://127.0.0.1:80');
// })
