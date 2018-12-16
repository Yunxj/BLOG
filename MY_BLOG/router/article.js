const express = require('express')
const router = express.Router()
const ctrl = require('../controller/article.js')
//文章接口
router.get('/article/add',ctrl.getarticleAdd)

module.exports = router