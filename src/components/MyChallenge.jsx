import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {addToLog} from '../feature/logSlice'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import { useDispatch, useSelector } from 'react-redux';

const MyChallenge = (params) => {
  
    const {chlngid,userid,duration,enddate,daysPass,title,cat,goal}=useParams();
    const [streaks,setStreaks]=useState();
  
    const [challengeId,setChallengeId]=useState(chlngid);
    const [usrChlgLog,setUsrChlgLog]= useState([]);
    const[currStreak,setCurrStreak]=useState();
    const [prevDate,setPrevDate]=useState();

    const [currentStreak,setCurrentStreak]=useState();
    const [longestStreak,setLongestStreak]=useState();
    const [endDate,setEndDate]=useState();
    const [todayDayCount,setTodayDayCount]=useState();
    var getLogData=useSelector((state)=>state.log.logData);
    const [isDisabled, setIsDisabled] = useState(false);
  
    const[daysPassed,setDaysPassed]=useState();
    const[daysRemaining,setDaysRemaining]=useState();
    const dispatch=useDispatch();
    const [dataReadFromAPI,setDataReadFromAPI]=useState(false);
  
    useEffect(()=>{
      setChallengeId(chlngid);
      if(getLogData.length<=0){
        axios.get("https://raw.githubusercontent.com/shakonbu/FitChallengesData/refs/heads/main/LogData.json")
           .then((res)=>{
            const logdata=res.data;
            logdata.map((d1)=>dispatch(addToLog(d1)));
            const getuserchlnglogdata=logdata.filter((ld1)=>ld1.chlngid==chlngid && ld1.userid==userid);            
            const sortedUsrChlngData = [...getuserchlnglogdata].sort(
              (a, b) => new Date(b.logdate) - new Date(a.logdate) // DESC
            );
            setUsrChlgLog(sortedUsrChlngData?sortedUsrChlngData:null);
            
            setTodayDayCount(parseInt(daysPass) +1);
            const today=getToday();
            if(sortedUsrChlngData.length>0){
              const lastLogDate=sortedUsrChlngData[0].logdate;
              setIsDisabled((today==lastLogDate)?true:false);
            }
            setDaysPassed(isDisabled?parseInt(daysPass)+1:parseInt(daysPass));
            setDaysRemaining(isDisabled?parseInt(duration)-(parseInt(daysPass)+1):(parseInt(duration)-parseInt(daysPass)));
            
            setDataReadFromAPI(true);
            
        });
      }
      else
      {
        
        if(!dataReadFromAPI)
        {
          axios.get("https://raw.githubusercontent.com/shakonbu/FitChallengesData/refs/heads/main/LogData.json")
              .then((res)=>{
                const logdata=res.data;
                logdata.map((d1)=>dispatch(addToLog(d1)));
                getLogData=logdata.map(item=>({...item}));
                setDataReadFromAPI(true);
              });
        }
        
        const getuserchlnglogdata=getLogData.filter((ld1)=>ld1.chlngid==chlngid && ld1.userid==userid);   
        const nonDuplicatesLog=[...new Map(getuserchlnglogdata.map(item=>[
                                   `${item.userid}-${item.chlngid}-${item.logdate}`
                                   ,item
                                  ])).values()];    
        const sortedUsrChlngData = [...nonDuplicatesLog].sort(
              (a, b) => new Date(b.logdate) - new Date(a.logdate) // DESC
            );         
            
        setUsrChlgLog(sortedUsrChlngData?sortedUsrChlngData:null);
        setTodayDayCount(parseInt(daysPass) +1);
        const today=getToday();
        
        if(sortedUsrChlngData.length>0){
        const lastLogDate=sortedUsrChlngData[0].logdate;
        setIsDisabled((today==lastLogDate)?true:false);
        }        
        setDaysPassed(isDisabled?parseInt(daysPass)+1:parseInt(daysPass));
        setDaysRemaining(isDisabled?(parseInt(duration)-(parseInt(daysPass)+1)):(parseInt(duration)-parseInt(daysPass)));
        
      }

 },[isDisabled,challengeId])

 
const longest=CalculateLongestStreak(usrChlgLog);
const cs=CalculateCurrentStreak(usrChlgLog);



const fulldata = Array.from({ length: duration }, (_, i) => ({
    day: `Day ${i + 1}`,
    value: i + 1,
  }));

const data=fulldata.map((item,idx) =>({
    ...item,
  value: idx < (isDisabled?daysPassed+1:daysPassed) ?(((chlngid==1) && (idx==13) ?0:item.value)) : null,
  isMissing:(chlngid==1) && (idx==13)?true:false,
  upcomingdays:(idx>=(usrChlgLog.length+2))?true:false
  }))


 const yesterday= getYesterday();

 const tod=getToday();

const handleLogActivity=()=>{
  const today=new Date().toISOString().split("T")[0];
  const addLog={    
        "userid":userid,
        "chlngid":chlngid,
        "logdate":tod,
        "Day":todayDayCount
  }
  dispatch(addToLog(addLog));
  
  setIsDisabled(true)
  setDaysPassed(parseInt(daysPass)+1);
  
};

const navigate=useNavigate();
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-4">
        <button className="text-sm text-blue-600 mb-2" onClick={()=>navigate(-1)}>
          ← Back to Dashboard

        </button>

        <div className="flex items-center gap-3">
          <span className="bg-blue-100 text-blue-600 px-3 py-1 text-xs rounded-full">
            {cat}
          </span>
          <span className="text-xs text-gray-500">{daysRemaining} days remaining</span>
        </div>

        <h1 className="text-2xl font-bold mt-2 text-left">
          {title}
        </h1>
      </div>

      {/* Top Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Daily Check-In */}
          <div className="border border-red-300 rounded-xl p-4 flex justify-between items-center">
            <div>
              <h2 className="font-semibold text-left">Daily Check-In</h2>
              <p className="text-sm text-gray-500">
                Have you completed today’s activity? Log your progress to keep your streak alive!
              </p>
            </div>
            <button className={`px-4 py-2 rounded-lg text-sm ${isDisabled ? "bg-gray-300 cursor-not-allowed text-white-200" :"bg-red-500 text-white"} `}
                    disabled={isDisabled}
                    onClick={()=>handleLogActivity()}
                    >
              Log Today's Activity
            </button>
          </div>

          {/* Progress Section */}
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="font-semibold mb-4">Your Progress</h3>
            <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            
            <defs>
              <linearGradient id="colorLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis domain={[0, duration]} tick={{ fontSize: 12 }} />

            <Tooltip />
            {data.map((item, i) =>
                item.isMissing ? (
                <ReferenceLine
                  key={i}
                  x={item.day}
                  stroke="red"
                  strokeDasharray="4 4"
                />
              ) : null
)}
            <Line
              type="monotone"
              dataKey="value"
              stroke="url(#colorLine)"
              strokeWidth={3}
              //dot={{ r: 5, fill: "#ef4444" }}
              dot={({ payload, cx, cy }) => {
                      if (payload.isMissing) {
                        return (
                          <text
                            x={cx}
                            y={cy - 10}
                            textAnchor="middle"
                            fill="red"
                            fontSize={16}
                          >
                          ↓
                          </text>
                        );
                      }
                      if(payload.upcomingdays){
                        return null
                      }

                    return <circle cx={cx} cy={cy} r={5} fill="#ef4444" />;
                  }}
              activeDot={{ r: 7 }}
              isAnimationActive={true}
              animationDuration={2500}
              animationEasing="ease-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

          </div>

          {/* Activity Log */}
          <div className="bg-white p-4 rounded-xl shadow-sm h-[600px] overflow-scroll flex flex-col gap-4">
            <h3 className="font-semibold mb-4">Activity Log</h3>

            {Array.isArray(usrChlgLog)?         
            (usrChlgLog.map((ld, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-4 rounded-lg py-2 border border-black/10"
              >
                <div>
                  <p className="font-medium text-left">Day {ld.Day}   -   {ld.logdate}</p>
                  <p className="text-xs text-gray-500">
                    Completed morning yoga session
                  </p>
                </div>
                <span className="text-xs text-gray-400">
                  {(tod == ld.logdate)
                    ? "Today"
                    : (yesterday == ld.logdate)
                    ? "Yesterday"
                    : `${new Date().getDate() - new Date(ld.logdate).getDate()} days ago`}
                </span>
              </div>))
            ):<div></div>
            }
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="font-semibold mb-4">Your Stats</h3>

            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">Days Completed</span>
              <span className="font-semibold">{daysPassed}</span>
            </div>

            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">Current Streak</span>
              <span className="font-semibold">{cs}</span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-gray-500">Your Rank</span>
              <span className="font-semibold">#47</span>
            </div>
          </div>

          {/* Challenge Goal */}
          <div className="bg-white p-4 rounded-xl shadow-sm text-left flex flex-col gap-4">
            <h3 className="font-semibold mb-4">Challenge Goal</h3>

            <div className='bg-blue-100 p-4 rounded-xl shadow-sm'>
            <p className="text-sm text-gray-500 mb-2">Target</p>
            <p className="font-medium mb-3">
              {goal}
            </p>
            </div>

            <div className='bg-blue-100 p-4 rounded-xl shadow-sm'>
            <p className="text-sm text-gray-500">Duration</p>
            <p className="font-medium mb-3">{duration} days</p>
            </div>

            <div className='bg-blue-100 p-4 rounded-xl shadow-sm'>
            <p className="text-sm text-gray-500">End Date</p>
            <p className="font-medium mb-3">{enddate}</p>
            </div>
          </div>

          {/* Milestones */}
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="font-semibold mb-4">Milestones</h3>

            {[
              "7-Day Streak",
              "14-Day Streak",
              "21-Day Streak",
              "Complete Challenge",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <span className="w-4 h-4 rounded-full bg-green-500"></span>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyChallenge

const CalculateLongestStreak=(usrChlgLog)=>{
  if (!usrChlgLog.length) return 0;
   const sortedByLogdt = [...usrChlgLog].sort((a, b) =>new Date(a.logdate)-new Date(b.logdate));
            
             let longest = 1;
            let current = 1;

  for (let i = 1; i < sortedByLogdt.length; i++) {
    const prev = new Date(sortedByLogdt[i - 1].logdate);
    const curr = new Date(sortedByLogdt[i].logdate);

    const diffDays = (curr - prev) / (1000 * 60 * 60 * 24);

    if (diffDays === 1) {
      current++;
      longest = Math.max(longest, current);
    } else {
      current = 1;
    }
  }

   return longest;

};

const CalculateCurrentStreak = (usrChlgLog) => {
  if (!usrChlgLog.length) return 0;

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


const getYesterday = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getToday = () => {
  const d = new Date();
  d.setDate(d.getDate());

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
const parseDate = d => {
  const [day, month, year] = d.split("/").map(Number);
  return new Date(year, month - 1, day);
};