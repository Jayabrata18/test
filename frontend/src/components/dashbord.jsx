import React from "react";
import { useNavigate } from "react-router-dom";
import img from "../assets/Logos/logo-bgr-hd.png";

const Dashbord = () => {
  const navigate = useNavigate();
  return (
    <div className=" flex flex-col justify-center items-center min-h-screen">
      <div className="bg-richblack-800 flex flex-col justify-center items-center px-10 py-8 rounded-md shadow-box">
        <img src={img} alt="" className="h-60 w-60" />
        <h1 className="">Hi There!👋 Welcome to Dashboard</h1>

       
      </div>
    </div>
  );
};

export default Dashbord;
