import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { APPLICATION_API_END_POINT } from '@/utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { setApplicants } from '@/redux/applicationSlice'
import { useEffect } from 'react'

function Applicants() {
    const params =useParams()
    const dispatch=useDispatch ()
    const {applicant} =useSelector(store=>store.application)
    useEffect(()=>{
        const fecthApplicants=async()=>{
            try {
                const res=await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`,{withCredentials:true})
                if(res.data.success){
                    dispatch(setApplicants(res.data.job))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fecthApplicants();
    },[])
  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto'>
            <h1 className='font-bold text-xl my-5'>Applicants {applicant.applications.length}</h1>
            <ApplicantsTable/>
        </div>
    </div>
  )
}

export default Applicants