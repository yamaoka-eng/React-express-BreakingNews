import express from "express"
import expressJoi from '@escook/express-joi'

import { getUserinfo, updateUserinfo, changePassword , updateAvatar} from "../router_handler/userinfo"
import { update_userinfo_schema, change_password_schema, update_avatar_schema } from "../schema/user"

const userinfoRouter = express.Router()

userinfoRouter.get('/userinfo', getUserinfo)

userinfoRouter.post('/userinfo', expressJoi(update_userinfo_schema), updateUserinfo)

userinfoRouter.post('/changepassword', expressJoi(change_password_schema), changePassword)

userinfoRouter.post('/update/avatar', expressJoi(update_avatar_schema), updateAvatar)

export default userinfoRouter