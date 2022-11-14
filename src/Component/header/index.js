import React from 'react'
import { NavLink } from 'react-router-dom'
import '../../App.css'
const Header = () => {
    const NavItem=[{name:"Home",link:"#"},{name:"Promotors",link:"#"},{name:"Property Agents",link:"#"},{name:"About",link:"#"},{name:"Contactus",link:"#"}]
  return (
    <div className='flex items-center  justify-between p-5 bg-blue-300  '><h5>Real Estate</h5>

     <div className='flex items-center gap-4 '>{NavItem.map((Nav,k)=>(
    <NavLink key={k} to={Nav.link}>
     {Nav.name}
    </NavLink>

     ))}</div>
    
    </div>
  )
}

export default Header;