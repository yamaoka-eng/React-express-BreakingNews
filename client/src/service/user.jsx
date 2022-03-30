import { request } from "../utils/requst"

export const postLogin = (username, password) => request({
  url: '/user/login',
  method: 'post',
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  data: {
    username,
    password
  }
})