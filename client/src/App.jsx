import { Routes, Route, Navigate } from 'react-router-dom'

import { lazyLoad, RouterIntercept } from './utils'

const Login = () => import('./pages/Login')
const Home = () => import('./pages/home')

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/login' element={lazyLoad(Login)} />
        <Route path='/home' element={<RouterIntercept Component={lazyLoad(Home)}/>} />
        <Route path="/" element={<Navigate to="/login"/>} />
      </Routes>
    </div>
  )
}

export default App
