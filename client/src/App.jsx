import { Routes, Route } from 'react-router-dom'

import { lazyLoad } from './utils'

const Login = () => import('./pages/Login')

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={lazyLoad(Login)}/>
      </Routes>
    </div>
  )
}

export default App
