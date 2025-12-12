import React, { useState } from 'react'
import "./Form.css";   // external css

const Form = () => {
    const [form,setForm]=useState({
        firstName:"",
        lastName:"",
        email:"",
        gender:"",
        age:"",
        address:"",
        password:"",
        confirmPassword:""
    })

    const[error,setError]=useState({})

    function handleChange(e){
            const {name,value}=e.target;
            setForm({
                ...form,
                [name]:value                         // dynamic key property mean it take for example name=email then it set email:value
            })
    }

    function handleForm(e){
        e.preventDefault();
        let validationErrors = {}

        if(form.age && Number(form.age) < 0){
            validationErrors.age = "Age cannot be negative";
        }
        if(form.password !== form.confirmPassword){
            validationErrors.confirmPassword = "Passwords do not match";
            setError(validationErrors);
            return; // Stop form submission if passwords do not match
        }

        alert("Form submitted successfully!");
        // Reset form
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      age: "",
      address: "",
      password: "",
      confirmPassword: ""
    });

    }
  return (
    <div className="form-container">
      <form className="form-box" onSubmit={handleForm}>

        <div className="form-group">
          <label>First Name:</label>
          <input type="text"
          name='firstName'
          onChange={handleChange}
          value={form.firstName}
          />
        </div>

        <div className="form-group">
          <label>Last Name:</label>
          <input type="text" 
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" 
          name="email"
          value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <div className="radio-group">
            <label><input type="radio" name="gender" value="Male" onChange={handleChange} checked={form.gender === "Male"} /> Male</label>
            <label><input type="radio" name="gender" value="Female" onChange={handleChange} checked={form.gender === "Female"} /> Female</label>
            <label><input type="radio" name="gender" value="Other" onChange={handleChange} checked={form.gender === "Other"} /> Other</label>
          </div>
        </div>

        <div className="form-group">
          <label>Age:</label>
          <input type="number" name='age' value={form.age} onChange={handleChange} />
          {error.age && <span className="error">{error.age}</span>}
        </div>

        <div className="form-group">
          <label>Address:</label>
          <input type="text" name="address" value={form.address} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} />
          {error.confirmPassword && <span className="error">{error.confirmPassword}</span>}
        </div>

        <button className="submit-btn" type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Form
