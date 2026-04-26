import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function RootLayout(){
  const uname = localStorage.getItem("username");
  const[userName,setUserName]=useState();
  useEffect(()=>{
    setUserName(uname);
  },[])
  return (
    <div className='min-h-screen bg-gray-50'>
        <Navbar/>
        <div className='p-6'>
        <Outlet/>
        </div> 
        {
          uname?
          <></>:<Footer/>
        }
    </div>
  )
}

export default RootLayout