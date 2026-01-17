import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const mobile = sessionStorage.getItem("phone")


  useEffect(() => {
    if (!mobile) {
      navigate('/')
      return
    }
  }, [])


  const generateOtp = async ()=>{

    try{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/send-otp`, { phone: mobile })
       if (response.data.success) {
        navigate('/verify-otp')
      }
    }
  catch(error){
    alert(error.message)
  }
  }

  const registerUser = async () => {
    try {
      setLoading(true)

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`,
        {
          name,
          email,
          phone: mobile
        }
      )

      if (response.data.success) {
       await generateOtp()
      }

    } catch (error) {
      alert(`error from server : ${error.response.data.error}`)
    } finally {
      setLoading(false)
    }
  }


  const changeNumber = () => {
    sessionStorage.removeItem("phone")
    navigate('/')
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ border: "2px solid black", padding: "20px", paddingTop: "0px", marginTop: "30px" }}>

        <div style={{ alignItems: "center", justifyContent: "center", display: "flex" }}>
          <h1>Registration From</h1>
        </div>

        <div>
          <label style={{ fontSize: "22px" }}>Enter Your Name</label>
          <br />
          <input type="text"
            style={{ width: "300px", marginTop: "10px", height: "25px" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <label style={{ fontSize: "22px" }}>Enter Your Email</label>
          <br />
          <input type="email"
            style={{ width: "300px", marginTop: "10px", height: "25px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}

          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <label style={{ fontSize: "22px" }}>Enter Your Mobile Number</label>
          <br />
          <input type="text"
            value={mobile}
            style={{ width: "300px", marginTop: "10px", height: "25px" }}
            readOnly
          />
          <h4 style={{ textDecoration: "underline", cursor: "pointer" }} onClick={changeNumber}>Change Number</h4>
        </div>

        <div style={{ marginTop: "30px", justifyContent: 'center', display: "flex" }}>
          <button onClick={registerUser} disabled={loading || !email || !name} style={{ borderRadius: "20px", fontSize: "18px", padding: "5px 20px 5px 20px", cursor: loading ? "not-allowed" : "pointer" }}>{loading ? (<Loader2 style={{ animation: "spin 1s linear infinite" }} />) : ("Send Otp")}</button>
        </div>

      </div>
    </div>
  )
}

export default Register
