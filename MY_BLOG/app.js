const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.set('views engine', 'ejs')
//设置存放目录,如果不设置默认views
app.set('views','./views')
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/node_modules',express.static('./node_modules')) //node_modules静态托管
app.get('/',(req,res)=>{
    res.render('index.ejs',{name:'zs',age:18})
})
app.get('/register',(req,res)=>{
    res.render('./user/register.ejs',{name:'zs',age:18})
})
app.get('/login',(req,res)=>{
    res.render('/user/login.ejs',{name:'zs',age:18})
})
app.post('/register',(req,res)=>{
    console.log(req.body);
    res.send({status:200,msg:'成功'})
    
    // res.redirect('./login')  重定向
})
app.listen(80,()=>{
    console.log('http://127.0.0.1:80');
})
