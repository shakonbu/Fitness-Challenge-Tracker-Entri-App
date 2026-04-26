import React from 'react'
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from 'react';
import loginbg from '../assets/loginBG.jpg'
import Feeds from './Feeds';
import {useDispatch,useSelector} from "react-redux"
import { addUser } from '../feature/userSlice';
import {login,loginname,logout} from '../feature/authSlice'

const Signup = () => {
    const [isValidUser,setIsValidUser] = useState(true);
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const existingUser=useSelector((state)=>state.user.userData)
    const formik = useFormik({
        initialValues: {
          fullname: "",  
          email: "",
          password: "",
          cnfpassword: "",
        },
         validationSchema: Yup.object({
            fullname:Yup.string(),
              email: Yup.string().email("Invalid email").required("Required"),
              password: Yup.string().min(6, "Min 6 chars").required("Required"),
              cnfpassword: Yup.string().oneOf([Yup.ref("password")],"Password must match").required("confirm password is required"),
            }),
        onSubmit: (values) => {
            
            alert("signup completed");
            const { fullname,email, password,cnfpassword } = values;
            // // ✅ Simulate successful login
      
            if(password === cnfpassword)
            {
                setIsValidUser(true);
                alert("User added.");
            }
            else
            {
                setIsValidUser(false);
                alert("password mismatch.Please give valid credentials");
            }

            if (isValidUser) {
              const descExistUser=[...existingUser].sort((a,b)=>b.userid-a.userid);
              const newuserid=descExistUser[0].userid +1;

                const userDet={
                    "userid":null,
                    "Name":fullname,
                    "emailID":email,
                    "password":password}
                dispatch(addUser(userDet));
             
                localStorage.setItem("email",email);
             
                navigate("/otpauth/"+newuserid); // 🚀 redirect
            }
            
        },
    });
    return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-gray-100 px-4 bg-cover bg-norepeat" style={{backgroundImage:`url(${loginbg})`}}>
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold">
            🔥
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-2">Join the Community</h2>
        <p className="text-center text-gray-500 mb-6">
          Create your account to start your fitness journey
        </p>

        {/* Social Buttons */}
        {/* <div className="space-y-3 mb-4">
         <p></p>

         <p></p>
        </div> */}

        {/* <div className="text-center text-gray-400 text-sm mb-4">CONTINUE WITH EMAIL.</div> */}
        <div className="text-center text-gray-400 text-xs mb-4"> You'll receive an OTP to this email on submit.verify the OTP for succesfull registration </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="fullname"
              placeholder="John Doe"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
              value={formik.values.fullname}
              onChange={formik.handleChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a strong password"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              name="cnfpassword"
              placeholder="Re-enter your password"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
              value={formik.values.cnfpassword}
              onChange={formik.handleChange}
            />
          </div>

          <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
             type="submit">
            Create Account
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-4">
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}

export default Signup