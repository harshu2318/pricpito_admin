import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {
    const {aToken} =useContext(AdminContext)
    const {dToken} =useContext(DoctorContext)

  return (
    <div className='min-h-screen bg-white border-r'>
    {
        aToken && <ul className=' text-[#515151] mt-5'>
            <NavLink className={({isActive})=>`flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' :''}`} to={'/admin-dashboard'}>
                <img src={assets.home_icon} alt="" />
                <p className='hidden md:block'>Dashboard</p>
            </NavLink>

            <NavLink  className={({isActive})=>`flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' :''}`}  to={'/all-appoinments'}>
                <img src={assets.appointment_icon} alt="" />
                <p className='hidden md:block'>Appoinments</p>
            </NavLink>

            <NavLink  className={({isActive})=>`flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' :''}`}  to={'/add-doctor'}>
                <img src={assets.add_icon} alt="" />
                <p className='hidden md:block'>Add Doctor</p>
            </NavLink>

            <NavLink  className={({isActive})=>`flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' :''}`}  to={'/doctor-list'}>
                <img src={assets.list_icon} alt="" />
                <p className='hidden md:block'>Doctor List</p>
            </NavLink>

            <NavLink  className={({isActive})=>`flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' :''}`}  to={'/metrics-dashboard'}>
                <img className='w-5 h-5' src={assets.earning_icon} alt="" />
                <p className='hidden md:block'>Performance</p>
            </NavLink>
        </ul>
    }

{
        dToken && <ul className=' text-[#515151] mt-5'>
            <NavLink className={({isActive})=>`flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' :''}`} to={'/doctor-dashboard'}>
                <img src={assets.home_icon} alt="" />
                <p className='hidden md:block'>Dashboard</p>
            </NavLink>

            <NavLink  className={({isActive})=>`flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' :''}`}  to={'/doctor-appointments'}>
                <img src={assets.appointment_icon} alt="" />
                <p className='hidden md:block'>Appointments</p>
            </NavLink>

            <NavLink  className={({isActive})=>`flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' :''}`}  to={'/doctor-profile'}>
                <img src={assets.list_icon} alt="" />
                <p className='hidden md:block'>Profile</p>
            </NavLink>
        </ul>
    }
       
    </div>
  )
}

export default Sidebar
