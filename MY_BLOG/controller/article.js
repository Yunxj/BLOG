//首页处理函数
module.exports = {
    //约定大于配置
    getarticleAdd : (req,res)=>{
        //未登录拦截的操作 重定向index
        if(!req.session.isLogin) return res.redirect('/')
        res.render('./article/add.ejs',{
            user: req.session.user,
            isLogin: req.session.isLogin
        })
    }

}
