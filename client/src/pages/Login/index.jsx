import React from 'react'
import { ShakeTitile, LoginCard } from '../../components'

import { PrestrainImg } from '../../utils'

const Login = () => {

  const time = 2500

  return (
    <div className='login'>
      <ShakeTitile title='BreakingNews' time={time}/>
      <LoginCard time={time}/>
    </div>
  )
}

export default Login
