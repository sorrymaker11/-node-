const express = require('express')
const router = express.Router()

// 导入用户路由处理函数
const user=require('../router-handler/user')


router.post('/login',user.login)
router.post('/register',user.register)
router.post('/canteen11',user.canteen11)
router.post('/buy',user.buy)
router.post('/tobuy',user.tobuy)
router.post('/letter',user.letter)
router.post('/donoddle',user.donoddle)
router.post('/doedit',user.doedit)

router.get('/dologin',user.dologin)
router.get('/doregister',user.doregister)
router.get('/domain',user.domain)
router.get('/docanteen11',user.docanteen11)
router.get('/dobuy',user.dobuy)
router.get('/doletter',user.doletter)
router.get('/noddle',user.noddle)
router.get('/edit',user.edit)
module.exports = router