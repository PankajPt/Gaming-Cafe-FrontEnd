import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'; // Import CSS directly

const Home = () => {
  return (
    <div className="home-container text-white overflow-hidden flex flex-col items-center">
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-12 md:pt-20 w-full">
        <div className="relative z-10 text-center px-4 -mt-8 w-full">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-6 glow-text mx-auto">
            MAD<span className="text-purple-500">GEAR</span>
            <span className="pixel-cursor">_</span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-3xl mb-4 md:mb-8 font-mono text-cyan-300 mx-auto">
            {`>>`} LEVEL_UP YOUR GAME {`<<`}
          </p>

          <Link 
            to="/login"
            className="inline-block px-4 md:px-8 py-2 md:py-4 bg-purple-600 hover-glow neon-border rounded-lg text-base md:text-xl font-bold mx-auto"
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
