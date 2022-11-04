const express = require('express');
const router = express.Router();

const db = require('../db/index');

const app = express();



// 注册
exports.register = (req, res) => {
    const { username, password } = req.body

    // 定义SQL语句，查询用户名是否被查询
    const sql = 'select * from ev_user where username=?'
    db.query(sql, username, (err, results) => {
        if (err) { return res.status(500).send({ status: 1, msg: err.message }) }
        else if (results.length > 0) { return res.status(500).send('用户名被占用') }

        // 插入数据
        const sql = 'insert into ev_user set ?'
        db.query(sql, { username: username, password: password }, (err, results) => {
            if (err) { return res.status(500).send({ status: 1, msg: err.message }) }
            else if (results.affectedRows != 1) { return res.status(500).send('注册失败') }
            else return res.send('注册成功')
        })
    })
}
// 登录
exports.login = (req, res) => {
    const { username, password } = req.body


    const sql = 'select * from ev_user where username=?'
    db.query(sql, username, (err, results) => {
        if (err) {
            return res.status(400).send({ status: 1, msg: err.message })
        }
        else if (results.length !== 1) { return res.status(400).send('登录失败') }
        else if (password != results[0].password) { return res.status(400).send('密码错误'); }
        else {
            req.app.locals.userInfo = { username, password };
            return res.send({ msg: '登录成功' });

        }
    })
    // res.send('login')
}
// 修改密码
exports.doedit = (req, res) => {
    const { oldpassword, newpassword } = req.body;
    if (req.app.locals.userInfo.password != oldpassword) {
        return res.send('原密码错误')
    }
    else {
        const username = req.app.locals.userInfo.username;
        const sql = 'update ev_user set ? ' + 'where username="' + username+'"';
        db.query(sql, { password: newpassword }, (err, results) => {
            if (err) {
                return res.send({ status: 1, msg: err.message })
            }
            else if (results.affectedRows !== 1) {
                return res.send('修改失败')
            }
            else {
                req.app.locals.userInfo.password=newpassword;
                return res.send('修改成功')
            }
        })
    }
}
// 隆江猪脚饭
exports.canteen11 = (req, res) => {
    const sql11 = 'select * from food';
    db.query(sql11, (err, results) => {
        if (err) {
            return res.status(500).send({ status: 1, msg: err.message })
        }
        else {
            // 去除RowDataPacket
            var dataString = JSON.stringify(results);
            var data = JSON.parse(dataString);
            req.app.locals.canteen11 = { data };
            return res.send(data);

        }
    })

}
// 今日份小面
exports.donoddle = (req, res) => {
    const sql11 = 'select * from noddle';
    db.query(sql11, (err, results) => {
        if (err) {
            return res.status(500).send({ status: 1, msg: err.message })
        }
        else {
            // 去除RowDataPacket
            var dataString = JSON.stringify(results);
            var data = JSON.parse(dataString);
            req.app.locals.noddle = { data };
            return res.send(data);

        }
    })

}
// 将选中的菜品数据提交到购买页面
exports.buy = (req, res) => {
    var dataString = JSON.stringify(req.body);
    var data = JSON.parse(dataString);
    req.app.locals.buy = { data };
    return res.send('成功');
}
// 提交订单到数据库
exports.tobuy = (req, res) => {
    const { name, site, money, tel, remark } = req.body
    var getname = req.app.locals.userInfo.username;
    // 插入数据
    const sql = 'insert into dindan set ?'
    db.query(sql, { username: getname, foodname: name, site: site, money: money, tel: tel, remark: remark }, (err, results) => {
        if (err) { return res.status(500).send({ status: 1, msg: err.message }) }
        else if (results.affectedRows != 1) { return res.status(500).send('结算失败') }
        else return res.send('结算成功')
    })
}
// 将信件内容提交到数据库
exports.letter = (req, res) => {
    const getname = req.app.locals.userInfo.username;
    const sql = 'insert into letter set ?';
    db.query(sql, { username: getname, letter: req.body.letter }, (err, results) => {
        if (err) { return res.status(500).send({ status: 1, msg: err.message }) }
        else if (results.affectedRows != 1) { return res.status(500).send('发送信件失败') }
        else return res.send('发送信件成功')
    })
}





// 注册页面
exports.doregister = (req, res) => {
    res.render('user/register')
}

//修改用户信息页面
exports.edit = (req, res) => {
    res.render('user/edit')
}
// 登录页面
exports.dologin = (req, res) => {
    res.render('user/login')
}
// 主页
exports.domain = (req, res) => {
    res.render('user/main')
}
// 隆江猪脚饭页面
exports.docanteen11 = (req, res) => {
    res.render('user/canteen11')
}
// 购买页面
exports.dobuy = (req, res) => {
    res.render('user/buy')
}
// 写信件页面
exports.doletter = (req, res) => {
    res.render('user/letter')
}
// 今日份小面页面
exports.noddle = (req, res) => {
    res.render('user/noddle')
}