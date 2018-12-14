const express = require('express')
const app = express()
app.set('views engine', 'ejs')
//设置存放目录,如果不设置默认views
app.set('views','./views')
app.get('/',(req,res)=>{
    res.render('index.ejs',{name:'zs',age:18})
})
app.listen(80,()=>{
    console.log('http://127.0.0.1:80');
})
