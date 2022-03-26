import bcryptjs from "bcryptjs" // 导入密码加密模块
import db from "../db"  // 导入数据库操作模块
import jsonwebtoken from "jsonwebtoken" // 导入生产token包

import { tokenKey, expiresIn } from "../config" // 导入 Token 加密解密密钥

const sqlQueStr = 'select * from ev_users where username=?' // 定义 sql 用户名查询语句
const sqlInsStr = 'insert into ev_users set ?' // 定义 sql 插入语句

const regUser = (req, res) => {
  var { username, password } = req.body
  db.query(sqlQueStr, username, (err, results)=>{
    if (err) return res.cc(err) // 检查sql语句是否报错
    if (results.length > 0) return res.cc('the user name already exisits') // 检查是否有重名
    password = bcryptjs.hashSync(password, 10) // 对用户密码进行加密
    db.query(sqlInsStr, { username, password }, (err, results)=>{
      if(err) return res.cc(err)
      if(results.affectedRows !== 1) return res.cc('register is fail, please try again later') // 判断影响行数
      return res.ok('register is succeed')
    })
  })
}

const login = (req, res)=>{
  var { username, password } = req.body 
  db.query(sqlQueStr, username, (err, results)=>{
    if (err) return res.cc(err)
    if (results.length === 0) return res.cc('the username does not exist')
    if (!bcryptjs.compareSync(password, results[0].password)) return res.cc('password is wrong') // 使用加密包对请求中的密码和数据库查询到的密码进行对比
    const user = { ...results[0], password: '', user_pic: '' }
    const tokenStr = jsonwebtoken.sign(user, tokenKey, { expiresIn })
    res.ok('login is succeed', {token: 'Bearer ' + tokenStr})
  })
}

export { regUser, login }