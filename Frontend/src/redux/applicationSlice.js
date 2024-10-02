import { createSlice } from "@reduxjs/toolkit";

const applicationSlice =createSlice({
    name:'application',
    initialState:{
        applicant:[],
    },
    reducers:{
        setApplicants:(state,action)=>{
            state.applicant=action.payload
        }
    }
})

export const {setApplicants}=applicationSlice.actions
export default applicationSlice.reducer