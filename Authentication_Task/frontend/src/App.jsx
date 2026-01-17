import React from 'react'
import {Router,Routes,Route, BrowserRouter} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import VerifyOtp from './components/VerifyOtp'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
