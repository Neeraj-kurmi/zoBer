import LatestJobCard from "./LatestJobCard";
import { useSelector } from "react-redux";
function LatestJobs() {
  const {allJobs}=useSelector(store=>store.job)
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top </span>Job Openings
      </h1>
      <div className="grid md:grid-cols-3 gap-4 mt-4">
        {
          allJobs?.length<=0?<span>NO JOB AVAILABLE</span>:allJobs?.slice(0,6).map((job) => (
          <LatestJobCard  key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
}

export default LatestJobs;
