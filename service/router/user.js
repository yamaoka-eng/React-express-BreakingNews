import express from 'express'
import { regUser, login } from '../router_handler/user'

const router = express.Router()

router.post('/register', regUser)

router.post('/login', login)

export default router