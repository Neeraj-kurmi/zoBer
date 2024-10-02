import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup} from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import store from "@/redux/store";
import { Loader2 } from "lucide-react";

function Login() {
  const [input,setInput]=useState({
    email:"",
    password:"",
    role:"",
  });
  
  const {loading,user}=useSelector(store=>store.auth)
  const navigate=useNavigate();
  const dispatch= useDispatch();

  const changeEventHandler=(e)=>{
    setInput({...input,[e.target.name]:e.target.value})
  } 
  
  const submitHandler=async (e)=>{
    e.preventDefault();
  
    try {
         dispatch(setLoading(true))
        const res=await axios.post(`${USER_API_END_POINT}/login`,input,{
         header:{
           "Content-Type":"application/json"
         },
         withCredentials:true
        })
        if(res.data.success){
        dispatch(setUser(res.data.user))
        navigate("/")
         toast.success(res.data.massage)
        }
    } catch (error) {
       console.log(error)
       toast.error(error.response.data.massage)
    }
    finally{
      dispatch(setLoading(false))
    }
}

useEffect(()=>{
    if(user){
      navigate("/")
    }
})
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form onSubmit={submitHandler} className="w-1/2 border-gray-200 rounded-md p-4 my-10">
          <h1 className="font-bold text-xl">Login</h1>
          
          <div>
            <Label>Email</Label>
            <Input type="email" placeholder="enter email here..."value={input.email} name="email" onChange={changeEventHandler}></Input>
          </div>
          
          <div>
            <Label>Password</Label>
            <Input type="password" placeholder="enter password here..." value={input.password} name="password" onChange={changeEventHandler}></Input>
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-4">
              <div className="flex items-center space-x-2">
              <Input
                    type="radio"
                    name="role"
                    value="student"
                    cheaked={input.role==='student'}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                />
                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
              <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    cheaked={input.role==='recruiter'}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                />
                <Label htmlFor="option-two">Recruiter </Label>
              </div>
            </RadioGroup>
          </div>
          {
            loading ? <Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>please wait</Button>
            :<Button type="submit" className="w-full my-4">Login</Button>
          }
          
          <span className="text-sm">Don't have an account? <Link to="/singup" className="text-blue-600">Signup</Link></span>
        </form>
      </div>
    </>
  );
}

export default Login;
