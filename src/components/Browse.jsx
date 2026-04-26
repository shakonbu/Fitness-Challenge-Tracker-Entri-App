import React, { useEffect, useRef, useState } from 'react'
import run from '../assets/run_100_miles.jpg'
import walking from '../assets/10kSteps.avif'
import medi from '../assets/meditation.webp'
import cycling from '../assets/cycling.avif'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

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
//       goal:"",
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
//       goal:"",
//     },
//     {
//       id:"6",  
//       title: "Cycling Century",
//       category: "Cycling",
//       level: "Intermediate",
//       image: cycling,
//       participants: "654",
//       description:"Ride 100 kilometers over the next two weeks. Explore new routes and build cycling endurance!",
//       duration:"14 days",
//       goal:"",
//     },
//   ];
const Browse = () => {
    const [cid,setCid]=useState();
    const [challenges,setChallenges]=useState([]);
  const navigate=useNavigate();
  const [allCategories,setAllCategories]=useState([]);
  const [allLevels,setAllLevels]=useState([]);
  const [selectedCat, setSelectedCat] = useState("All Categories");
  const [selectedLev, setSelectedLev] = useState("All Levels");
  const[filteredChlngs,setFilteredChlngs]=useState([]);
  const [searchtext,setSearchtext]=useState();
  const recognitionRef = useRef(null);


  useEffect(()=>{
    axios.get("https://raw.githubusercontent.com/shakonbu/FitChallengesData/refs/heads/main/ChallengesData.json")
    .then((res)=>{
          const chlngData=res.data;
          setChallenges(chlngData);
          const allCat=[...new Set(chlngData.map(item=>item.category))];
          setAllCategories(allCat)

          const allLev=[...new Set(chlngData.map(item=>item.level))];
          setAllLevels(allLev);          
          setFilteredChlngs(chlngData);

    })
  },[])

  
    const handleViewChallenge=(e,cid)=>{
           e.preventDefault();
            setCid(cid);
            navigate(`/challenge/${cid}`);
    };

    const handleCatgSelection=(e)=>{        
        setSelectedCat(e.target.value)
        const catg= e.target.value;
        if(catg==="All Categories" && selectedLev==="All Levels"){
          setFilteredChlngs(challenges);
        }
        else if(catg!="All Categories" && selectedLev!="All Levels"){
          let filchlng=challenges.filter((chng)=>chng.level==selectedLev);
          filchlng=filchlng.filter((chng)=>chng.category==catg)
        setFilteredChlngs(filchlng);
        }
        else if(catg=="All Categories")
        {
          const filterCategChlng=challenges.filter((chng)=>chng.level==selectedLev);
          setFilteredChlngs(filterCategChlng);
        }
        else
        {
          const filterCategChlng=challenges.filter((chng)=>chng.category==catg);
          setFilteredChlngs(filterCategChlng);
        }
    };

    const handleLevSelection=(e)=>{        
        setSelectedLev(e.target.value)
        const lev= e.target.value;
        if(selectedCat==="All Categories" && lev==="All Levels"){
          setFilteredChlngs(challenges);
        }
        else if(selectedCat!="All Categories" && lev!="All Levels"){
          let filterCategChlng=challenges.filter((lvl)=>lvl.category==selectedCat);
          filterCategChlng=filterCategChlng.filter((lvl)=>lvl.level==lev)
        setFilteredChlngs(filterCategChlng);
        }
          else{
        const filterCategChlng=challenges.filter((chng)=>chng.level==lev);
        setFilteredChlngs(filterCategChlng);}
    };

    const handlesearch=(e)=>{
      if(searchtext!=undefined)
      {
      const chlngsbysrch=filteredChlngs.filter((fitem)=>fitem.title.includes(searchtext) || fitem.description.includes(searchtext));
      setFilteredChlngs(chlngsbysrch);
      }
    };

    const handleSearchByVoice=(e)=>{      
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert("Speech recognition not supported");
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.start();

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchtext(transcript);
       
        const chlngsbysrch=challenges.filter((fitem)=>fitem.title.includes(transcript) || fitem.description.includes(transcript));
        setFilteredChlngs(chlngsbysrch);
      };

      recognition.onerror = () => {
        alert("Error occurred while listening");
      };

      recognitionRef.current = recognition;
    
    }
    
  return (
    <div className="container bg-gray-50 px-20">
     {/* Title */}
      <h3 className="!text-4xl font-bold mb-2 text-left">Browse Challenges</h3>
      <p className="text-gray-500 text-sm mb-2 text-left">
        Discover fitness challenges that match your goals and fitness level
      </p>

      {/* Search + Filters */}
      <div className="py-6 flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search challenges..."
          className="bg-white-500 flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          style={{background:"white",border:"none",height:"35px"}}
          onChange={(e)=>setSearchtext(e.target.value)}
          value={searchtext} 
        />
        <button
        onClick={(e)=>{handleSearchByVoice(e)}}
        className="ml-2 text-gray-600 hover:text-green-500"
        >
        🎤
       </button>
        {/* <input type="button" id="button-search" onClick={(e)=>{handlesearch(e)}} value="Search"/> */}
          <button className="text-sm text-blue-500" onClick={(e)=>{handlesearch(e)}}>Search</button>
      

        <select className="px-1 py-1 border rounded-md text-sm" style={{height:"35px"}} 
        valaue={selectedCat}
        onChange={(e)=>{handleCatgSelection(e)}}>
          <option key='0' value='All Categories'>All Categories</option>
          {
          Array.isArray(allCategories)?
          allCategories.map((item,index)=>(
            <option key={index+1} value={item}>{item}</option>
          ))
          :<option></option>
          }
        </select>

        <select className="px-1 py-1 border rounded-md text-sm" style={{height:"35px"}}
        valaue={selectedLev}
        onChange={(e)=>{handleLevSelection(e)}}>
          <option key='0' value='All Levels'>All Levels</option>
          {
            
            Array.isArray(allLevels)?
            allLevels.map((item,index)=>(
              <option key={index+1} value={item}>{item}</option>
            ))
            :
            <option></option>
          }
          
        </select>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {
          Array.isArray(filteredChlngs) && filteredChlngs.length>0?
        filteredChlngs.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden group"
           >
            {/* Image */}
            <img
              src={item.image}
              alt={item.title}
              className="h-48 w-full object-cover transition-all duration-300 group-hover:z-50 group-hover:scale-110"
            />

            {/* Content */}
            <div className="p-4">
              {/* Tags */}
              <div className="flex gap-2 mb-2">
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                  {item.category}
                </span>
                <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                  {item.level}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-bold !text-black-900 text-lg text-sm text-left group-hover:text-orange-500">{item.title}</h3>

              {/* Description */}
              <p className="text-black-100 text-xs mt-3 text-left">
                {item.description}
              </p>

              {/* Footer */}
              <div className="text-gray-400 text-sm/1 mt-6 text-left">
                👥 {item.participants} participants
              </div>
              <div className="text-gray-400 text-sm/1 mt-6 text-left">
                🗓️ {item.duration} days
              </div>
            </div>
            <div>
                {/* <Link to="/challenge"> */}
                <button className='bg-orange-500 w-100 text-white inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium'
                onClick={(e)=>handleViewChallenge(e,item.id)}>
                    View Challenge
                </button>
                {/* </Link> */}
            </div>
          </div>
        ))
        :
        <div className='flex flex-col justify-start gap-2'> 
          <div className='text-left text-sm'>No challenges found</div>
          <div className='text-left text-xs'>Try adjusting your filters or search query</div> 
        </div>
        
        }
      </div>
    </div>
  );
}

export default Browse