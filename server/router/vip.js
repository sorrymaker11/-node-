const express = require('express')
const router = express.Router()


// 导入用户路由处理函数
const adminuser=require('../router-handler/adminuser')



router.post('/login',adminuser.login);
router.post('/lookOrder',adminuser.lookOrder);
router.post('/off',adminuser.off);
router.post('/lookOff',adminuser.lookOff);
router.post('/dolookLetter',adminuser.dolookLetter);
router.post('/doadminedit',adminuser.doadminedit);
// 隆江猪脚饭
router.post('/dolookcanteen11',adminuser.dolookcanteen11);
router.post('/delfood',adminuser.delfood);
router.post('/doeditfood',adminuser.doeditfood);
router.post('/toeditfood',adminuser.toeditfood);
router.post('/addfood',adminuser.addfood);
// 今日份小面
router.post('/dolooknoddle',adminuser.dolooknoddle);
router.post('/doeditnoddle',adminuser.doeditnoddle);
router.post('/toeditnoddle',adminuser.toeditnoddle);
router.post('/doaddnoddle',adminuser.doaddnoddle);
router.post('/delnoddle',adminuser.delnoddle);


router.get('/dologin',adminuser.dologin);
router.get('/index',adminuser.index);
router.get('/adminEdit',adminuser.adminEdit);
router.get('/dolookOrder',adminuser.dolookOrder);
router.get('/dolookOff',adminuser.dolookOff);
router.get('/lookLetter',adminuser.lookLetter);
// 隆江猪脚饭
router.get('/lookcanteen11',adminuser.lookcanteen11);
router.get('/editfood',adminuser.editfood);
router.get('/doaddfood',adminuser.doaddfood);
// 今日份小面
router.get('/looknoddle',adminuser.looknoddle);
router.get('/editnoddle',adminuser.editnoddle);
router.get('/addnoddle',adminuser.addnoddle);
module.exports = router