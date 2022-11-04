const express = require('express');
const router = express.Router();

const db = require('../db/index');

const app = express();

// 登录操作
exports.login = (req, res) => {
    const { username, password } = req.body;

    const sql = 'select * from admin where adminname=?'
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
exports.doadminedit = (req, res) => {
    const { oldpassword, newpassword } = req.body;
    if (req.app.locals.userInfo.password != oldpassword) {
        return res.send('原密码错误')
    }
    else {
        const username = req.app.locals.userInfo.username;
        const sql = 'update admin set ? ' + 'where adminname="' + username + '"';
        db.query(sql, { password: newpassword }, (err, results) => {
            if (err) {
                return res.send({ status: 1, msg: err.message })
            }
            else if (results.affectedRows !== 1) {
                return res.send('修改失败')
            }
            else {
                req.app.locals.userInfo.password = newpassword;
                return res.send('修改成功')
            }
        })
    }
}
// 查看订单
exports.lookOrder = (req, res) => {
    const sql = 'select * from dindan where status="on"'
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send({ status: 1, msg: err.message })
        }
        else {
            var dataString = JSON.stringify(results);
            var data = JSON.parse(dataString);
            req.app.locals.order = { data }
            return res.send(results)
        }
    })
}
// 完成订单操作
exports.off = (req, res) => {
    const id = req.body.id;

    const sql = 'update dindan set status="off" where id=?'
    db.query(sql, id, (err, results) => {
        if (err) {
            return res.status(500).send({ status: 1, msg: err.message })
        }
        else if (results.affectedRows != 1) { return res.status(400).send('数据更新失败') }
        else {
            return res.send('恭喜完成此订单');
        }
    })
}
// 查看已完成订单
exports.lookOff = (req, res) => {
    const sql = 'select * from dindan where status="off"'
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send({ status: 1, msg: err.message })
        }
        else {
            var dataString = JSON.stringify(results);
            var data = JSON.parse(dataString);
            req.app.locals.offorder = { data }
            return res.send(results)
        }
    })
}
// 查看来信
exports.dolookLetter = (req, res) => {
    const sql = 'select * from letter';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send({ status: 1, msg: err.message })
        }
        else {
            var dataString = JSON.stringify(results);
            var data = JSON.parse(dataString);
            req.app.locals.lookletter = { data };
            return res.send(data);
        }
    })
}


// 隆江猪脚饭
exports.dolookcanteen11 = (req, res) => {
    const sql11 = 'select * from food';
    db.query(sql11, (err, results) => {
        if (err) {
            return res.status(500).send({ status: 1, msg: err.message })
        }
        else {
            // 去除RowDataPacket
            var dataString = JSON.stringify(results);
            var data = JSON.parse(dataString);
            req.app.locals.lookcanteen11 = { data };
            return res.send(data);

        }
    })

}
// 删除菜品
exports.delfood = (req, res) => {
    const sql = 'delete from food where ?';
    db.query(sql, { name: req.body.name }, (err, results) => {
        if (err) {
            return res.status(500).send({ status: 1, msg: err.message })
        }
        else {
            const sql11 = 'select * from food';
            db.query(sql11, (err, results) => {
                if (err) {
                    return res.status(500).send({ status: 1, msg: err.message })
                }
                else {
                    // 去除RowDataPacket
                    var dataString = JSON.stringify(results);
                    var data = JSON.parse(dataString);
                    req.app.locals.lookcanteen11 = { data };
                    return res.send('删除成功')

                }
            })
        }
    })
}
// 编辑菜品
exports.doeditfood = (req, res) => {
    var { name, type, price, id } = req.body
    req.app.locals.editfood = { name, type, price, id }
    return res.send(req.app.locals.editfood)
}
// 提交编辑数据
exports.toeditfood = (req, res) => {
    const { name, type, price, id } = req.body;
    const sql = 'update food set ?' + 'where id=' + id;
    db.query(sql, { name: name, price: price, type: type }, (err, results) => {
        if (err) {
            return res.status(500).send({ status: 1, msg: err.message })
        }
        else if (results.affectedRows != 1) {
            return res.status(500).send('修改失败')
        }
        else if (results.affectedRows == 1) {
            return res.send('修改成功')
        }
    })
}
// 增加菜品
exports.addfood = (req, res) => {
    const { name, price, type } = req.body;
    const sql = 'insert into food set ?';
    db.query(sql, { name: name, price: price, type: type }, (err, results) => {
        if (err) {
            return res.status(500).send({ status: 1, msg: err.message })
        }
        else if (results.affectedRows != 1) {
            return res.status(500).send('添加失败')
        }
        else if (results.affectedRows == 1) {
            return res.send('添加成功')
        }
    })
}


