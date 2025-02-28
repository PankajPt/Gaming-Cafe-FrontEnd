import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'; // Import CSS directly

const Home = () => {
  return (
    <div className="home-container text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-start justify-center pt-32 bg-gradient-to-br from-gray-900 to-black">
      <div className="relative z-10 text-center px-4">
        {/* MADGEAR_ */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6 glow-text">
          MAD<span className="text-purple-500">GEAR</span>
          <span className="pixel-cursor">_</span>
        </h1>
        
        {/* >> LEVEL_UP YOUR GAME << */}
        <p className="text-xl md:text-3xl mb-8 font-mono text-cyan-300">
          {`>>`} LEVEL_UP YOUR GAME {`<<`}
        </p>

        {/* BOOK YOUR BATTLE STATION */}
        <Link 
          to="/login"
          className="inline-block px-8 py-4 bg-purple-600 hover-glow neon-border rounded-lg text-xl font-bold"
        >
          BOOK YOUR BATTLE STATION
        </Link>
      </div>

        {/* Scrolling Game Characters */}
        <div className="absolute bottom-32 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent">
          <div className="flex marquee whitespace-nowrap">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <>
                  <img 
                    key={`valorant-${i}`} 
                    src="/assets/valorant-char.png" 
                    className="h-48 w-auto mx-12 transform hover:scale-110 transition-transform duration-300" 
                    alt="valorant" 
                  />
                  <img 
                    key={`csgo-${i}`} 
                    src="/assets/csgo-char.png" 
                    className="h-48 w-auto mx-12 transform hover:scale-110 transition-transform duration-300" 
                    alt="csgo" 
                  />
                  <img 
                    key={`dota-${i}`} 
                    src="/assets/GTA5.png" 
                    className="h-48 w-auto mx-12 transform hover:scale-110 transition-transform duration-300" 
                    alt="dota" 
                  />
                  <img 
                    key={`dota-${i}`} 
                    src="/assets/dota-char.png" 
                    className="h-48 w-auto mx-12 transform hover:scale-110 transition-transform duration-300" 
                    alt="dota" 
                  />
                  <img 
                    key={`dota-${i}`} 
                    src="/assets/chain_together.png" 
                    className="h-48 w-auto mx-12 transform hover:scale-110 transition-transform duration-300" 
                    alt="dota" 
                  />
                  <img 
                    key={`dota-${i}`} 
                    src="/assets/GTA.png" 
                    className="h-48 w-auto mx-12 transform hover:scale-110 transition-transform duration-300" 
                    alt="dota" 
                  />
                </>
              ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 -translate-y-10">
        {/* <div className="relative z-10 text-center px-4 transform "> */}
          <div className="hover-glow neon-border p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Premium Gaming Rigs</h3>
            <p>RTX 4090 | i9 13900K | 32GB DDR5</p>
          </div>
          <div className="hover-glow neon-border p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Esports Arena</h3>
            <p>Competitive Tournaments | Leaderboards</p>
          </div>
          <div className="hover-glow neon-border p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">VR Zone</h3>
            <p>Meta Quest Pro | Valve Index</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;