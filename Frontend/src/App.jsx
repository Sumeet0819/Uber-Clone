import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignUp'
import CaptianLogin from './pages/CaptianLogin'
import CaptianSignUp from './pages/CaptianSignUp'
import Start from './pages/Start'

const App = () => {
  return (
    <div >
      <Routes>
        <Route path='/home' element={<Home/>} />
        <Route path='/' element={<Start   />}/>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/signup' element={<UserSignUp/>}/>
        <Route path='/captian-login' element={<CaptianLogin/>}/>
        <Route path='/captian-signup' element={<CaptianSignUp/>}/>
      </Routes>
    </div>
  )
}

export default App
