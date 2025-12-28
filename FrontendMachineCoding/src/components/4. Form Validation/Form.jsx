import React from 'react'
import { useState } from 'react'

const Form = () => {

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const[showPass,setShowPass]=useState(false)
    const[succ,setSucc]=useState(false)
    const [error, setError] = useState({
        email: "",
        pass: ""
    })

    function validateForm() {
        console.log('validate function called')
        let  isValid = true
        let newError ={email:"",pass:""}                                            //usign regex  
        if(!email.includes("@")){                                                   //const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            newError.email = "Invalid Email address"                                    //if (!emailRegex.test(email)) {

            isValid=false
        }

        if(pass.length < 6){
            newError.pass="length should greater than 6 "
            isValid = false
        }else if(!validatePassword(pass)){
                newError.pass = "Password must have 1 uppercase, 1 lowercase, 1 number & 1 special char"
                isValid=false
        }
       

        setError(newError);
        
        return isValid;

    }

    function validatePassword(pass){
    
        let hasUpper = false
        let hasLower = false
        let hasNumber = false
        let hasSymbol = false
       
        for(let char of pass){
            if(char>='A' && char<='Z')  hasUpper = true
            else if(char>='a' && char<='z')   hasLower = true
            else if (char>='0' && char<="9")   hasNumber = true
            else{
                hasSymbol = true
            }
        }

        return hasLower && hasUpper && hasNumber && hasSymbol
    }

    function handleSubmit(e) {
        e.preventDefault()
        // console.log('validate function',validateForm())
        if (validateForm()) {
            console.log("Form Submit succesfully", { email }, { pass })
            setSucc(true)
            setEmail("")
            setPass('')
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: "column" }}>
            <h1>Form Validation</h1>

            <div style={{ border: "2px solid black", display: "flex", flexDirection: 'column' }}>
                <h2 style={{ textAlign: "center" }}>Login Form</h2>

                {succ && <span style={{color:'green',textAlign:'center'}}>Form Submit Successfully</span>}
                <form
                    onSubmit={handleSubmit}

                    style={{ padding: "20px" }}>
                    <label style={{ fontFamily: "bold", fontSize: "18px" }}>Email :</label>
                    <input type="text"
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value);setSucc(false)}}
                        placeholder='Enter your email'
                    />
                    <br />
                    {error.email && <span style={{color:'red'}}>{error.email}</span>}
                    <div style={{ marginTop: "10px" }}>

                        <label style={{ fontFamily: "bold", fontSize: "18px" }}>Password :</label>
                        <input type={showPass ? "text" : "password"}
                        value={pass}
                        onChange={(e)=>setPass(e.target.value)}
                            placeholder='Enter your password'
                        />
                        <button type='button' onClick={()=>setShowPass(!showPass)}>{showPass? "Hide":"Show"}</button>
                     {error.pass && <span style={{color:'red'}}>{error.pass}</span>}

                    </div>
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Form