// 今日份小面
exports.dolooknoddle = (req, res) => {
    const sql11 = 'select * from noddle';
    db.query(sql11, (err, results) => {
        if (err) {
            return res.status(500).send({ status: 1, msg: err.message })
        }
        else {
            // 去除RowDataPacket
            var dataString = JSON.stringify(results);
            var data = JSON.parse(dataString);
            req.app.locals.looknoddle = { data };
            return res.send(data);

        }
    })
}
// 编辑菜品
exports.doeditnoddle = (req, res) => {
    var { name, type, price, id } = req.body
    req.app.locals.editnoddle = { name, type, price, id }
    return res.send('')
}
// 提交编辑数据
exports.toeditnoddle = (req, res) => {
    const { name, type, price, id } = req.body;
    const sql = 'update noddle set ?' + 'where id=' + id;
    db.query(sql, { name: name, price: price, type: type }, (err, results) => {
        if (err) {
            return res.status(500).send({ status: 1, msg: err.message })
        }
        else if (results.affectedRows != 1) {
            return res.status(500).send('修改失败')
        }
        else if (results.affectedRows == 1) {
            return res.send('修改成功')
        }
    })
}
// 增加菜品
exports.doaddnoddle = (req, res) => {
    const { name, price, type } = req.body;
    const sql = 'insert into noddle set ?';
    db.query(sql, { name: name, price: price, type: type }, (err, results) => {
        if (err) {
            return res.status(500).send({ status: 1, msg: err.message })
        }
        else if (results.affectedRows != 1) {
            return res.status(500).send('添加失败')
        }
        else if (results.affectedRows == 1) {
            return res.send('添加成功')
        }
    })
}
// 删除菜品
exports.delnoddle = (req, res) => {
    const sql = 'delete from noddle where ?';
    db.query(sql, { name: req.body.name }, (err, results) => {
        if (err) {
            return res.status(500).send({ status: 1, msg: err.message })
        }
        else {
            const sql11 = 'select * from noddle';
            db.query(sql11, (err, results) => {
                if (err) {
                    return res.status(500).send({ status: 1, msg: err.message })
                }
                else {
                    // 去除RowDataPacket
                    var dataString = JSON.stringify(results);
                    var data = JSON.parse(dataString);
                    req.app.locals.looknoddle = { data };
                    return res.send('删除成功')

                }
            })

        }
    })

}




// 主页
exports.index = (req, res) => {
    res.render('admin/index')
}
// 登录页面
exports.dologin = (req, res) => {
    res.render('admin/adminer')
}
// 修改密码页面
exports.adminEdit = (req, res) => {
    res.render('admin/adminEdit');
}
// 查看订单页面
exports.dolookOrder = (req, res) => {
    res.render('admin/lookOrder')
}
// 已完成订单页面
exports.dolookOff = (req, res) => {
    res.render('admin/lookoff')
}
// 查看来信页面
exports.lookLetter = (req, res) => {
    res.render('admin/lookLetter')
}
// 查看隆江猪脚饭页面
exports.lookcanteen11 = (req, res) => {
    res.render('admin/lookcanteen11')
}
// 编辑菜品页面
exports.editfood = (req, res) => {
    res.render('admin/editfood')
}
// 增加菜品页面
exports.doaddfood = (req, res) => {
    res.render('admin/addfood')
}


// 查看今日份小面页面
exports.looknoddle = (req, res) => {
    return res.render('admin/looknoddle')
}
// 编辑菜品页面
exports.editnoddle = (req, res) => {
    res.render('admin/editnoddle')
}
// 增加菜品页面
exports.addnoddle = (req, res) => {
    res.render('admin/addnoddle')
}