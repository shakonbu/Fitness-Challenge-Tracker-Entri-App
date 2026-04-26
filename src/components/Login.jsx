import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import loginbg from '../assets/loginBG.jpg'
import {login,loginname,logout} from '../feature/authSlice'
import {addUser} from '../feature/userSlice'
import {useDispatch,useSelector} from "react-redux"
import backgroundVideo from '../assets/3741159271-preview.mp4'
import { useFormikContext } from "formik";

import '../Login.css'

// const userdetails=`[
// {
// "Name":"Shakkina",
// "emailID":"preethna@gmail.com",
// "password":"$OneShak#"
// },

// {
// "Name":"Sarah",
// "emailID":"sarah@gmail.com",
// "password":"$TwoSarah#"
// },

// {
// "Name":"Sandra",
// "emailID":"sandra@gmail.com",
// "password":"$ThreeSandra#"
// }
// ]`;


const Login = () => {
  var userdetails=useSelector((state)=>state.user.userData);
  userdetails=userdetails.filter((u)=>u.userid!=null);
    const [userDet,setUserDet]=useState(userdetails);
    const[email,setEmail]=useState();
    const[pwd,setPwd]=useState();
    const [isValidUser,setIsValidUser] = useState(true);
    
 const navigate = useNavigate();
 const dispatch=useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",      
    },

    validationSchema: Yup.object({      
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().min(6, "Min 6 chars").required("Required"),      
    }),
    onSubmit: (values) => {
      
        const { email, password } = values;
      // ✅ Simulate successful login
      
        const isUserFound= userDet.find((u1)=>u1.emailID==email && u1.password==password)
        
        if(isUserFound)
        {
            setIsValidUser(true);
            alert("User found.validation success");
            
            dispatch(login(email));
            dispatch(loginname(isUserFound.Name));
            localStorage.setItem("email",email);
            localStorage.setItem("username",isUserFound.Name);
            localStorage.setItem("userid",isUserFound.userid);
            
            navigate('/feeds');
        }
        else
        {
            setIsValidUser(false);
            alert("User not found. Please give valid credentials");
        }
      //if (isValidUser) {
        //navigate("/feeds"); // 🚀 redirect
      //}
    },
  });

  const handleForgotPassword=(email)=>{
     
      const isUserFound= userDet.find((u1)=>u1.emailID==email)
      
      if(isUserFound){
        localStorage.setItem("ForgotPWd",true);
        localStorage.setItem("email",email);
        navigate('/otpauth/'+0);
      }
      else{
         alert("User not found. Please give valid credentials");
      }
  }
    
   return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-gray-100 px-4 bg-cover bg-norepeat main" >
     {/* style={{backgroundImage:`url(${loginbg})`}}> */}
      <video src={backgroundVideo} autoPlay loop muted />
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg content">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold">
            🔥
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-2">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-6">
          Sign in to continue your fitness journey
        </p>

        {/* Social Buttons */}
        {/* <div className="space-y-3 mb-4">
          <button className="w-full border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50">
            <span className="font-semibold">G</span> Continue with Google
          </button>

          <button className="w-full border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50">
             Continue with Apple
          </button>
        </div>

        <div className="text-center text-gray-400 text-sm mb-4">OR CONTINUE WITH EMAIL</div> */}

        {/* Form */}
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div>
            <div className="flex justify-between text-sm">
            <label className="font-medium text-left">Email</label>
            </div>
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
            <div className="flex justify-between text-sm">
              <label className="font-medium">Password</label>
              <div className="relative group w-fit">
              <a href="#" className="text-orange-500 hover:underline" onClick={(e)=>handleForgotPassword(formik.values.email)}>
                Forgot password?
              </a>
              <span className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-orange-500 text-xs px-2 py-1 rounded text-left">
                  If you have given the registered Email ID, you'll receive OTP. After sucessfull verification user can access the application.  
              </span>
              </div>
            </div>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
              value={formik.password}
              onChange={formik.handleChange}
            />
          </div>
            {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}
          <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
          type="submit">
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{' '}
          <Link to="/signup">
          <span className="text-orange-500 hover:underline">
            Sign up
          </span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login