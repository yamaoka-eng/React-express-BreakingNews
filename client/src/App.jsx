import { Routes, Route, Navigate } from 'react-router-dom'

import { lazyLoad, routerIntercept } from './utils'

const Login = () => import('./pages/Login')
const Home = () => import('./pages/home')

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/login' element={lazyLoad(Login)} />
        <Route path='/home' element={routerIntercept(lazyLoad(Home))} />
        <Route path="/" element={<Navigate to="/login"/>} />
      </Routes>
    </div>
  )
}

export default App
