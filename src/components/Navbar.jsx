import {React,useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";

function Navbar(){
 const user = useSelector((state) => state.auth.authuser);
  
  const[uname,setUname]=useState();
  var username=localStorage.getItem("username");
  
  const [isOpen,setIsOpen]=useState(false);
  useEffect(()=>{      
      setUname(username);
  },[username]);
  
  const dispatch = useDispatch();
  const handleLogout=()=>{
    
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("userid");
    setUname(null);
    username=null;
  }
  

  return (
       <nav className="items-center gap-6 text-sm ">
        <div className="flex items-center gap-2">
          
          <h2 className="font-bold flex items-center gap-2">
            <span className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold">
            🔥
          </span>
          <span className='text-orange-500'>BurnTrack</span></h2>
          {
            <div className="flex justify-end pl-4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-xl"
              >
                ☰
              </button>
            </div>
          }
       

        
          <div className='hidden md:flex justify-end pl-170'>
            { (uname!=null)?(
              <div className='flex justify-end' style={{width:"100%"}}>
              <div className='flex gap-6'>
                <Link to="/feeds" className='hover:text-black-300'>Feeds</Link>
                <Link to="/browse" className='hover:text-black-300'>Browse</Link>
                <Link to="/" className='hover:text-black-300 flex-end' onClick={()=>handleLogout()}>Logout</Link>
              </div>
              </div>
            )
            :(
              <div className='flex justify-end' style={{width:"100%"}}>
              <div className='flex gap-6'>
                <Link to="/features" className='hover:text-black-300'>Features</Link>
                <Link to="/howitworks" className='hover:text-yellow-300'>How It Works</Link>                
                <Link to="/signin" className='hover:text-yellow-300'>Sign In</Link>
                <Link to="/signup">
                <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
                Get Started
                </button>
                </Link>
              </div>
              </div>
            )
          }
          </div>
         
        </div>
         <div className={`overflow-hidden transition-all duration-100 ${
    isOpen ? "max-h-40" : "max-h-0"} md:hidden text-sm`}>
           { (uname!=null)?(
              <div className='flex flex-col mt-4 gap-4 top-6 left-0 bg-white justify-end absolute
                              text-left w-1/2 shadow-md p-4' style={{backgroundColor:'rgba(243, 243, 249, 0.9)'}}>
              
                <Link to="/feeds" className='hover:text-black-300'  onClick={(e)=>setIsOpen(false)}>Feeds</Link>
                <Link to="/browse" className='hover:text-black-300'  onClick={(e)=>setIsOpen(false)}>Browse</Link>
                <Link to="/" className='hover:text-black-300 flex-end' onClick={()=>handleLogout()}>Logout</Link>
              
              </div>
            )
            :(
              isOpen &&( <div className='flex flex-col mt-4 gap-4 top-6 left-0 bg-white justify-end absolute
                              text-left w-1/2 shadow-md p-4' style={{backgroundColor:'rgba(243, 243, 249, 0.9)'}}>
                <Link to="/features" className='hover:text-black-300' onClick={(e)=>setIsOpen(false)} >Features</Link>
                <Link to="/howitworks" className='hover:text-yellow-300'  onClick={(e)=>setIsOpen(false)}>How It Works</Link>                
                <Link to="/signin" className='hover:text-yellow-300'  onClick={(e)=>setIsOpen(false)}>Sign In</Link>
                <Link to="/signup">
                <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
                Get Started
                </button>
                </Link>
              </div>)
              
            )
          }
          </div>
       </nav>
  )
}

export default Navbar