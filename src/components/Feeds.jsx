import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { addToFeed, } from '../feature/feedsSlice'

import medi from '../assets/meditation.webp'

const Feeds = () => {
    const [chlng,setChlng]=useState([]);
    const[totChlngs,setTotChlngs]=useState();
    const[totCompletedChlng,setTotCompletedChlng]=useState();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const username=useSelector((state)=>state.auth.username)
    const feedChlngs=useSelector((state)=>state.feed.feedchallenges);
    var getLogData=useSelector((state)=>state.log.logData);
    const [currStreak,setCurrStreak]=useState();
    const [usrChlgLog,setUsrChlgLog] = useState();
    const [dataReadFromAPI,setDataReadFromAPI]=useState(false);
   const TotChlngs=(feedChlngs.length);
    //setChlng(feedChlngs);
     const userid=localStorage.getItem("userid");
    
     useEffect(()=>{
      if(TotChlngs<=0)
      {
        //Initial loading
        axios.get("https://raw.githubusercontent.com/shakonbu/FitChallengesData/refs/heads/main/ShakCD.json")
           .then((res)=>{
            const allchallenges=res.data;            
            const challenges=allchallenges.filter((f1)=>f1.userid==userid)
            setChlng(challenges);
            setTotChlngs(challenges?challenges.length:0);
            const compChlngs=challenges?challenges.find((fc)=>fc.isCompleted==="true"):null;
            setTotCompletedChlng(compChlngs?compChlngs.length:0);
            
            challenges.map((c1) => dispatch(addToFeed(c1)));
      })
         
      }
      else
      {
       
        setChlng(feedChlngs);
        setTotChlngs(feedChlngs.length);
        const complChlng=feedChlngs.find((fc)=>fc.isCompleted==="true");
        setTotCompletedChlng(complChlng?complChlng.length:0);
      }
    },[]);
    useEffect(()=>{
      
      if(!dataReadFromAPI || getLogData.length<=0){
       axios.get("https://raw.githubusercontent.com/shakonbu/FitChallengesData/refs/heads/main/LogData.json")
           .then((res)=>{
            const allLogdata=res.data;
            
            const logdata=allLogdata.filter((flog)=>flog.userid==userid);
            const sortedUsrChlngData = [...logdata].sort(
              (a, b) => new Date(b.logdate) - new Date(a.logdate) // DESC
            );
            setUsrChlgLog(sortedUsrChlngData);            
            setDataReadFromAPI(true);
          
        });
      }
      else
      {
        getLogData=getLogData.filter((lg)=>lg.userid==userid);
        
        const nonDuplicatesLog=[...new Map(getLogData.map(item=>[
                                   `${item.userid}-${item.chlngid}-${item.logdate}`
                                   ,item
                                  ])).values()];
                                  
        setUsrChlgLog(nonDuplicatesLog);        
      }        
    },[dataReadFromAPI]);
    
  
   
const cs=CalculateCurrentStreak(usrChlgLog);

const handleViewMyChlng=(chlng)=>{
  const edt=formatDate(chlng.enddate);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const strtDate=parseDate(chlng.startdate);
  yesterday.setHours(0,0,0,0);
  strtDate.setHours(0,0,0,0);

  const daysPassed= (Math.floor((yesterday - strtDate) / 86400000))+1;
    
  navigate("/mychallenge/"+chlng.chlngid+"/"+chlng.userid+"/"+chlng.duration+"/"+edt+"/"+daysPassed+"/"+chlng.title+"/"+chlng.category+"/"+chlng.goal);
}

 
const uname=localStorage.getItem("username");

return (
     <div >
        {/* className="min-h-screen bg-gray-50 p-6"> */}
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-5 rounded-lg flex justify-between items-center mb-6">
        <div>
          <p className="text-2xl font-bold" style={{paddingLeft:"15px"}}>
            Welcome back, {uname}! 👋 
          </p>
          <p className="text-sm text-gray-600">
            Keep up the great work! You're on a {cs}-day streak
          </p>
        </div>

        <div className="flex gap-4">
          <div className="bg-white px-4 py-2 rounded shadow text-center">
            <p className="font-bold">{cs}</p>
            <p className="text-xs text-gray-500">Day Streak</p>
          </div>

          <div className="bg-white px-4 py-2 rounded shadow text-center">
            <p className="font-bold">#47</p>
            <p className="text-xs text-gray-500">Rank</p>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* LEFT CONTENT */}
        <div className="md:col-span-2 space-y-6">

          {/* Active Challenges */}
          <div>
            <div className="flex justify-between mb-3">
              <h3 className="font-semibold">My Active Challenges</h3>
              <Link to="/browse"><button className="text-sm text-blue-500">Browse More</button></Link>
              {/* <Link to="/BMI"><button className="text-sm text-blue-500">BMI</button></Link> */}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {dataReadFromAPI?
                chlng.map((fChlng, i) => (
                
                <div key={i} className="bg-white rounded-lg shadow overflow-hidden">
                    {/* <Link to="/mychallenge/"+{fChlng.chlngid}+"/"+{fChlng.userid}`> */}
                    <img
                        src={fChlng.image}
                        alt={fChlng.title}
                        className="h-48 w-full object-cover"
                        onClick={()=>handleViewMyChlng(fChlng)}
                    />
                    {/* </Link>  */}

                  <div className="p-4">
                    <div className="flex gap-2 mb-1 text-xs">
                      <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded">
                        {fChlng.category}
                      </span>                     
                    </div>

                    <h4 className="font-medium">
                      {fChlng.title}
                    </h4>

                    {/* Progress */}
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden" style={{height:"10px"}}>
                        <div
                          className="h-4 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 transition-all duration-1000"
                          style={{ width: `${((usrChlgLog?
                                              ((usrChlgLog.filter((ld)=>ld.chlngid==fChlng.chlngid && ld.userid==userid)).length):1)
                                              /fChlng.duration)*100}%`,height:"10px"}}
                        />
                        </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {fChlng.duration} days
                      </p>
                    </div>

                    <p className="text-xs text-gray-400 mt-2">
                      👥 {fChlng.participants} participants
                    </p>
                  </div>
                </div>
              ))
            :<div></div>}
            </div>
          </div>

          {/* Community Activity */}
          <div>
            <h3 className="font-semibold mb-3">Community Activity</h3>

            <div className="bg-white p-4 rounded-lg shadow space-y-4">
              {[
                "runner_mike completed the yoga challenge 🎉",
                "yoga_emma reached 50 miles 🏃",
                "strong_alex joined bootcamp 💪",
                "walker_lisa earned early bird badge 🏆",
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-center text-sm">
                  <img
                    src={`https://i.pravatar.cc/40?img=${i + 1}`}
                    className="w-8 h-8 rounded-full"
                  />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">

          {/* Stats */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-3 text-left">Your Stats</h3>

            <div className="space-y-2 text-sm">
              <div className='flex justify-between'>
                <span className="text-left">📅 Challenges Joined: </span>
                <span className=''>{totChlngs}</span>
              </div>
              <div className='flex justify-between'>
              <span className="text-left">✅ Completed:</span>
               <span>{totCompletedChlng}</span>
              </div>
              <div className='flex justify-between'>
              <span className="text-left">🔥 Current Streak: </span>
              <span>{cs}</span>
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-3">Top Performers</h3>

            {[ 
              { name: "fitness_king", score: 8450 },
              { name: "marathon_queen", score: 7890 },
              { name: "workout_warrior", score: 7234 },
            ].map((user, i) => (
              <div key={i} className="flex justify-between text-sm mb-2">
                <span>{i + 1}. {user.name}</span>
                <span className="text-red-500">{user.score}</span>
              </div>
            ))}
          </div>

          {/* Suggested */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <img
              src={medi}
              className="h-32 w-full object-cover"
            />

            <div className="p-3">
              <h4 className="font-medium text-sm">
                Mindful Meditation March
              </h4>

              <Link to="/challenge/5"><button className="mt-2 w-full bg-orange-400 text-white py-1 rounded text-sm">
                View Challenge
              </button></Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Feeds

const CalculateCurrentStreak = (usrChlgLog) => {
  
  if(usrChlgLog === undefined){
    return 0;
  }
  
  if (!usrChlgLog.length)  return 0;

  const sorted = [...usrChlgLog].sort(
    (a, b) => new Date(b.logdate) - new Date(a.logdate) // DESC
  );

  
  let streak = 0;
  let today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < sorted.length; i++) {
    const logDate = new Date(sorted[i].logdate);
    logDate.setHours(0, 0, 0, 0);
  
    const diffDays = (today - logDate) / (1000 * 60 * 60 * 24);

    if (diffDays === streak) {
      streak++;
    } else if (diffDays > streak) {
      break;
    }
  }
  
  return streak;
};

const formatDate = (dateStr, withSuffix = true) => {
  const [day, month, year] = dateStr.split("/").map(Number);

  const getOrdinal = (d) => {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  //if (withSuffix) {
    return `${day}${getOrdinal(day)} ${months[month - 1]}, ${year}`;
  //} else {
  //  return `${day}${months[month - 1]},${year}`;
 // }
};


const parseDate = d => {
  const [day, month, year] = d.split("/").map(Number);
  return new Date(year, month - 1, day);
};