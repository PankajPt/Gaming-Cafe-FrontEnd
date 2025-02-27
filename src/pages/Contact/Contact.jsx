import React from 'react'
import { whatsappIcon } from '../../assets/index.assets.js'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import { GiCircuitry } from 'react-icons/gi'

export default function Contact() {
    const whatsappLink = 'https://wa.me/917835808909'
    return (
        <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 z-0">
                <div className="w-full h-full pattern-circuit-board-gray-500/20" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16 space-y-6">
                    <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-orbitron tracking-wide">
                        NEED EXTRA LIVES?
                    </h2>
                    <p className="text-xl text-gray-300 mt-4 animate-pulse">
                        No Cheat Codes Needed — Just Connect!
                    </p>
                    <div className="flex justify-center">
                        <div className="w-48 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                    </div>
                </div>

                {/* Contact Cards Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/30 p-8 rounded-2xl border-2 border-blue-500/30 shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)]">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="p-4 bg-blue-500/20 rounded-full">
                                <FaPhoneAlt className="text-3xl text-blue-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-blue-400 font-orbitron">Voice Channel</h3>
                            <p className="text-gray-300 text-lg">(91) 7835808909</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/30 p-8 rounded-2xl border-2 border-blue-500/30 shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)]">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="p-4 bg-purple-500/20 rounded-full">
                                <FaEnvelope className="text-3xl text-purple-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-purple-400 font-orbitron">Digital Courier</h3>
                            <p className="text-gray-300 text-lg break-all">contact@madgear.com</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/30 p-8 rounded-2xl border-2 border-blue-500/30 shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)]">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="p-4 bg-green-500/20 rounded-full">
                                <FaMapMarkerAlt className="text-3xl text-green-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-green-400 font-orbitron">Base Camp</h3>
                            <p className="text-gray-300 text-lg text-center">
                                Shop no. 1, Nirmal Heights, Sector 51, Near Dev Krupa Dronagiri, Navi Mumbai
                            </p>
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border-2 border-blue-500/30 shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)]">
                    <h3 className="text-2xl font-bold text-blue-400 mb-6 text-center font-orbitron">
                        STRATEGIC POSITIONING MAP
                    </h3>
                    <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-blue-500/20">
                        <iframe
                            title="MadGear Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3775.259925528883!2d72.964939!3d18.875546699999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7db6f81e7d50f%3A0xc7baaee068f17bd1!2sMadgear%20Gaming%20Cafe!5e0!3m2!1sen!2sin!4v1736951645128!5m2!1sen!2sin"
                            className="w-full h-full"
                            allowFullScreen
                            loading="lazy"
                        />
                        <div className="absolute inset-0 border-2 border-blue-500/20 rounded-xl pointer-events-none" />
                    </div>
                </div>

                {/* WhatsApp Floating Button */}
                <a 
                    href={whatsappLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="fixed bottom-8 right-8 group animate-bounce hover:animate-none"
                >
                    <div className="relative bg-green-500 p-3 rounded-full shadow-2xl hover:shadow-green-glow transition-all duration-300 group-hover:scale-110">
                        <img src={whatsappIcon} alt="WhatsApp" className="w-14 h-14" />
                        <div className="absolute inset-0 rounded-full border-2 border-green-400/30 animate-ping group-hover:animate-none" />
                    </div>
                </a>
            </div>
        </section>
    );
}