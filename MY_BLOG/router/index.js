const express = require('express') //保证模块单一
const router = express.Router()
const ctrl = require('../controller/index.js')
//渲染首页
router.get('/',ctrl.indexHandler)

module.exports = router