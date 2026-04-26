import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* <header className="flex items-center justify-between px-8 py-4 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg"></div>
          <h1 className="text-xl font-bold">BurnTrack</h1>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#" className="hover:text-orange-500">Features</a>
          <a href="#" className="hover:text-orange-500">How It Works</a>
          <a href="#" className="hover:text-orange-500">Sign In</a>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
            Get Started
          </button>
        </nav>
      </header> */}

      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-10 items-center px-8 py-16 max-w-7xl mx-auto">
        {/* Left Content */}
        <div>
          <p className="text-sm bg-orange-100 text-orange-600 px-3 py-1 rounded-full inline-block mb-4">
            Join 10,000+ Active Members
          </p>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Transform Your Fitness Journey <span className="text-orange-500">Together</span>
          </h2>

          <p className="text-gray-600 mb-6">
            Join community challenges, track your progress, and achieve your fitness goals with support from thousands of motivated individuals.
          </p>

          <div className="grid items-center px-3 py-1 inline-block mnb-4">
            <Link to="/signup">
            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600">
              Get Started Free ➜
            </button></Link>
            {/* <button className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100">
              Browse Challenges
            </button> */}
          </div>
        </div>

        {/* Right Image */}
        <div>
          <img
            src="https://images.unsplash.com/photo-1599058917212-d750089bc07e"
            alt="Workout"
            className="rounded-2xl shadow-lg"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-10">Why BurnTrack?</h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-2xl shadow-sm">
              <h4 className="font-semibold text-lg mb-2">Track Progress</h4>
              <p className="text-gray-600 text-sm">
                Monitor your workouts, calories, and performance easily.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-sm">
              <h4 className="font-semibold text-lg mb-2">Join Challenges</h4>
              <p className="text-gray-600 text-sm">
                Compete with others and stay motivated every day.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-sm">
              <h4 className="font-semibold text-lg mb-2">Stay Consistent</h4>
              <p className="text-gray-600 text-sm">
                Build habits and reach your fitness goals faster.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer
      <footer className="text-center py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} BurnTrack. All rights reserved.
      </footer> */}
    </div>
  );
  
}

export default Home