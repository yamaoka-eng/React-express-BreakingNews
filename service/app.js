require('babel-register') // 导入babel模块，及可使用import功能

import express from 'express' // 导入express框架
import cors from 'cors' // 导入跨域中间件包
import joi from 'joi' // 导入定义验证规则包

import userRouter from './router/user' // 导入路由模块

const app = express() // 返回一个app实列

app.use((req,res,next)=>{console.log('服务器被访问');next()})

app.use(cors()) // 配置跨域中间件
app.use(express.urlencoded({ extended: false })) // 配置解析application/x-www-form-urlencoded 格式的表单数据中间件
app.use((req,res,next)=>{
  res.cc = (err) => res.send({ status: 1, msg: (err instanceof Error ? err.message : err) }) //在res对象挂载封装响应错误属性
  next()
})

app.use('/api', userRouter)

app.use((err, req, res, next)=>{
  if (err instanceof joi.ValidationError) return res.cc(err) // 判断错误对象是否为joi校验规则错误对象
  return err
}) // 配置错误中间件

app.listen(7777, ()=>{
  console.log('localhost:7777 server start')
})