import React from 'react'
import { whatsappIcon } from '../../assets/index.assets.js'
export default function Contact() {
    const whatsappLink = 'https://wa.me/917835808909'
    return (
        <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold">Need Extra Lives? Reach Out!</h2>
            <p className="mt-4 text-xl">No Cheat Codes Needed—Just Reach Out!</p>
                <div className="mt-6">
                <p className="text-lg">Phone: (91) 7835808909</p>
                <p className="text-lg">Email: contact@madgear.com</p>
                <p className="text-lg">Address: Shop no. 1, Nirmal Heights, Sector no. 51, near Dev Krupa Dronagiri, Uran, Dronagiri, Navi Mumbai, Maharashtra 400702</p>
                
                </div>
            <div className="mt-10">
            <h3 className="text-2xl font-semibold">Gamers Assemble Here! 👇</h3>
                <div className="mt-4">
                    <iframe
                    title="MadGear Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3775.259925528883!2d72.964939!3d18.875546699999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7db6f81e7d50f%3A0xc7baaee068f17bd1!2sMadgear%20Gaming%20Cafe!5e0!3m2!1sen!2sin!4v1736951645128!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    style={{ border: 0, width: '100%', height: '350px' }}
                    allowFullScreen=""
                    loading="lazy"
                    ></iframe>
                    <a 
                        href={whatsappLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="fixed bottom-4 right-4 bg-green-500 p-3 rounded-full shadow-lg hover:bg-green-600"
                    >
                        <img src={whatsappIcon} alt="WhatsApp Chat" className="w-12 h-12" />
                    </a>
                </div>
            </div>
        </div>
        </section>

    );
}