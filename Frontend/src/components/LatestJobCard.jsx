import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

function LatestJobCard({job}) {
  const navigate=useNavigate()

  return (
    <motion.div initial={{opacity:0,x:100}}
    animate={{opacity:1,x:0}}
    exit={{opacity:0,x:-100}}
    transition ={{duration:0.3}} onClick={()=>navigate(`/description/${job._id}`)} className="p-5 rounded-md shadow-xl border border-grey-100 cursor-pointer bg-slate-300">
      <div >
      <Avatar>
            <AvatarImage src={job?.company?.logo}/>
          </Avatar>
        <h1 className="font-medium text-lg">{job.company?.name}</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-500">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={'text-blue-700 font-bold'} variant={"ghost"}>{job?.positions}</Badge>
        <Badge className={'text-[#F83002] font-bold'} variant={"ghost"}>{job?.jobType}</Badge>
        <Badge className={'text-[#6A3BC2] font-bold'} variant={"ghost"}>{job?.salary}</Badge>
      </div>
    </motion.div>
  );
}

export default LatestJobCard;
