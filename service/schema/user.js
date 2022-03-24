import joi from 'joi' // 导入定义验证规则的包

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含a-zA-Z0-9
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项, 不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required() //字符串 6-12位密码无空格 不为空

const reg_login_schema = { 
  body: {
    username,
    password
  }
}

export default reg_login_schema
