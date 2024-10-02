import React from "react";
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
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constants";

const shortListedStatus = ["accepted", "rejected"];
function ApplicantsTable() {
  const { applicant } = useSelector((store) => store.application);

  const statusHandler =async (status,id) =>{
    try {
      const res =await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status},{
        withCredentials:true,
      })
      if(res.data.success){
        toast.success(res.data.massage)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <Table>
        <TableCaption>A List Of Applicants</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicant &&
            applicant.applications.map((item, index) => (
              <tr key={index}>
                <TableCell>{item.applicant.fullname}</TableCell>
                <TableCell>{item.applicant.email}</TableCell>
                <TableCell>{item.applicant.phoneNumber}</TableCell>
                <TableCell className="text-blue-600 cursor-pointer">
                {
                  item.applicant.profile.resume ? <a href={item.applicant.profile.resume } target="_blank" >{item.applicant.profile.resumeOriginalName}</a>:"NA"

                }
                </TableCell>
                <TableCell>{item.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortListedStatus.map((status, index) => {
                        return (
                          <div
                            key={index}
                            className="flex w-fit items-center my2 cursor-pointer"
                            onClick={()=>statusHandler(status,item._id)}
                          >
                            <span>{status}</span>
                          </div>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ApplicantsTable;
