require('babel-register')

import express from 'express'
import cors from 'cors'

// 导入路由模块
import userRouter from './router/user'

const app = express()

app.use((req,res,next)=>{console.log('服务器被访问');next()})

app.use(cors()) // 配置跨域中间件
app.use(express.urlencoded({ extended: false })) // 配置解析application/x-www-form-urlencoded 格式的表单数据中间件
app.use((req,res,next)=>{
  res.cc = (err) => res.send({ status: 1, msg: err }) //在res对象挂载封装响应错误属性
  next()
})

app.use('/api', userRouter)

app.listen(7777, ()=>{
  console.log('localhost:7777 server start');
})