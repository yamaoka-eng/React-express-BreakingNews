import express from 'express'
import { regUser, login } from '../router_handler/user'
import expressJoi from '@escook/express-joi' // 导入处理joi定义验证规则中间件函数
import reg_login_schema from "../schema/user"

const router = express.Router() // 返回一个路由实列

router.post('/register', expressJoi(reg_login_schema), regUser)

router.post('/login', login)

export default router