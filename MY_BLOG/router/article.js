const express = require('express')
const router = express.Router()
const ctrl = require('../controller/article.js')
//文章接口
router.get('/article/add',ctrl.getarticleAdd)

router.post('/article/add',ctrl.postarticleAdd)
router.get('/article/info/:id',ctrl.getarticleInfo)
router.get('/article/edit/:id',ctrl.getarticleEdit)
router.post('/article/edit/',ctrl.postarticleEdit)

module.exports = router