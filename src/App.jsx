import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route,Routes } from 'react-router-dom';
import AddDoctor from './pages/Admin/AddDoctor';
import AllAppointments from './pages/Admin/AllAppointments';
import Dashboard from './pages/Admin/Dashboard';
import DoctorList from './pages/Admin/DoctorList';
import RequestDashboard from './pages/Admin/RequestDashboard';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorProfile from './pages/Doctor/DoctorProfile';

const App = () => {

  const {aToken}=useContext(AdminContext)
  const {dToken}=useContext(DoctorContext)
 
  return aToken || dToken ? (
    <div className='bg-[#f8f9fD]'>
        <ToastContainer/>
        <Navbar/>
        <div className='flex items-start'>
        <Sidebar/>
        <Routes>
          {/*Admin Routes*/}
          <Route path='/' element={<></>} />
          <Route path='/add-doctor' element={<AddDoctor/>} />
          <Route path='/all-appoinments' element={<AllAppointments/>} />
          <Route path='/admin-dashboard' element={<Dashboard/>} />
          <Route path='/doctor-list' element={<DoctorList/>} />
          <Route path='/metrics-dashboard' element={<RequestDashboard/>} />

            {/*Doctor Routes*/}
            <Route path='/doctor-dashboard' element={<DoctorDashboard/>} />
            <Route path='/doctor-appointments' element={<DoctorAppointments/>} />
            <Route path='/doctor-profile' element={<DoctorProfile/>} />

        </Routes>
        </div>
    </div>
  ):(
    <>
      <Login/>
      <ToastContainer/>

    </>
  )
}

export default App

