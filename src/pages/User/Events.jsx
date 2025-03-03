import { useState, useRef, useLayoutEffect } from 'react';
import { MdEventNote, MdWarning } from 'react-icons/md';
import { GiSpinningSword } from 'react-icons/gi';
import { fetchEvents } from '../../services/event.service.js';
import { ImSpinner8 } from 'react-icons/im';

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
                    setEvents(Array.isArray(parsedData) ? parsedData : []);
                } catch {
                    sessionStorage.removeItem('events');
                    setEvents([]);
                }
                setLoading(false);
                return;
            }

            const response = await fetchEvents();
            if (!response.success) {
                setError(error.message || "Failed to load events");
            }

            const data = Array.isArray(response.data) ? response.data : [];
            setEvents(data);
            sessionStorage.setItem('events', JSON.stringify(data));
            isFetched.current = true;
        } catch (error) {
            setError(error.message || "Failed to load events");
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
            <div className="bg-red-900/20 p-8 rounded-2xl border-2 border-red-500/30 flex items-center justify-center space-x-4">
                <MdWarning className="text-4xl text-red-400" />
                <p className="text-red-400 text-xl">{error}</p>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border-2 border-blue-500/30 shadow-2xl">
            <h2 className="text-3xl font-bold text-purple-400 mb-6 font-orbitron flex items-center gap-3">
                <GiSpinningSword className="text-4xl" />
                UPCOMING BATTLES
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2">
                {events.map((event) => (
                    <div 
                        key={event._id}
                        className="bg-gray-800/50 p-6 rounded-xl border-2 border-purple-500/30 hover:border-blue-400/50 transition-colors"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <MdEventNote className="text-3xl text-blue-400 flex-shrink-0" />
                            <div className="ml-4 flex-1">
                                <h3 className="text-xl font-semibold text-blue-300">{event.title}</h3>
                                <p className="text-gray-400 mt-2">
                                    {new Date(event.eventDate).toLocaleString('en-IN', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                        // hour: '2-digit',
                                        // minute: '2-digit',
                                        // hour12: true
                                    })}
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <div className="bg-purple-900/20 p-3 rounded-lg border border-purple-500/30">
                                <span className="text-sm text-purple-300">Prize Pool</span>
                                <div className="text-lg font-bold text-purple-400">₹{event.prizeMoney}</div>
                            </div>
                            <div className="bg-blue-900/20 p-3 rounded-lg border border-blue-500/30">
                                <span className="text-sm text-blue-300">Entry Fee</span>
                                <div className="text-lg font-bold text-blue-400">₹{event.entryFee}</div>
                            </div>
                        </div>
                        <button className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
                            ENLIST NOW
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;