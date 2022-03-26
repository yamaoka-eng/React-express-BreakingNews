import express from "express"
import expressJoi from '@escook/express-joi'

import { add_cates_schema, delete_cate_schema } from "../schema/user"
import { getArtCates, addArtCates, deleteArtCates } from "../router_handler/artcate"

const artcateRouter = express.Router()

artcateRouter.get('/cates',getArtCates)

artcateRouter.post('/addcates', expressJoi(add_cates_schema), addArtCates)

artcateRouter.post('/deletecates/:id', expressJoi(delete_cate_schema), deleteArtCates)

export default artcateRouter