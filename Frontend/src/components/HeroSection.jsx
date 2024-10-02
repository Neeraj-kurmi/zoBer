import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
  const [query,setQuery]=useState("");
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const searchJobHandler =()=>{
    dispatch(setSearchQuery(query))
    navigate("/browse")
  }
  
  return (
    <div className='text-center'> 
       <div className='flex flex-col gap-5 my-10'>
         <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>
         <h1 className='text-5xl font-bold'>Search ,Apply & <hr/>Get your <span className='text-[#6A3BC2]'>Dream Job...</span></h1>
       </div>
       <p className='text-gray-900'>A Trustable Site , Best Environment , Quality Content , Trustable Clients</p>
       <div className='flex w-[40%] shadow-lg border border-green-200 pl-3 rounded-full items-center gap-4 mx-auto my-4'>
        <input
            type='text'
            placeholder='Find your Dream Job'
            onChange={(e)=>setQuery(e.target.value)}
            className='outline-none boorder-none w-full'
        />
        <Button onClick={searchJobHandler}className="rounded-r-full bg-[#6A38C2]">
           <Search className='h-5 w-5' />
        </Button>
       </div>
    </div>
  )
}

export default HeroSection