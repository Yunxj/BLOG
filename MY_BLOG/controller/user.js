//需要数据库的链接和momet模块的时间添加
const moment = require('moment')
const conn = require('../db/db.js')
module.exports = {
    getRegister: (req,res)=>{
        res.render('./user/register.ejs', {})
    },
    getLogin:(req,res)=>{
        res.render('./user/login.ejs', {})
    },
    postRegister:(req,res)=>{
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
    },
    postLogin:(req,res)=>{
        const loginInfo = req.body
        // console.log(loginInfo);
        const loginSql = 'select * from blog where username = ? and password = ?'
        conn.query(loginSql,[loginInfo.username,loginInfo.password],(err,result)=>{
            // console.log(result);
            if(err || result.length == 0) return res.status(400).send({status:400,msg:'登录失败!请重试'}) 
            //把登录成功的信息挂载到session上
            req.session.user = result[0] //将查询的结构,返回request的响应
            req.session.isLogin = true   //判断登录JWT 
            // console.log(res.session);
            res.send({status:200,msg:'登录成功!'})
        })
        // res.redirect('./login')  重定向
    },
    getLogout:(req,res)=>{
        // req.session.destroy(() => {
        //     res.redierct('/')
        //     // res.send({status:200,msg:'退出登录成功'})
        // }) 
        req.session.destroy(function() {
            // 使用 res.redirect 方法，可以让 客户端重新访问 指定的页面
            res.redirect('/')
        })
    }
}
