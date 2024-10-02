import { setAllAdminJobs, setAllAppliedJobs } from '@/redux/jobSlice';
import { APPLICATION_API_END_POINT } from '@/utils/constants'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function useGetAppliedJobs() {
    const dispatch=useDispatch();
  useEffect(()=>{
    const fetchAllAppliedJobs=async()=>{
        try {
            const res=await axios.get(`${APPLICATION_API_END_POINT}/get`,{withCredentials:true})
            if(res.data.success){
                   dispatch(setAllAppliedJobs(res.data.application))
            }
        } catch (error) {
            console.log(error)
        }
    }
    fetchAllAppliedJobs();
  },[])
}

export default useGetAppliedJobs  