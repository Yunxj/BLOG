//首页处理函数
module.exports = {
    //约定大于配置
    indexHandler : (req,res)=>{
        res.render('index.ejs',{
            user: req.session.user,
            isLogin: req.session.isLogin
        })
    }

}
