const express=require('express');
const path=require('path');
const bodyPaser=require('body-parser');
const app=express();

// 导入并配置cors中间件
const cors = require('cors')
app.use(cors())

// 处理POST请求参数
app.use(bodyPaser.urlencoded({extended:false}))
// 告诉express框架模板的位置
app.set('views',path.join(__dirname,'views'));
// 告诉express模板框架的后者是什么
app.set('view engine','html');
// 当渲染后缀为html的模板时 使用的模板引擎是什么
app.engine('html',require('express-art-template'))


//开放静态资源文件
app.use(express.static(path.join(__dirname,'static')))


const user=require('./server/router/user');
app.use("/user",user);
const vip=require("./server/router/vip");
app.use("/adminuser",vip);


app.listen(3007,()=>{
    console.log('api server running at http://127.0.0.1:3007');
})