require('babel-register') // 导入babel模块，及可使用import功能

import express from 'express' // 导入express框架
import cors from 'cors' // 导入跨域中间件包
import joi from 'joi' // 导入定义验证规则包
import expressJWT from 'express-jwt' // 导入token中间件

import { tokenKey } from './config' // 导入token的加密解密key
import userRouter from './router/user' // 导入路由模块
import userinfoRouter from './router/userinfo'
import artcateRouter from './router/artcate'

const app = express() // 返回一个app实列

app.use((req,res,next)=>{console.log('服务器被访问');next()})

app.use(cors()) // 配置跨域中间件
app.use(express.urlencoded({ extended: false })) // 配置解析application/x-www-form-urlencoded 格式的表单数据中间件
app.use((req,res,next)=>{
  res.cc = (status = 1, err) => res.send({ status, msg: (err instanceof Error ? err.message : err) }) //在res对象挂载封装响应错误属性
  res.ok = (msg, data) => res.send({ status: 0, msg, ...data}) //挂载成功响应属性
  next()
})

app.use(expressJWT({ secret: tokenKey , algorithms: ['HS256'] }).unless({ path: [/^\/api\/user/] })) // 配置验证token的中间件并指定api接口不需要身份验证

app.use('/api/user', userRouter)
app.use('/api/my', userinfoRouter)
app.use('/api/my/article', artcateRouter)

app.use((err, req, res, next)=>{
  if (err instanceof joi.ValidationError) return res.cc(err) // 判断错误对象是否为joi校验规则错误对象
  if (err.name === "UnauthorizedError") return res.cc('authentication failed') // 判断错误是否为身份验证错误
  return err
}) // 配置错误中间件

app.listen(7777, ()=>{
  console.log('localhost:7777 server start')
})