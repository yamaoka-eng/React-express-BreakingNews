import joi from 'joi' // 导入定义验证规则的包

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含a-zA-Z0-9
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项, 不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 * integer() 整数
 * email()
 * not(joi.ref('选择同对象中键名')) 表示于同对象中指定键名值不能相同
 * concat(变量) 合并验证规则
 * dataUri() base64格式
 */

// user regist login
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required() //字符串 6-12位密码无空格 不为空

// user update
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

const imgReq = joi.string().dataUri().required()
const img = joi.string().dataUri()

const string = joi.string().required()
const alias = joi.string().alphanum().required()

const time = joi.string().pattern(/^[0-9\-]+$/).required()
const state = joi.string().required()

const reg_login_schema = {
  body: {
    username,
    password
  }
}

const update_userinfo_schema = {
  body: {
    nickname,
    email
  }
}

const change_password_schema = {
  body: {
    oldPwd: password,
    newPwd: joi.not(joi.ref('oldPwd')).concat(password) // 于同级中oldPwd不一致，且合并验证规则
  }
}

const update_avatar_schema = {
  body: {
    avatar: imgReq
  }
}

const add_cates_schema = {
  body: {
    string,
    alias
  }
}

const delete_cate_schema = {
  params: {
    id
  }
}

const article_schema = {
  body: {
    title: string,
    content: string,
    cover_img: img,
    pub_date: time,
    state,
    cate_id: id,
    // author_id: id
  }
}

const delete_article_schema = {
  params: {
    id
  }
}

export {
  reg_login_schema,
  update_userinfo_schema,
  change_password_schema,
  update_avatar_schema,
  add_cates_schema,
  delete_cate_schema,
  article_schema,
  delete_article_schema
}
