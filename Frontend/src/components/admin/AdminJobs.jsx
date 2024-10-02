import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/custom_hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";

function AdminJobs() {
  useGetAllAdminJobs();
  const [input,setInput]=new useState("");
    const navigate=new useNavigate()
   const dispatch=useDispatch()
    useEffect(()=>{
          dispatch(setSearchJobByText(input))
    },[input])
  return (
    <div>
      <Navbar />
      <div className="  max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input className="w-full" placeholder="Filter by name" onChange={(e)=>setInput(e.target.value)}/>
          <Button onClick={()=>navigate('/admin/jobs/create')}>New Jobs</Button>
        </div>
        <AdminJobsTable/>
      </div>
    </div>
  );
}

export default AdminJobs;
