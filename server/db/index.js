const mysql = require('mysql');
    const db = mysql.createPool({
        host: 'localhost', // 主机名 localhost / 127.0.0.1
        user: 'root',   // MySQL登录名 root
        password: '1',   // 密码
        database: 'node'   // 数据库名
    });
module.exports=db