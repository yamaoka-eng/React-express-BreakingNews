import express from "express"
import expressJoi from '@escook/express-joi'

import { add_cates_schema, delete_cate_schema, article_schema, delete_article_schema } from "../schema/user"
import { getArtCates, addArtCates, deleteArtCates, addArticle, updateArticle, deleteArticle } from "../router_handler/artcate"

const artcateRouter = express.Router()

artcateRouter.get('/cates',getArtCates)

artcateRouter.post('/addcates', expressJoi(add_cates_schema), addArtCates)

artcateRouter.post('/deletecates/:id', expressJoi(delete_cate_schema), deleteArtCates)

artcateRouter.post('/add', expressJoi(article_schema), addArticle)

artcateRouter.post('/update', expressJoi(article_schema), updateArticle)

artcateRouter.post('/delete/:id', expressJoi(delete_article_schema), deleteArticle)

export default artcateRouter