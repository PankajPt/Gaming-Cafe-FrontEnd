import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'; // Import CSS directly

const Home = () => {
  return (
    <div className="home-container text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-start justify-center pt-20 bg-gradient-to-br from-gray-900 to-black">
  <div className="relative z-10 text-center px-4 -mt-8"> 
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
  <div className="rolling-container">
    <div className="marquee">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <>
          <img key={`valorant-${i}`} src="/assets/valorant-char.png" alt="valorant" />
          <img key={`csgo-${i}`} src="/assets/csgo-char.png" alt="csgo" />
          <img key={`gta5-${i}`} src="/assets/GTA5.png" alt="gta5" />
          <img key={`dota-${i}`} src="/assets/dota-char.png" alt="dota" />
          <img key={`chain-${i}`} src="/assets/chain_together.png" alt="chain together" />
          <img key={`gta-${i}`} src="/assets/GTA.png" alt="gta" />
        </>
      ))}
    </div>
  </div>
</section>

    </div>
  );
};

export default Home;