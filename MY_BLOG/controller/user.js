//需要数据库的链接和momet模块的时间添加
const moment = require('moment')
const conn = require('../db/db.js')
const bcrypt = require('bcryptjs')
module.exports = {
    getRegister: (req,res)=>{
        res.render('./user/register.ejs', {}) //渲染注册页面
    },
    getLogin:(req,res)=>{  
        res.render('./user/login.ejs', {}) //渲染登录页面
    },
    postRegister:(req,res)=>{   //注册账号
        const uesrInfo = req.body
        if(uesrInfo.username.trim().length <=0 || uesrInfo.password.trim().length <=0 || uesrInfo.nickname.trim().length <=0 ){
            return res.status(400).send({status:400,msg:'请输入正确的用户名信息'})
        }
        // console.log(uesrInfo);
        // res.send({status:200,msg:'成功'})
        const sql1 = 'select count(*) as count from blog where username = ? '
        conn.query(sql1,uesrInfo.username,(err,result)=>{
            if(err) return res.status(500).send({status:500,msg:'查重失败!请重试'})
            // console.log(result);
            if(result[0].count !== 0) return res.status(400).send({status:400,msg:'用户名已被使用'}) 

            uesrInfo.ctime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss') //设置时间
            //给密码加密
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(uesrInfo.password,salt)
            uesrInfo.password = hash
            const sql2 = 'insert into blog set ?'
            
            conn.query(sql2,uesrInfo,(err,result)=>{
                if(err) return res.status(500).send({status:500,msg:'注册失败!'})
                res.send({status:200,msg:'注册成功!'})
            })
        })
        // res.redirect('./login')  重定向
    },
    postLogin:(req,res)=>{  //登录验证
        const loginInfo = req.body
        // console.log(loginInfo);
        const loginSql = 'select * from blog where username = ?'
        conn.query(loginSql,loginInfo.username,(err,result)=>{
            // console.log(result);
            if(err || result.length == 0) return res.status(400).send({status:400,msg:'登录失败!请重试'}) 
            //把登录成功的信息挂载到session上
            if(!bcrypt.compareSync(loginInfo.password,result[0].password)) return res.status(400).send({status:400,msg:'登录失败!请重试'}) 
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
        req.session.destroy(function(err) {  //销毁session
            // 使用 res.redirect 方法，可以让 客户端重新访问 指定的页面
            res.redirect('/')
            // res.send({status:200,msg:'退出登录成功'})

        })
    }
}
