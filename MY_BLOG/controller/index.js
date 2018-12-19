//首页处理函数
const conn = require('../db/db.js')

module.exports = {
    //约定大于配置
    // indexHandler : (req,res)=>{
    //     res.render('index.ejs',{
    //         user: req.session.user,
    //         isLogin: req.session.isLogin
    //     })
    // },
    indexHandler: (req,res)=>{
        const pageSize = 3 
        // console.log(req.query.page);
        const nowPage = parseInt(req.query.page) || 1
        //模板字符串
        const usersql = `select c.id ,c.title ,c.ctime ,b.nickname 
                         from blog_content as c 
                         left join blog as b 
                         on b.id = c.authorId
                         order by c.ctime desc
                         limit ${(nowPage - 1) * pageSize} , ${pageSize};
                         select count(*) as count from blog_content`
                         // 0  3
                         // 3  3
                         // 6  3
        conn.query(usersql,(err,result)=>{
            if(err) return res.send(err.message)
            // console.log(result);
            const totalPage = Math.ceil(result[1][0].count / pageSize) 
            res.render('index.ejs',{
                user: req.session.user,
                isLogin: req.session.isLogin,
                articleList: result[0],
                totalPage,
                nowPage,
            })

        })
    }
}
