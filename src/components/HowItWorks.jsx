import React from 'react'
import sarah from '../assets/sarah.avif'
import emma from '../assets/Emma.jpg'
import mike from '../assets/mike.jpg'
import Signup from './Signup'
import { Link } from 'react-router-dom'

const HowItWorks = () => {
   
  return (
    <>
     <div className="min-h-screen bg-white">
         {/* Heading */}
      <section className="text-center py-16 px-4">
        <h2 className="text-4xl font-bold mb-3">How It Works</h2>
        <p className="text-gray-500">Get started in three simple steps</p>
      </section>

      {/* Steps */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-10 text-center">

          {/* Step 1 */}
          <div>
            <div className="w-14 h-14 mx-auto rounded-full bg-red-500 text-white flex items-center justify-center text-lg font-bold mb-4">
              1
            </div>
            <h3 className="font-semibold text-lg mb-2">Choose a Challenge</h3>
            <p className="text-gray-500 text-sm">
              Browse hundreds of fitness challenges tailored to every fitness level and goal.
            </p>
          </div>

          {/* Step 2 */}
          <div>
            <div className="w-14 h-14 mx-auto rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-bold mb-4">
              2
            </div>
            <h3 className="font-semibold text-lg mb-2">Log Your Progress</h3>
            <p className="text-gray-500 text-sm">
              Check in daily, track your workouts, and watch your progress grow over time.
            </p>
          </div>

          {/* Step 3 */}
          <div>
            <div className="w-14 h-14 mx-auto rounded-full bg-green-500 text-white flex items-center justify-center text-lg font-bold mb-4">
              3
            </div>
            <h3 className="font-semibold text-lg mb-2">Achieve Together</h3>
            <p className="text-gray-500 text-sm">
              Celebrate milestones, earn badges, and inspire others in the community.
            </p>
          </div>

        </div>
      </section>
    </div>
    <div className="min-h-screen bg-white" style={{marginTop:'-150px'}}>
         {/* Heading */}
      <section className="text-center py-16 px-4">
        <h2 className="text-4xl font-bold mb-3">Join Thousands of Success Stories</h2>
        {/* <p className="text-gray-500">Get started in three simple steps</p> */}
      </section>

      {/* Steps */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-10 text-center">
        {/* story 1 */}
         <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white border border-gray-200">
            <img className="w-full" src={sarah} alt='title' />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Sarah M.</div>
                    <div className='font-bold text-xs mb-2'>Completed 8 challenges</div>
                        <p className="text-gray-700 text-base">"FitChallenge helped me build a consistent workout routine. The community support is incredible!"</p>
                </div>
        </div>
        {/* story 2 */}
         <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white border border-gray-200">
            <img className="w-full" src={mike} alt='title' />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Mike R.</div>
                    <div className='font-bold text-xs mb-2'>14-day streak</div>
                        <p className="text-gray-700 text-base">"I've never been more motivated. The challenges keep me accountable and the progress tracking is awesome."</p>
                </div>
        </div> 
        {/* story 3 */}
         <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white border border-gray-200">
            <img className="w-full" src={emma} alt='title' />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Emma L.</div>
                    <div className='font-bold text-xs mb-2'>Top 10 rank</div>
                        <p className="text-gray-700 text-base">"Love the variety of challenges! There's something for everyone, no matter your fitness level."</p>
                </div>
        </div>
        </div>
      </section>
    </div>

    <div className="w-full py-20 px-4 flex items-center justify-center 
      bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600">

      <div className="text-center max-w-2xl">
        
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Start Your Journey?
        </h1>

        {/* Subtext */}
        <p className="text-white/80 text-sm md:text-base mb-6">
          Join our community today and transform your fitness goals into achievements.
        </p>

        <Link to='/signup'>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full 
          shadow-lg transition duration-300 flex items-center gap-2 mx-auto">
          
          Get Started Free 
          <span className="text-lg">→</span>
        </button>
        </Link>
      </div>
    </div>
    </>
  );
  
}

export default HowItWorks