import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constants";
import { setUser } from "@/redux/authSlice";

function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.massage);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.massage);
    }
  };
  return (
    <div className='bg-slate-00 p-4'>
      <div className="flex items-center justify-between mx-auto max-w-7xl max-h-16">
        <div className="flex flex-row gap-2 items-center">
          <h1 className="text-2xl font-bold">
            zo<span className="text-[#F83002]">Ber</span>
          </h1>
        </div>
        <div className="flex items-center gap-5">
          <ul className="flex font-medium item-center gap-5">
            {user && user.role == "recruiter" ? (
              <>
                <li>
                  <Link to={"/admin/companies"}>Companies</Link>
                </li>
                <li>
                  <Link to={"/admin/jobs"}>Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link to={"/jobs"}>Jobs</Link>
                </li>
                <li>
                  <Link to={"/browse"}>Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button>Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#470bb0]">
                  SignUp
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 ">
                <div className="flex gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>

                  <div>
                    <h4 className="font-bold">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                {
                  user && user.role=='student' && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <Button variant="link">
                      <Link to={"/profile"}>View Profile</Link>
                    </Button>
                  </div>
                  )
                }
                  
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <Button onClick={logoutHandler} variant="link">
                      <Link>Logout</Link>
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
