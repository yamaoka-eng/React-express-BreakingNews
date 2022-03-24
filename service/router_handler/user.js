import bcryptjs from "bcryptjs" // 导入密码加密模块
import db from "../db"  // 导入数据库操作模块

const regUser = (req, res) => {
  var { username, password } = req.body
  const sqlQueStr = 'select + from ev_users where username=?' // 定义 sql 查询语句
  const sqlInsStr = 'insert into ev_users set ?' // 定义 sql 插入语句
  db.query(sqlQueStr, username, (err, results)=>{
    if (err) return res.cc(err) // 检查sql语句是否报错
    if (results.length > 0) return res.cc('the user name already exisits') // 检查是否有重名
    password = bcryptjs.hashSync(password, 10) // 对用户密码进行加密
    db.query(sqlInsStr, { username, password }, (err, results)=>{
      if(err) return res.cc(err)
      if(results.affectedRows !== 1) return res.cc('register is fail, please try again later') // 判断影响行数
      return res.send({ status: 0, msg:'register is succeed' })
    })
  })
}

const login = (req, res)=>{
  res.send('login is ok')
}

export { regUser, login }