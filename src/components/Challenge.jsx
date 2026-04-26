import React, { useEffect } from 'react'
import {Await, useLoaderData } from 'react-router-dom'
import run from '../assets/run_100_miles.jpg'
import walking from '../assets/10kSteps.avif'
import medi from '../assets/meditation.webp'
import cycling from '../assets/cycling.avif'
import { Link } from 'react-router-dom'
import yogacover from '../assets/yogacover.jpg'
import strengthcover from '../assets/strengthcover.jpg'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToFeed, } from '../feature/feedsSlice'


// const challenges = [
//     {
//       id:"1",
//       title: "30-Day Morning Yoga",
//       category: "Yoga",
//       level: "Beginner",
//       image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
//       participants: "1,247",
//       description:"Start your day with energy! Join us for 30 days of morning yoga sessions. Perfect for beginners and experienced yogis alike.",
//       duration:"30 days",
//       goal:"Complete 20 morning yoga sessions",
//       cr:"78%",
//       rating:"4.8",
//       bg:yogacover,
//     },
//     {
//       id:"2",
//       title: "Run 100 Miles",
//       category: "Running",
//       level: "Intermediate",
//       image: run,
//       participants: "892",
//       description:"Build your running endurance with this progressive challenge. Track every mile and watch yourself grow stronger!",
//       duration:"60 days",
//       goal:"Run a total of 100 miles",
//       cr:"78%",
//       rating:"4.8",
//       bg:run,
//     },
//     {
//       id:"3",
//       title: "Strength Training Bootcamp",
//       category: "Strength",
//       level: "Advanced",
//       image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61",
//       participants: "2,341",
//       description:"12 weeks of progressive strength training. Get stronger, build muscle, and transform your body with guided workouts.",
//       duration:"84 days",
//       goal:"Complete 48 strength workouts",
//       cr:"78%",
//       rating:"4.8",
//       bg:strengthcover,
//     },
//     {
//       id:"4",
//       title: "10K Steps Daily",
//       category: "Walking",
//       level: "Beginner",
//       image: walking,
//       participants: "3,249",
//       description:"The ultimate walking challenge! Commit to 10,000 steps every day for a month and build a lasting healthy habit.",
//       duration:"30 days",
//       goal:"Reach 10K steps for 25 days",
//       cr:"78%",
//       rating:"4.8",
//       bg:walking,
//     },
//     {
//       id:"5",
//       title: "Mindful Meditation March",
//       category: "Mindfulness",
//       level: "Beginner",
//       image: medi,
//       participants: "1,876",
//       description:"Cultivate inner peace and reduce stress with daily meditation practice. All levels welcome!",
//       duration:"31 days",
//       goal:"Meditate for 15 minutes, 25 days",
//       cr:"78%",
//       rating:"4.8",
//       bg:medi,
//     },
//     {
//       id:"6",  
//       title: "Cycling Century",
//       category: "Cycling",
//       level: "Advanced",
//       image: cycling,
//       participants: "654",
//       description:"Ride 100 kilometers over the next two weeks. Explore new routes and build cycling endurance!",
//       duration:"14 days",
//       goal:"Cycle 100km total distance",
//       cr:"78%",
//       rating:"4.8",
//       bg:cycling,
//     },
//   ];

  export const challengeLoader=async({params})=>{
    const {id}=params; 
    
    const allChallenges=await getAllChallenges();
    const challengeData=allChallenges.find((c1)=>c1.id===id);
    
    return challengeData;
  };


