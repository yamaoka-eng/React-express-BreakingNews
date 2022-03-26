import express from 'express'
import { regUser, login } from '../router_handler/user'
import expressJoi from '@escook/express-joi' // 导入处理joi定义验证规则中间件函数
import { reg_login_schema } from "../schema/user"

const userRouter = express.Router() // 返回一个路由实列

userRouter.post('/register', expressJoi(reg_login_schema), regUser)

userRouter.post('/login', expressJoi(reg_login_schema), login)

export default userRouter