import  { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminJobsTable() {
  const { allAdminJobs,searchJobByText} = useSelector((store) => store.job);
  
  const [filterJob,setFilterJob]=useState(allAdminJobs)
  const navigate=useNavigate()
  useEffect(()=>{
      const filterdJob=allAdminJobs.length >=0 && allAdminJobs.filter((job)=>{
        if(!searchJobByText){
          return true;
        }
        return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase())
        || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
      })
      setFilterJob(filterdJob)
  },[allAdminJobs,searchJobByText])
  return (
    <div className='bg-slate-400'>
      <Table>
        <TableCaption className='text-red-100'>A List Of Your Recent Posted Jobs</TableCaption>
        <TableHeader className='bg-slate-300 ' >
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            
            filterJob?.map((job,index) => (
              <tr key={index} className='font-bold'>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div onClick={()=>navigate(`/admin/companies/${job._id}`)} className=" flex items-center gap-2 w-fit cursor-pointer">
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className="flext items-center w-full gap-2 cursor-pointer" >
                        <Eye className="w-4"/>
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))
          }
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminJobsTable;
