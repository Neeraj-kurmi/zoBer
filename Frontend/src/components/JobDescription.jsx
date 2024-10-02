import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constants";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function JobDescription() {
    const dispatch=useDispatch();
    const params=useParams();
    const {singleJob}=useSelector(store=>store.job)
    const jobId=params.id;
    const {user}=useSelector(store=>store.auth)
    const isInitiallyApplied=singleJob?.applications?.some(application=>application.applicant==user?._id)||false
    const [isApplied,setApplied]=useState(isInitiallyApplied)
    
    const applyJobHandler =async()=>{
        try {
            const res=await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`,{withCredentials:true})
            if(res.data.success){
              setApplied(true)
              const updateSingleJob={...singleJob,applications:[...singleJob.applications,{applicant:user?._id}]}
              dispatch(setSingleJob(updateSingleJob))
              toast.success.data.massage
            }
        } catch (error) {
          console.log(error)
          toast.error(error.data.massage)
        }
    }

    useEffect(()=>{
      const fetchSingleJobs=async()=>{
          try {
              const res=await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true})
              if(res.data.success){
  
                     dispatch(setSingleJob(res.data.job))
                     const is=res.data.job.applications.some(application=>application.applicant==user?._id)
                     setApplied(is)
              }
          } catch (error) {
              console.log(error)
          }
      }
      fetchSingleJobs();
    },[jobId,dispatch,user?._id])

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl ">{singleJob?.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className={"text-blue-700 font-bold"} variant={"ghost"}>
            {singleJob?.positions}
            </Badge>
            <Badge className={"text-[#F83002] font-bold"} variant={"ghost"}>
            {singleJob?.jobType}
            </Badge>
            <Badge className={"text-[#6A3BC2] font-bold"} variant={"ghost"}>
            {singleJob?.salary}
            </Badge>
          </div>
        </div>
        <Button onClick={isApplied ? null:applyJobHandler} disabled={isApplied} className={`rounded-lg ${isApplied?'bg-gray-600 cursor-not-allowed' :'bg-[#6A3BC2] hover:bg-[#8d63da]'}`}>
        {
            isApplied?'Already Applied':'Apply Now'
        }
        </Button>
      </div>
      <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Descrption</h1>
      <div className="my-4">
          <h1 className="font-bold my-1">Role:<span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
          <h1 className="font-bold my-1">Location:<span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
          <h1 className="font-bold my-1">Description:<span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
          <h1 className="font-bold my-1">Experience:<span className='pl-4 font-normal text-gray-800'>{singleJob?.experience}</span></h1>
          <h1 className="font-bold my-1">Salary:<span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}</span></h1>
          <h1 className="font-bold my-1">Total Applicant:<span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
          <h1 className="font-bold my-1">Posted Date:<span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
      </div>
    </div>
  );
}

export default JobDescription;
