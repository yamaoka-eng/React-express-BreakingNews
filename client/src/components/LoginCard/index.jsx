import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import Message from '../Message'
import { postLogin, postRegister } from '../../service/user' 
import './index.scss'

const LoginCard = ({ time }) => {

  const [ sildeIn, SetSildeIn ] = useState(false)
  const [ sign, setSign ] = useState(false)

  const loginEl = useRef(null)
  const registerEl = useRef(null)

  const history = useNavigate()

  const usernameReg = /^(?!\D+$)(?![^0-9a-zA-Z]+$)/
  const emailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/

  const login = () => {
    const username = loginEl.current['0'].value.trim()
    const password = loginEl.current['1'].value.trim()

    if (!username) return Message.onError('请输入用户名')
    if (!password) return Message.onError('请输入密码')
    if (username.length > 10) return Message.onError('用户名长度不应超过10位')
    if (password.length < 6 || password.length > 12) return Message.onError('密码应在6-12位之间')
    if (!usernameReg.test(username)) return Message.onError('用户名中请勿输入特殊标点符号')

    postLogin(username, password).then(res => {
      const status = res.data.status
      if (status === 0) {
        localStorage.setItem('token',res.data.token)
        history('/home')
        Message.onSuccess('登录成功')
      } else if (status === 1) {
        Message.onError('用户名不存在')
      } else if (status === 2) {
        Message.onError('密码错误')
      } else {
        Message.onError('登录失败')
      }
    })
  }

  const register = () => {
    const username = registerEl.current['0'].value.trim()
    const email = registerEl.current['1'].value.trim()
    const password = registerEl.current['2'].value.trim()

    if (!username) return Message.onError('请输入用户名')
    if (!password) return Message.onError('请输入密码')
    if (username.length > 10) return Message.onError('用户名长度不应超过10位')
    if (password.length < 6 || password.length > 12) return Message.onError('密码应在6-12位之间')
    if (email) if (!emailReg.test(email)) return Message.onError('请输入正确的邮箱')

    postRegister(username, email, password).then(res => {
      const status = res.data.status
      if (status === 0) {
        Message.onSuccess('注册成功')
      } else if (status === 1) {
        if (status === 1)  return Message.onError('用户名已存在')
      } else {
        Message.onError('注册失败')
      }
    })

  }

  useEffect(()=> setTimeout(() => {
    SetSildeIn(true)
  }, time), [])

  return (
    <div className={`
      logn-card
      ${sildeIn ? 'block' : 'hidden'}
      ${sildeIn && 'md:animate-slide-in-right-y50 animate-slide-in-right block'}
    `}>
      <div className={`slide-container
        ${sign ? 'md:translate-x-full md:translate-y-0 translate-y-full' : 'md:translate-x-0 md:translate-y-0 translate-y-0'}
      `}>
        <form className={`slide-container-form transition-all duration-500
          ${sign ? 'logn-show z-20 opacity-1' : 'z-0 opacity-0'}
        `} ref={registerEl}>
            <h1 className='logn-h1'>创建你的账户</h1>
            <span>邮箱可选</span>
            <input className='slide-ct-form-input' type="text" placeholder="Name" />
            <input className='slide-ct-form-input' type="email" placeholder="Email" />
            <input className='slide-ct-form-input' type="password" placeholder="Password" />
            <div className='form-btn' onClick={register}>注册</div>
        </form>
        <form className='slide-container-form z-10' ref={loginEl}>
          <h1 className='logn-h1'>Sign UP</h1>
          <span>请输入您的账户</span>
          <input className='slide-ct-form-input' type="username" placeholder="Username" />
          <input className='slide-ct-form-input' type="password" placeholder="Password" />
          <a href="#">忘记密码?</a>
          <div className='form-btn' onClick={login}>登录</div>
        </form>
      </div>
      <div className={`slide-container z-20
        ${sign ? 'md:translate-x-0 md:translate-y-0 translate-y-0' : 'md:translate-x-full md:translate-y-0 translate-y-full'}
      `}>
        <div className={`slide-box-container
          ${sign ? 'md:translate-x-1/2 md:translate-y-0 translate-y-1/2' : 'md:translate-x-0 md:translate-y-0 translate-y-0'}
        `}>
          <div className={`slide-box
            ${sign ? 'md:translate-x-0 md:translate-y-0 translate-y-0' : 'md:-translate-x-1/3 md:translate-y-0 -translate-y-1/3'}
          `}>
              <h1 className='logn-h1'>Welcome Back!</h1>
              <p className='my-8'>
                  已有账户请点击下方按钮
              </p>
              <button className="transparency-btn" onClick={()=>setSign(false)}>去登录</button>
          </div>
          <div className={`slide-box
            ${sign ? 'md:translate-x-1/3 md:translate-y-0 translate-y-1/3' : 'md:translate-x-0 md:translate-y-0 translate-y-0' }
          `}>
              <h1 className='logn-h1'>Hello, Friend!</h1>
              <p className='my-8'>如没有账户点击下方按钮注册</p>
              <button className="transparency-btn" onClick={()=>setSign(true)}>去注册</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginCard