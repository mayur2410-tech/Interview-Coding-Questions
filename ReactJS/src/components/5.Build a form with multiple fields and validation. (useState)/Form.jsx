import React from 'react'
import "./Form.css";   // external css

const Form = () => {
  return (
    <div className="form-container">
      <form className="form-box">

        <div className="form-group">
          <label>First Name:</label>
          <input type="text" />
        </div>

        <div className="form-group">
          <label>Last Name:</label>
          <input type="text" />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" />
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <div className="radio-group">
            <label><input type="radio" name="gender" /> Male</label>
            <label><input type="radio" name="gender" /> Female</label>
            <label><input type="radio" name="gender" /> Other</label>
          </div>
        </div>

        <div className="form-group">
          <label>Age:</label>
          <input type="number" />
        </div>

        <div className="form-group">
          <label>Address:</label>
          <input type="text" />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input type="password" />
        </div>

        <div className="form-group">
          <label>Confirm Password:</label>
          <input type="password" />
        </div>

        <button className="submit-btn" type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Form
