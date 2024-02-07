import React, { useState } from "react";
import Signin from "./Signin";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    username: "",
    password: "",
    confirmPassword: '',
    contactNo: "",
  });
  axios.defaults.withCredentials = true;
  const changeHandler = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://backend-server-jy9f.onrender.com/api/v1/registration",
        formData,
        {
          withCredentials: false  // Include this option to send credentials
        }
      );

      const { success, message } = response.data;
      if (success) {
        toast.success(message);
        // Redirect to sign-in page after successful signup
        setTimeout(() => {
          history.push("/signin")
        }, 2000); // Redirect after 2 seconds
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("An error occurred. Please try again.");
    }
  };




  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-richblack-800 flex flex-col p-4 rounded-md gap-2 shadow-box">
        <h2 className="text-center">Sign Up</h2>
        <p>Enter Information to create an account</p>
        <form action="submit" className="flex flex-col justify-center gap-1">
          <label htmlFor="name">Name:</label>
          <input
            onChange={changeHandler}
            type="text"
            name="name"
            id="name"
            value={formData.name}
          />
          <label htmlFor="contact No">Contact No:</label>
          <input
            onChange={changeHandler}
            type="number"
            name="contactNo"
            id="contactNo"
            value={formData.contactNo}
          />

          <label htmlFor="email">Email:</label>
          <input
            onChange={changeHandler}
            type="email"
            name="email"
            id="email"
            value={formData.email}
          />


          <label htmlFor="username">UserName:</label>
          <input
            onChange={changeHandler}
            type="text"
            name="username"
            id="username"
            value={formData.username}
          />

          <label htmlFor="password">Password:</label>
          <input
            onChange={changeHandler}
            type="password"
            name="password"
            id="password"
            value={formData.password}
          />
          <label htmlFor="password">Confirm Password:</label>
          <input
            onChange={changeHandler}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
          />
          {/* {!passwordsMatch && <p>Passwords do not match!</p>} */}
          <label htmlFor="profileImage">Profile Image:</label>
          <input
            type="file"
            name="profileImage"
            id="profileImage"
          // onChange={imageChangeHandler}
          />
          <div className="flex justify-center p-4">
            <button className="w-full" onClick={handleSubmit}>
              {" "}
              Sign Up
            </button>
          </div>
        </form>
        <span>
          Already have an account? <NavLink to="/signin">Sign in</NavLink>
        </span>
      </div>
    </div>
  );
};

export default Signup;
