import {Link, Outlet, NavLink} from 'react-router-dom'
import Sidebar from './Sidebar'

const Navbar = () => {
  return (
    
   <>
    <div className='navbar py-6 px-16 bg-white'>
   
    <NavLink id="login" to="/login">
            <a href="#" className='text-xl extra-bold'>SHIPMENT DASHBOARD</a>
            </NavLink>

    </div>
    <Outlet/>
    </>
   
  )

}

export default Navbar