import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategaryCarausel from './CategaryCarausel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetAllJobs from '@/custom_hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Home() {
  useGetAllJobs();
  const navigate=useNavigate();
  const {user}=useSelector(store=>store.auth);
  useEffect(()=>{
    if(user?.role=='recruiter')
      navigate("/admin/companies")
  },[])
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <CategaryCarausel/>
        <LatestJobs/>
        <Footer/>
    </div>   
  )
}

export default Home