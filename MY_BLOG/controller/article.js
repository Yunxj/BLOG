//首页处理函数
const moment = require('moment')
const conn = require('../db/db.js')
const mditor = require('mditor')
const parser = new mditor.Parser()

module.exports = {
    //约定大于配置
    getarticleAdd : (req,res)=>{
        //未登录拦截的操作 重定向index 
        //在登录的同时服务器把用户信息和登录状态,挂载在req.session.isLogin上返回给浏览器,然后浏览器cookie传递给服务器
        if(!req.session.isLogin) return res.redirect('/')
        res.render('./article/add.ejs',{
            user: req.session.user,
            isLogin: req.session.isLogin
        })
    },
    postarticleAdd:(req,res)=>{
        //未登录拦截的操作 重定向index
        if(!req.session.isLogin) return res.send({status:400,msg:'身份信息已过期!请重新登录'})
        // if(!req.session.isLogin) return res.redirect('/')
        // res.render('./article/add.ejs',{
        //     user: req.session.user,
        //     isLogin: req.session.isLogin
        // })
        const bodycontent = req.body
        bodycontent.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
        bodycontent.authorId = req.session.user.id
        const sql = 'insert into blog_content set ?'
        // console.log(req.session.user)// 用session来传递id
        // console.log(bodycontent);
        conn.query(sql,bodycontent,(err,result)=>{
            // if(err || !result.affectedRows == 1) return res.status(500).send({status:500,msg:'发布失败!请重试'})
            if(err || result.affectedRows != 1) return res.status(500).send({ status: 500, msg: '文章发表失败!请重试!' + err.message })
            // console.log(result);{fieldCount: 0,affectedRows: 1,insertId: 1,serverStatus: 2,warningCount: 0,message: '',protocol41: true,changedRows: 0 }
            res.send({status:200,msg:'发布成功',articleId:result.insertId})
        })
    },
    getarticleInfo(req,res){
        // console.log(req.params) //{id}
        if(!req.session.isLogin) return res.send({status:400,msg:'身份信息已过期!请重新登录'})
        const authorId = parseInt(req.params.id)
        const sql = 'select * from blog_content where id =  ?'
        conn.query(sql,authorId,(err,result)=>{
            if(err || result.length !== 1) return res.redirect('/')
            // res.send(result)
            // console.log(result)  //{ id: 2, title: '111', content: '1111', ctime: 2018-12-17T05:59:21.000Z,     authorId: '1' }
            // console.log(req.session.user)//{ id: 1,  username: 'jack1', password: '123',   nickname: '123',    ctime: '2018-12-14T10:02:12.000Z',isdel: '0' }
            result[0].content = parser.parse(result[0].content)
            res.render('./article/info.ejs',{
                user: req.session.user,
                isLogin: req.session.isLogin,
                articleInfo: result[0]
            })
        })
    }, 
    getarticleEdit(req,res){
        // console.log(req.params) //{id}
        if(!req.session.isLogin) return res.redirect('/')
        const authorId = parseInt(req.params.id)
        const sql = 'select * from blog_content where id =  ?'
        conn.query(sql,authorId,(err,result)=>{
            if(err || result.length !== 1) return res.redirect('/')
            // res.send(result)
            // console.log(req.session.user)//{ id: 1,  username: 'jack1', password: '123',   nickname: '123',    ctime: '2018-12-14T10:02:12.000Z',isdel: '0' }
            //权限的控制: 如果当前登录的用户ID和作者ID不匹配 也不能渲染
            if(req.session.user.id != result[0].authorId) return res.redirect('/')
            res.render('./article/edit.ejs',{
                user: req.session.user,
                isLogin: req.session.isLogin,
                articleInfo: result[0]
            })
        })
    },
    postarticleEdit(req,res){   //编辑文章
        // console.log(req.body)  data的数据
        // console.log(req.params) url中加的数据 
        // if(!req.session.isLogin) return res.redirect('/')
        if(!req.session.isLogin) return res.status(500).send({status:500,msg:'文字修改失败!请重试'})
        req.body.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
        const sql = 'update blog_content set ? where id =  ?'
        conn.query(sql,[req.body,req.body.id],(err,result)=>{
            if(err || result.affectedRows !== 1) return res.status(500).send({status:500,msg:'编辑文章失败!请重试!'})
            res.send({status:200,msg:'文章修改成功!'})
            // console.log(req.session.user)//{ id: 1,  username: 'jack1', password: '123',   nickname: '123',    ctime: '2018-12-14T10:02:12.000Z',isdel: '0' }
            // res.render('./article/info.ejs',{
            //     user: req.session.user,
            //     isLogin: req.session.isLogin,
            //     articleInfo: result[0]
            // })
        })
    }

}
