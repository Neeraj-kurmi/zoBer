import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/custom_hooks/useGetAllJobs';

function Browse() {
  useGetAllJobs()
  const {allJobs}=useSelector(store=>store.job)
  const dispatch=useDispatch()
  useEffect(()=>{
     return ()=>{
          dispatch(setSearchQuery(""))
     }
  },[])
  return (
    <div>
      <Navbar/>
      <div className='max-w-7xl mx-auto my-10'>
        <h1 className='font-bold text-xl my-10 '>Seach Results {allJobs.length}</h1>
        <div className='grid md:grid-cols-3 gap-4 '>
        {
          allJobs.map((job)=>{
                return (
                    <Job key={job._id} job={job}/>
                )
            })
        }  
        </div>
        
      </div>
    </div>
  )
}

export default Browse