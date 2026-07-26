import {createContext, useState } from "react"
import { toast } from "react-toastify"
import axios from "axios"
export const DoctorContext=createContext()

const  DoctorContextProvider=(props)=>{

  const [dToken,setDToken]=useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'')
  const backend_url=import.meta.env.VITE_BACKEND_URL
  const [appointments,setAppointments]=useState([])
  const [dashData,setDashData]=useState(false)
  const [profileData,setProfileData]=useState(false)


  const getAppointments=async()=>{
    try {
      const {data}=await axios.get(backend_url+'/api/doctor/appointments',{headers:{dToken}})

      if(data.success){
         setAppointments(data.appointments)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
      
    }
  }

  const completeAppointment=async(appointmentId)=>{
    try {
      const {data}=await axios.post(backend_url+'/api/doctor/complete-appointment',{appointmentId},{headers:{dToken}})
      if(data.success){
        toast.success(data.message)
        getAppointments()
        getDashData()
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }
  }

  
  const cancleAppointment=async(appointmentId)=>{
    try {
      const {data}=await axios.post(backend_url+'/api/doctor/cancle-appointment',{appointmentId},{headers:{dToken}})
      if(data.success){
        toast.success(data.message)
        getAppointments()
        getDashData()
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }
  }

  const getDashData=async()=>{
    try {
      const {data}=await axios.get(backend_url+'/api/doctor/dashboard',{headers:{dToken}})

      if(data.success){
        setDashData(data.dashData)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
      
    }
  }

  const getProfileData=async()=>{
    try {
      const {data}=await axios.get(backend_url+'/api/doctor/profile',{headers:{dToken}})

      if(data.success){
         setProfileData(data.profileData)
        
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
      
    }
  }
   


    const value={
      dToken,
      setDToken,
      backend_url,
      appointments,setAppointments,getAppointments,
      cancleAppointment,
      completeAppointment,
      dashData,setDashData,getDashData,
      profileData,setProfileData,getProfileData,
    }

    return (
      <DoctorContext.Provider value={value}>
        {props.children}

      </DoctorContext.Provider>
    )



}

export default DoctorContextProvider