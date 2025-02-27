import React from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '../index.js'
import { FaDiscord, FaTwitter, FaGithub, FaInstagram, FaSteam } from 'react-icons/fa'

export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-gray-900 to-gray-800 border-t-2 border-blue-500/30 shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
                    {/* Logo Section */}
                    <div className="space-y-4">
                        <Link to="/" className="inline-block">
                            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-3 rounded-xl border-2 border-blue-500/30 hover:border-blue-400/50 transition-all">
                                <Logo className="h-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400" />
                            </div>
                        </Link>
                        <p className="text-gray-400 text-sm">
                            Unleash your gaming potential in our state-of-the-art arena
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-blue-400 font-bold uppercase text-sm font-orbitron tracking-wider">
                            Warp Zones
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { to: '/', name: 'Home Base' },
                                { to: '/game-catalogue', name: 'Armory' },
                                { to: '/events', name: 'Battlegrounds' },
                                { to: '/contact', name: 'Command Center' },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.to}
                                        className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group"
                                    >
                                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div className="space-y-4">
                        <h3 className="text-purple-400 font-bold uppercase text-sm font-orbitron tracking-wider">
                            Squad Comms
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: <FaDiscord className="text-2xl" />, name: 'Discord' },
                                { icon: <FaTwitter className="text-2xl" />, name: 'Twitter' },
                                { icon: <FaInstagram className="text-2xl" />, name: 'Instagram' },
                                { icon: <FaSteam className="text-2xl" />, name: 'Steam' },
                            ].map((social) => (
                                <a
                                    key={social.name}
                                    href="#"
                                    className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors"
                                >
                                    {social.icon}
                                    <span>{social.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Legal */}
                    <div className="space-y-4">
                        <h3 className="text-green-400 font-bold uppercase text-sm font-orbitron tracking-wider">
                            Codex
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { to: '#', name: 'Privacy Protocol' },
                                { to: '#', name: 'Terms of Engagement' },
                                { to: '#', name: 'Cookie Directive' },
                                { to: '#', name: 'Security Manifesto' },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.to}
                                        className="text-gray-300 hover:text-green-400 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-blue-500/20 my-8" />

                {/* Copyright */}
                <div className="flex flex-col md:flex-row md:justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-gray-400 text-sm text-center">
                        © {new Date().getFullYear()} MadGear Arena. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <span className="text-gray-400 text-sm">v2.1.5</span>
                        <span className="text-gray-400 text-sm">🔒 SSL Secured</span>
                        <span className="text-gray-400 text-sm">🕹️ #StayInTheGame</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}