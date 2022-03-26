import db from "../db"
import bcryptjs from "bcryptjs" // 导入密码加密模块

const sqlQueUserStr = 'select id, username, nickname, email, user_pic from ev_users where id=?'
const sqlQuePwStr = 'select password from ev_users where id=?'
const sqlUpdStr = 'update ev_users set ? where id=?'

export const getUserinfo = (req, res) => {
  db.query(sqlQueUserStr, req.user.id, (err, results) => {
    if(err) return res.cc(err)
    if (results.length === 0) return res.cc('the id is not found in database')
    res.ok('get userinfo succeed',{ data: results[0] })
  })
}

export const updateUserinfo = (req, res) => {
  db.query(sqlUpdStr,[ req.body, req.user.id ], (err, results) => {
    if(err) return res.cc(err)
    if(results.affectedRows !== 1) return res.cc('update userinfo failed')
    res.ok('update userinfo succeed')
  })
}

export const changePassword = (req, res) => {
  db.query(sqlQuePwStr, req.user.id , (err, results) => {
    if(err) return res.cc(err)
    if (!bcryptjs.compareSync(req.body.oldPwd, results[0].password)) return res.cc('old password is wrong')
    const password = bcryptjs.hashSync(req.body.newPwd, 10) // 对用户密码进行加密
    console.log(password)
    db.query(sqlUpdStr, [ { password }, req.user.id ], (err, results)=>{
      if(err) return res.cc(err)
      if(results.affectedRows !== 1) return res.cc('change password failed')
      res.ok('password change succeed')
    })
  })
}

export const updateAvatar = (req, res) => {
  db.query(sqlUpdStr, [ { user_pic: req.body.avatar }, req.user.id ], (err, results)=>{
    if(err) return res.cc(err)
    if(results.affectedRows !== 1) return res.cc('update avatar failed')
    res.ok('update avatar succeed')
  })
}
