import React from 'react'
import StatisticsSVG from '../imgs/statistics.svg'
import { Icon } from '@iconify/react';
import {Link,NavLink} from 'react-router-dom'
import LoginPage from '../Pages/Login Page/LoginPage';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const Sidebar = () => {
  const {logout} = useContext(AuthContext)
  return (
    <div className='w-96  gray flex flex-col gap-3 pt-4'>
        <div className=''>
        <NavLink id="home" to="/home" className={({ isActive }) =>
              isActive ? 'text-black' : 'hover:text-gray-500'
            }>
            <a href="#" className='flex items-center gap-4 py-2'>
            <Icon icon="system-uicons:graph-box" width="25" height="25" />            <h2 className='text-sm medium'>Statistics</h2>
            </a>
            </NavLink>
        </div>

        <div className=''>
        <NavLink id="orders" to="/orders-management" className={({ isActive }) =>
              isActive ? 'text-black' : 'hover:text-gray-500'
            }>
            <a href="#" className='flex items-center gap-4 py-2'>
            <Icon icon="system-uicons:boxes" width="25" height="25" />
            <h2 className='text-sm medium'>Orders Management</h2>
            </a>
        </NavLink>
        </div>

        <div className=''>
        <NavLink id="customers" to="/customers-management" className={({ isActive }) =>
              isActive ? 'text-black' : 'hover:text-gray-500'
            }>
            <a href="#" className='flex items-center gap-4 py-2'>
            <Icon icon="system-uicons:user-male-circle" width="25" height="25" />
            <h2 className='text-sm medium'>Customers Management</h2>
            </a>
            </NavLink>
        </div>

        <div className=''>
        <NavLink className={({ isActive }) =>
              isActive ? 'text-black' : 'hover:text-gray-500'
            } id="users" to="/users-management">
            <a href="#" className='flex items-center gap-4 py-2'>
            <Icon icon="system-uicons:users" width="25" height="25" />
            <h2 className='text-sm medium'>Users Management</h2>
            </a>
        </NavLink>
        </div>


        <div className=''>
            <NavLink id="logout" to="/" onClick={logout}>
            <a href="#" className='flex items-center gap-4 py-2 hover:text-red-500'>
            <Icon icon="system-uicons:enter-alt"  width="25" height="25" />
            <h2 className='text-sm medium'>Logout</h2>
            </a>
            </NavLink>
        </div>
        

        
    </div>
  )
}

export default Sidebar