import { useState, useLayoutEffect, useRef, useEffect } from 'react';
import { MdEventNote, MdWarning } from 'react-icons/md';
import { GiSpinningSword, GiTrophyCup } from 'react-icons/gi';
import { fetchEvents } from '../../services/event.service.js';
import { ImSpinner8 } from 'react-icons/im';
import './event.css';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const isFetched = useRef(false);

    const getEvents = async () => {
        setLoading(true);
        try {
            const cachedData = sessionStorage.getItem('events');

            if (cachedData) {
                try {
                    const parsedData = JSON.parse(cachedData);
                    if (Array.isArray(parsedData) && parsedData.length > 0) {
                        setEvents(parsedData);
                        setLoading(false);
                        return;
                    }
                } catch {
                    sessionStorage.removeItem('events');
                }
            }

            const response = await fetchEvents();
            if (!response.success || !Array.isArray(response.data)) {
                throw new Error('Failed to load events');
            }

            const data = response.data;
            if (data.length > 0) {
                setEvents(data);
                sessionStorage.setItem('events', JSON.stringify(data));
                isFetched.current = true;
            } else {
                sessionStorage.removeItem('events'); // Clear only if response is empty
            }
        } catch (error) {
            setError(error.message || 'Failed to load events');
        } finally {
            setLoading(false);
        }
    };

    useLayoutEffect(() => {
        if (!isFetched.current) {
            getEvents();
        }
    }, []);

    if (loading) {
        return (
            <div className="min-h-[300px] flex items-center justify-center bg-gray-900/50 rounded-2xl">
                <ImSpinner8 className="text-6xl text-blue-400 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-red-400 text-xl"
            >
                <MdWarning className="mr-3 text-3xl" />
                {error}
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border-2 border-blue-500/30 shadow-2xl">
            <h2 className="text-3xl font-bold text-purple-400 mb-8 font-orbitron flex items-center gap-3">
                <GiSpinningSword className="text-4xl animate-spin-slow" />
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    UPCOMING WARZONES
                </span>
            </h2>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                    <div
                        key={event._id}
                        className="group bg-gray-800/50 rounded-xl border-2 border-purple-500/30 hover:border-blue-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden"
                    >
                        {/* Event Thumbnail */}
                        <div className="relative h-48 bg-gray-700 overflow-hidden">
                            {event.thumbnail?.url && (
                                <img
                                    src={event.thumbnail.url}
                                    alt={event.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                <h3 className="text-xl font-bold text-blue-300 truncate">
                                    {event.title}
                                </h3>
                                <p className="text-sm text-purple-300 mt-1">
                                    {new Date(event.eventDate).toLocaleString('en-IN', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                    })}
                                </p>
                            </div>
                        </div>

                        {/* Event Details */}
                        <div className="p-4">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="bg-purple-900/20 p-3 rounded-lg border border-purple-500/30 hover:bg-purple-900/30 transition-colors">
                                    <div className="flex items-center gap-2 text-sm text-purple-300 mb-1">
                                        <GiTrophyCup />
                                        Prize Pool
                                    </div>
                                    <div className="text-lg font-bold text-purple-400">
                                        ₹{event.prizeMoney}
                                    </div>
                                </div>
                                <div className="bg-blue-900/20 p-3 rounded-lg border border-blue-500/30 hover:bg-blue-900/30 transition-colors">
                                    <div className="flex items-center gap-2 text-sm text-blue-300 mb-1">
                                        <GiSpinningSword />
                                        Entry Fee
                                    </div>
                                    <div className="text-lg font-bold text-blue-400">
                                        ₹{event.entryFee}
                                    </div>
                                </div>
                            </div>

                            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-blue-500/30">
                                <span>ENLIST NOW</span>
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    ➔
                                </span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;