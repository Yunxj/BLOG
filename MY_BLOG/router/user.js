const express = require('express')
const router = express.Router()
const ctrl = require('../controller/user.js')
//渲染注册
router.get('/register',ctrl.getRegister)
//渲染登录
router.get('/login',ctrl.getLogin)
//注册接口
router.post('/register',ctrl.postRegister)
//登录接口
router.post('/login',ctrl.postLogin)
//登出接口
router.get('/logout',ctrl.getLogout)

module.exports = router