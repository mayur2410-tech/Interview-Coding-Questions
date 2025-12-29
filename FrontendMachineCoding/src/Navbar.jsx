import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <div style={{display:"flex",border:"2px solid black ",height:"60px",alignItems:"center", justifyContent:'space-around'}}>
        <li><Link to='/counter'>Counter</Link></li>
        <li><Link to='/todo'>Todo</Link></li>
        <li><Link to='/search'>Search UI</Link></li>
        <li><Link to='/form'>Form Validation</Link></li>
        <li><Link to='/tabs'>Tabs</Link></li>
        <li><Link to='/theme'>Theme</Link></li>
      </div>
    </div>
  )
}

export default Navbar
