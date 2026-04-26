import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {useDispatch,useSelector} from "react-redux"
import { addUser, deleteUser, updateUser } from '../feature/userSlice';
import {login,loginname,logout} from '../feature/authSlice'
import { useNavigate, useParams } from "react-router-dom";

const OTPAuthentication = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const allUser=useSelector((state)=>state.user.userData);  
  const toemail=localStorage.getItem("email");   
  const {newuserid}=useParams();

const[newUser,setNewUser]=useState([]);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const inputsRef = useRef([]);

  // Generate OTP
  const generateOTP = () => {
    const newOtp = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedOtp(newOtp);
    
    return newOtp;
  };

  useEffect(() => {
    const otp=generateOTP();   
    
    sendEmail(toemail,otp);
    const thisuser=allUser.filter((au)=>au.emailID==toemail);
    
    setNewUser(thisuser);
   
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timer === 0) 
        {
            setGeneratedOtp(null);
            return;
        }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
    
  }, [timer]);

  // Handle input change
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // Paste support
  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pasteData)) return;

    const newOtp = pasteData.split("");
    setOtp(newOtp);

    newOtp.forEach((val, i) => {
      if (inputsRef.current[i]) {
        inputsRef.current[i].value = val;
      }
    });
  };

  // Verify OTP
  const verifyOtp = () => {
    const enteredOtp = otp.join("");
 
  const fpwd=localStorage.getItem("ForgotPWd");      
    if (enteredOtp === generatedOtp) {
      alert("✅ OTP Verified!");
        
      const email=localStorage.getItem("email");
      const fullname=newUser[0].Name;
      
      dispatch(login(email));
      dispatch(loginname(fullname));
      if(fpwd)
      {
        localStorage.setItem("username",newUser[0].Name);
        localStorage.setItem("userid",newUser[0].userid);
        navigate("/feeds")
      }  
      else
      {
        dispatch(updateUser({
        emailid:email,
        updatedData:{
            userid:newuserid
        }
      }))
        navigate("/signin"); // 🚀 redirect
      }
    }
    else {
      alert("❌ Invalid OTP");    
    }
  };

  // Resend OTP
  const resendOtp = () => {
    generateOTP();
    setOtp(new Array(6).fill(""));
    setTimer(60);
    inputsRef.current[0].focus();
  };

  
    return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm text-center">

        <h2 className="text-xl font-semibold mb-4">Verify OTP</h2>

        {/* OTP Inputs */}
        <div className="flex justify-between gap-2 mb-4" onPaste={handlePaste}>
          {otp.map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-10 h-12 text-center text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={verifyOtp}
          className="w-full bg-green-500 text-white py-2 rounded-lg mb-3 active:scale-95 transition"
        >
          Verify
        </button>

        {/* Timer / Resend */}
        {timer > 0 ? (
          <p className="text-sm text-gray-500">
            Resend OTP in {timer}s
          </p>
        ) : (
          <button
            onClick={resendOtp}
            className="text-green-500 text-sm font-medium"
          >
            Resend OTP
          </button>
        )}
      </div>
    </div>
  );
}

export default OTPAuthentication

async function sendEmail(toEmail,generatedOTP)
{
  const dt=new Date();
  dt.setMinutes(dt.getMinutes() + 15);
  let d = dt.toLocaleDateString('en-us',{month:'short',day:'2-digit',year:'numeric'});
  
  const timeNow=dt.toLocaleTimeString('en-us',{hour: 'numeric',minute:'2-digit',hour12:true}).toLocaleLowerCase();
  const dispDtTime=d+" " +timeNow;

  const templateParams = {
    passcode:generatedOTP,
    time: dispDtTime,
    email: toEmail,
  };

  await emailjs.send(
    "service_x3nhek5",
    "template_t4utv1m",
    templateParams,
    "Hulu5dA_l0PPWWq1V"
  );

//await delay(900000);
  //  setGeneratedOtp(null);
}

function delay(ms)
{
    return new Promise(resolve=> setTimeout(resolve,ms));
}