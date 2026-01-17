import React, { useState } from 'react'
import { Loader2 } from 'lucide-react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
const Login = () => {

  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const verifyNumber = async () => {
    try {
      setLoading(true)

      if (mobile.length < 10) {
        alert("Number should upto 10 digits")
        return
      }

      sessionStorage.setItem("phone", mobile)

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/send-otp`, { phone: mobile })


      if (response.data.success) {
        navigate('/verify-otp')
      }


    } catch (error) {
      if (error.response.status === 404) {
        navigate('/register')
      } else {
        alert(`error from server : ${error.response.data.error}`)
      }
    } finally {
      setLoading(false)
    }
  }



  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ border: "2px solid black", padding: "20px", paddingTop: "0px", marginTop: "30px" }}>

        <div>
          <h1>Welcome to Login Page</h1>

        </div>

        <div>
          <label style={{ fontSize: "22px" }}>Enter Your Phone Number</label>
          <br />
          <input type="text"
            style={{ width: "300px", marginTop: "20px", height: "25px" }}
            value={mobile}
            min={10}
            max={10}
            placeholder='Enter your mobile number'
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>

        <div style={{ marginTop: "30px", justifyContent: 'center', display: "flex" }}>
          <button onClick={verifyNumber} disabled={loading || !mobile} style={{ borderRadius: "20px", fontSize: "18px", padding: "5px 20px 5px 20px", cursor: loading ? "not-allowed" : "pointer" }}>{loading ? (<Loader2 style={{ animation: "spin 1s linear infinite" }} />) : ("login")}</button>
        </div>

      </div>
    </div>
  )
}

export default Login