export const Challenge = () => {
    const chlng=useLoaderData();
    const today = new Date();
    const futureDate = new Date();
    
    futureDate.setDate(today.getDate() + parseInt(chlng.duration));
    chlng.startdate=today.toLocaleDateString();
     
    chlng.enddate=futureDate.toLocaleDateString();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [fchlngs,setFchlngs]=useState([]);
    const[isJoined,setIsJoined]=useState(false);
    const[showTooltip,setShowTooltip]=useState(false);
    const feedChlngs=useSelector((state)=>state.feed.feedchallenges);

    useEffect(()=>{
      setFchlngs(feedChlngs);
      
      if(feedChlngs){
        const foundedFeed=feedChlngs.find((fc1)=>fc1.chlngid==chlng.id);
        const isFeedAdded=foundedFeed?true:false;
        setIsJoined(isFeedAdded);
        setShowTooltip(isFeedAdded);
      }
    },[isJoined]);

  const handleAdd=(c1)=>{        
        const userid=localStorage.getItem("userid");
        const feedData=
          {
             "chlngid":c1.id,
              "title": c1.title,
              "category": c1.category,
              "level": c1.level,
              "image": c1.image,
              "participants": c1.participants,
              "description":c1.description,
              "duration":c1.duration,
              "goal":c1.goal,
              "cr":c1.cr,
              "rating":c1.rating,
              "bg":c1.bg,
              "isCompleted":"false",
              "startdate":c1.startdate,
              "enddate":c1.enddate,
              "userid":userid
          };
        
      
        dispatch(addToFeed(feedData));
        setIsJoined(true);
        setShowTooltip(true);        
        navigate('/feeds');
    }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Top Header */}
      <div className="h-[50vh] text-white p-6 bg-cover bg-center bg-no-repeat" style={{backgroundImage:`url(${chlng.bg})`}}>
        <div className='!mt-[10%]'>
        <div className="flex gap-2 mb-2">
                <span className="text-xs bg-blue-400 text-blue-100 px-2 py-1 rounded">
                  {chlng.category}
                </span>
                <span className="text-xs bg-white/50 text-white px-2 py-1 rounded">
                  {chlng.level}
                </span>
        </div>
        <h1 className="text-2xl font-bold !text-white text-left !mx-0 !my-0">{chlng.title}</h1>
        <div className="flex gap-6 text-sm mt-2 opacity-90">
          <span>👥 {chlng.participants} participants</span>
          <span>📅 {chlng.duration} days</span>
          <span>🧘 {chlng.goal}</span>
        </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b px-6 flex gap-6">
        <button className="py-3 border-b-2 border-red-500 font-medium">
          Overview
        </button>
        <button className="py-3 text-gray-500">Leaderboard</button>
        <button className="py-3 text-gray-500">Activity Feed</button>
      </div>

      {/* Main Layout */}
      <div className="grid md:grid-cols-3 gap-6 p-6">

        {/* LEFT SECTION */}
        <div className="md:col-span-2 space-y-6">

          {/* About */}
          <div className="bg-white p-5 rounded-lg shadow">
            <h2 className="font-semibold mb-2 text-left">About This Challenge</h2>
            <p className="text-gray-600 text-sm">
              {chlng.description}
            </p>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-100 p-3 rounded">
                <p className="text-xs text-gray-500 text-left">Challenge Goal</p>
                <p className="font-medium text-sm text-left">
                  {chlng.goal}
                </p>
              </div>

              <div className="bg-gray-100 p-3 rounded">
                <p className="text-xs text-gray-500 text-left">Duration</p>
                <p className="font-medium text-sm text-left">{chlng.duration} days</p>
              </div>
            </div>
          </div>

          {/* How it works */}
          <div className="bg-white p-5 rounded-lg shadow">
            <h2 className="font-semibold mb-4 text-left">How It Works</h2>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">1</div>
                <div>
                  <p className="font-medium text-sm text-left">Join the Challenge</p>
                  <p className="text-gray-500 text-xs">Click the join button to get started</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">2</div>
                <div>
                  <p className="font-medium text-sm text-left">Track Your Progress</p>
                  <p className="text-gray-500 text-xs">Log daily activities and grow</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">3</div>
                <div>
                  <p className="font-medium text-sm text-left">Complete & Celebrate</p>
                  <p className="text-gray-500 text-xs">Reach your goal and earn rewards</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">

          {/* Join Card */}
          <div className="bg-white p-5 rounded-lg shadow border border-red-200">
            <div className="relative w-full group">
            <button className={`w-full  py-2 rounded mb-4 ${isJoined ? "bg-gray-300 cursor-not-allowed text-white-200" :"bg-red-500 hover:bg-red-600 text-white"}`}
            onClick={()=>handleAdd(chlng)}
            disabled={isJoined}
            onMouseEnter={() => isJoined && setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}>
              Join Challenge
            </button>
            {isJoined && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                  opacity-0 pointer-events-none
                  group-hover:opacity-100 group-hover:translate-y-0
                  translate-y-2 transition-all duration-200
                  bg-gray-300 text-white text-sm px-2 py-1 rounded">
                  You already joined
                </div>
            )}
            </div>
            <div className="text-sm text-gray-600 space-y-2">
              <p>Start Date: <span className="float-right">{chlng.startdate}</span></p>
              <p>End Date: <span className="float-right">{chlng.enddate}</span></p>
              <p>
                Difficulty:
                <span className="float-right bg-green-100 text-green-600 px-2 py-0.5 rounded text-xs">
                  {chlng.level}
                </span>
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white p-5 rounded-lg shadow">
            <h3 className="font-semibold mb-3 text-left">Challenge Stats</h3>

            <div className="space-y-3 text-sm">
              <div className='flex gap-4'><span className="w-10 h-10 bg-pink-100 text-blue-500 flex items-center justify-center rounded-lg mb-4">👥</span>{chlng.participants} Active Participants</div>
              <div className='flex gap-4'><span className="w-10 h-10 bg-green-100 text-blue-500 flex items-center justify-center rounded-lg mb-4">📈</span> 78% Completion Rate</div>
              <div className='flex gap-4'><span className="w-10 h-10 bg-purple-100 text-blue-500 flex items-center justify-center rounded-lg mb-4">⭐</span> 4.8 Average Rating</div>
            </div>
          </div>

          {/* Participants */}
          <div className="bg-white p-5 rounded-lg shadow">
            <h3 className="font-semibold mb-3">Top Participants</h3>

            <div className="flex -space-x-2">
              <img className="w-8 h-8 rounded-full border" src="https://i.pravatar.cc/100?img=1" />
              <img className="w-8 h-8 rounded-full border" src="https://i.pravatar.cc/100?img=2" />
              <img className="w-8 h-8 rounded-full border" src="https://i.pravatar.cc/100?img=3" />
              <img className="w-8 h-8 rounded-full border" src="https://i.pravatar.cc/100?img=4" />
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Join {chlng.participants} others in this challenge
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

const getAllChallenges= async () => {
  const response=await fetch("https://raw.githubusercontent.com/shakonbu/FitChallengesData/refs/heads/main/ChallengesData.json");
   return response.json();
 }
