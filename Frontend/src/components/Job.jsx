import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import {motion} from 'framer-motion'
function Job({job}) {
  const navigate=useNavigate();
  // const jobId="asd";
  const daysAgoFunction=(mongodbTime)=>{
  const createdAt=new Date(mongodbTime)
  const currentTime=new Date();
  const timeDifference=currentTime-createdAt;
  return Math.floor(timeDifference/(1000*24*60*60))
  } 
  return (
    <motion.div initial={{opacity:0,x:100}}
    animate={{opacity:1,x:0}}
    exit={{opacity:0,x:-100}}
    transition ={{duration:0.3}} className="p-5 rounded-md shadow-xl  border border-gray-100 bg-slate-300">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">Created : {daysAgoFunction(job?.createdAt)==0 ? "Today" :`${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo}/>
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p>India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">
        {job?.description}
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant={"ghost"}>
          {job?.positions} Positions
        </Badge>
        <Badge className={"text-[#F83002] font-bold"} variant={"ghost"}>
          {job?.jobType}
        </Badge>
        <Badge className={"text-[#6A3BC2] font-bold"} variant={"ghost"}>
          {job?.salary} LPA
        </Badge>
      </div>
      <div className=" flex items-center gap-4 mt-4">
        <Button variant="outline" onClick={()=>navigate(`/description/${job?._id}`)}>Details</Button>
        <Button className="bg-[#6A3BC2]">Save for later</Button>
      </div>
    </motion.div>
  );
}

export default Job;
