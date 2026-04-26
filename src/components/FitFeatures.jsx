import React from 'react'

const FitFeatures = () => {
  return (
     <div className="min-h-screen bg-white">
            {/* Heading */}
      <section className="text-center py-16 px-4">
        <h2 className="text-4xl font-bold mb-4">
          Everything You Need to Succeed
        </h2>
        <p className="text-gray-500">
          Powerful features to keep you motivated and on track
        </p>
      </section>

      {/* Features Cards */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white border border-orange-500 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="w-70 h-10 flex items-center justify-center">
            <div className="w-10 h-10 bg-pink-100 text-pink-500 flex items-center justify-center rounded-lg mb-4">
              🎯
            </div>
            </div>
            <h3 className="font-semibold text-lg mb-2">Goal-Driven Challenges</h3>
            <p className="text-gray-500 text-sm">
              Join structured challenges designed to help you build lasting habits and reach your fitness milestones.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-orange-500 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="w-70 h-10 flex items-center justify-center">
            <div className="w-10 h-10 bg-blue-100 text-blue-500 flex items-center justify-center rounded-lg mb-4">
              👥
            </div>
            </div>
            <h3 className="font-semibold text-lg mb-2">Community Support</h3>
            <p className="text-gray-500 text-sm">
              Connect with like-minded individuals, share your progress, and stay motivated through community engagement.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-orange-500 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="w-70 h-10 flex items-center justify-center">
            <div className="w-10 h-10 bg-green-100 text-green-500 flex items-center justify-center rounded-lg mb-4">
              ⏱️
            </div>
            </div>
            <h3 className="font-semibold text-lg mb-2">Track Your Progress</h3>
            <p className="text-gray-500 text-sm">
              Monitor your achievements, build streaks, and climb the leaderboard as you complete challenges.
            </p>
          </div>
        </div>
      </section>
    </div>
  );  
}

export default FitFeatures