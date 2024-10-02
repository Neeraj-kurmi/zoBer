import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

function AppliedJobTable() {
    const {allAppliedJobs} =useSelector(store=>store.job)
  return (
    <div className='bg-slate-500'>
      <Table >
        <TableCaption className='text-red-100'>A List of your applied Jobs</TableCaption>
        <TableHeader className='bg-slate-300'>
            <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Job Role</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="text-right">Status</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
                {
                    allAppliedJobs.length <=0 ? <span>you haven't applied any job yet</span> : allAppliedJobs.map((appliedJob)=>(
                        <TableRow key={appliedJob._id} className=' font-bold'>
                            <TableCell>
                            {appliedJob.createdAt.split("T")[0]}
                            </TableCell>
                            <TableCell>
                                {appliedJob.job.title}
                            </TableCell>
                            <TableCell>
                            {appliedJob.job.company.name}
                            </TableCell>
                            <TableCell className={"text-right"}>
                                <Badge className={`${appliedJob.status == 'rejected' ? 'bg-red-400' : appliedJob.status == 'pending' ?  'bg-gray-400 ' :'bg-green-500'} `}>{appliedJob.status}</Badge>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable