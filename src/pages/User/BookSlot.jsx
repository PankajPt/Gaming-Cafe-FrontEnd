import { useEffect, useState,useMemo } from "react";
import { fetchData } from "../../services/api.service";
import { useAuthHandler } from "../../hooks/authHandler.js";
import { FaCalendarAlt, FaRegClock, FaRegHeart, FaGamepad, FaSkullCrossbones } from "react-icons/fa";
import { toast } from "react-toastify";

const BookSlot = () => {
    const [availableSlots, setAvailableSlots] = useState([]);
    const [userBookings, setUserBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTimeFrame, setSelectedTimeFrame] = useState(null);
    const [isSlotExpired, setIsSlotExpired] = useState(false);
    const { refreshAndRetry, handleInvalidJWT } = useAuthHandler();

    const battleMessages = [
        "Lock and Load!",
        "Time to Dominate!",
        "Enemy Spotted!",
        "Victory or Death!",
        "No Prisoners!",
        "For Glory!",
        "Tactical Nuke Incoming!",
        "Headshot Ready!"
    ];

    // Date and time configuration
    const today = new Date();
    const { dates, timeFrames, displayDates } = useMemo(() => {
        const today = new Date();
        const calculatedDates = Array.from({ length: 7 }, (_, i) => {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            return date.toISOString().split("T")[0];
        });

        const calculatedDisplayDates = calculatedDates.map(date => 
            new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        );

        const calculatedTimeFrames = Array.from({ length: 12 }, (_, i) => {
            const hour = 10 + i;
            const startTime = `${hour % 12 || 12}${hour < 12 ? "AM" : "PM"}`;
            const endTime = `${(hour + 1) % 12 || 12}${hour + 1 < 12 ? "AM" : "PM"}`;
            return `${startTime}-${endTime}`;
        });

        return { 
            dates: calculatedDates, 
            timeFrames: calculatedTimeFrames,
            displayDates: calculatedDisplayDates
        };
    }, []);

    const [activeDate, setActiveDate] = useState(dates[0]);

    // Improved slot active check
    const isSlotActive = (date, timeFrame) => {
        const now = new Date();
        const slotDate = new Date(date);
        const isToday = slotDate.toDateString() === now.toDateString();
        
        if (!isToday) return true; // All future date slots are active
        
        const [startTime] = timeFrame.split('-');
        const slotDateTime = new Date(`${date}T${startTime}`);
        return slotDateTime > now;
    };

    // Unified API handler with auth retry logic
    const handleApiCall = async (endpoint, options) => {
        try {
            let response = await fetchData(endpoint, options);
            
            if (!response.success) {
                if (response.message === 'jwt expired') {
                    response = await refreshAndRetry(endpoint, options);
                    if (!response.success) return null;
                } else if (response.message === 'jwt malformed' || response.message === 'invalid signature') {
                    await handleInvalidJWT();
                    return null;
                }
            }
            return response;
        } catch (error) {
            console.error(`API Error (${endpoint}):`, error);
            toast.error(`Failed to process ${endpoint.split('/').pop()}`);
            return null;
        }
    };

    // Fetch available slots with auth handling
    const fetchAvailableSlots = async () => {
        const response = await handleApiCall('users/get-slots', { method: 'GET' });
        if (response?.success) {
            setAvailableSlots(response.data);
        }
    };

    // Fetch user bookings with auth handling
    const fetchUserBookings = async () => {
        const response = await handleApiCall('users/view-slots', { method: 'GET' });
        if (response?.success) {
            setUserBookings(response.data);
        } else if (response?.statusCode === 404) {
            setUserBookings([]);
        }
    };

    useEffect(() => {
        const initializeData = async () => {
            await Promise.all([fetchAvailableSlots(), fetchUserBookings()]);
            setLoading(false);
        };
        initializeData();
    }, []);

    // Handle slot booking with retry logic
    const handleBookSlot = async () => {
        if (!selectedDate || !selectedTimeFrame) {
            toast.error("Please select a date and time frame");
            return;
        }

        const options = {
            method: "POST",
            data: { 
                date: selectedDate,
                timeFrame: selectedTimeFrame 
            }
        };

        const response = await handleApiCall('users/book-slot', options);
        if (response?.success) {
            toast.success(response.message);
            // Refresh data after successful booking
            await Promise.all([fetchAvailableSlots(), fetchUserBookings()]);
            setSelectedDate(null);
            setSelectedTimeFrame(null);
        } else if (response) {
            toast.error(response.message);
        }
    };

    const convertTo24Hour = (timeStr) => {
        const [_, time, modifier] = timeStr.match(/(\d+)([AP]M)/);
        let hours = parseInt(time);
        if (modifier === 'PM' && hours !== 12) hours += 12;
        if (modifier === 'AM' && hours === 12) hours = 0;
        return hours.toString().padStart(2, '0');
    };

    const getSlotStatus = (date, timeFrame) => {
        const now = new Date();
        const isCurrentDate = date === new Date().toISOString().split('T')[0];
        const [startTime] = timeFrame.split('-');
        
        // Create slot datetime object
        const slotDate = new Date(`${date}T${convertTo24Hour(startTime)}:00`);
        
        // Default values
        const defaultAvailable = 5;
        const apiSlot = availableSlots.find(s => 
            s.date.startsWith(date) && s.timeFrame === timeFrame
        );
        
        const available = apiSlot?.availableSlots ?? defaultAvailable;
        const isPast = isCurrentDate && slotDate < now;
        
        return {
            available,
            isDisabled: available === 0,
            isPast,
            isCurrentDate
        };
    };

    // Group available slots by date
    const groupedSlots = availableSlots.reduce((acc, slot) => {
        const date = new Date(slot.date).toISOString().split('T')[0];
        if (!acc[date]) acc[date] = [];
        acc[date].push(slot);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-white">   
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center mb-8 gap-4">
                    <FaGamepad className="text-4xl text-purple-400 animate-pulse" />
                    <h1 className="text-3xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                        WAR ROOM
                    </h1>
                </div>

                {/* Date Selector - Battle Calendar */}
                <div className="grid grid-cols-7 gap-2 mb-8">
                    {dates.map((date) => (
                        <div
                            key={date}
                            className={`p-3 text-center cursor-pointer rounded-lg transition-all ${
                                activeDate === date 
                                ? "bg-purple-600 scale-105" 
                                : "bg-gray-800 hover:bg-gray-700"
                            }`}
                            onClick={() => setActiveDate(date)}
                        >
                            <div className="text-xs text-gray-400">
                                DAY {dates.indexOf(date) + 1}
                            </div>
                            <div className="font-mono">
                                {new Date(date).getDate()}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Battle Stations - Time Slots */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-800 p-6 rounded-xl shadow-neon">
                        <div className="flex items-center gap-3 mb-6">
                            <FaSkullCrossbones className="text-3xl text-red-400" />
                            <h2 className="text-2xl font-bold">Combat Readiness</h2>
                        </div>

                        {loading ? (
                            <div className="animate-pulse space-y-4">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="h-12 bg-gray-700 rounded-lg"></div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto scrollbar-glow">
                                {timeFrames.map((timeFrame) => {
                                    const { available, isDisabled, isPast } = getSlotStatus(activeDate, timeFrame);
                                    
                                    return (
                                        <button
                                            key={timeFrame}
                                            className={`p-3 rounded-md text-sm transition-all ${
                                                isPast 
                                                ? "bg-red-800 hover:bg-red-900 cursor-not-allowed" 
                                                : available > 0 
                                                    ? "bg-green-600 hover:bg-green-700" 
                                                    : "bg-gray-700 opacity-50 cursor-not-allowed"
                                            } ${selectedTimeFrame === timeFrame ? "ring-2 ring-yellow-400" : ""}`}
                                            onClick={() => {
                                                const { isPast } = getSlotStatus(activeDate, timeFrame);
                                                setIsSlotExpired(isPast);
                                                if (!isPast) {
                                                    setSelectedTimeFrame(timeFrame);
                                                } else {
                                                    toast.error("This mission timeline has expired");
                                                }
                                            }}
                                        >
                                            <div className="flex justify-between items-center">
                                                <span>{timeFrame}</span>
                                                {isPast ? (
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs text-red-300">MISSION EXPIRED</span>
                                                        <FaSkullCrossbones className="text-red-400" />
                                                    </div>
                                                ) : (
                                                    !isDisabled && (
                                                        <span className="text-xs bg-gray-900 px-2 py-1 rounded">
                                                            {available} Squads Ready
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Active Campaigns - Modified */}
                    <div className="bg-gray-800 p-6 rounded-xl shadow-neon">
                        <div className="flex items-center gap-3 mb-6">
                            <FaRegHeart className="text-3xl text-green-400" />
                            <h2 className="text-2xl font-bold">Active Campaigns</h2>
                        </div>

                        {userBookings.length === 0 ? (
                            <div className="text-center py-6">
                                <p className="text-gray-400">No active deployments</p>
                                <p className="text-sm mt-2 text-gray-500">
                                    {battleMessages[Math.floor(Math.random() * battleMessages.length)]}
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-glow">
                                {userBookings.map((booking) => (
                                    <div key={booking._id} className="bg-gray-700 p-3 rounded-md border-l-4 border-green-500">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="text-sm">
                                                    {new Date(booking.date).toLocaleDateString()}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    {battleMessages[Math.floor(Math.random() * battleMessages.length)]}
                                                </div>
                                            </div>
                                            <span className="text-xs bg-gray-900 px-2 py-1 rounded">
                                                {booking.timeFrame}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Deployment Control */}
                <div className="mt-8 text-center">
                    <button
                        className={`bg-purple-600 px-8 py-3 rounded-lg font-bold transition-all 
                            ${selectedTimeFrame && !isSlotExpired ? 'hover:bg-purple-700 glow-purple' : 'opacity-50 cursor-not-allowed'}
                            ${isSlotExpired ? '!bg-red-600' : ''}`}
                        onClick={handleBookSlot}
                        disabled={!selectedTimeFrame || isSlotExpired}
                    >
                        {isSlotExpired ? (
                            "MISSION TIMELINE EXPIRED"
                        ) : selectedTimeFrame ? (
                            `DEPLOY AT ${selectedTimeFrame}`
                        ) : (
                            "SELECT ENGAGEMENT TIME"
                        )}
                    </button>
                </div>
            </div>
            {/* Custom Scrollbar Styling */}
            <style jsx>{`
                .scrollbar-glow::-webkit-scrollbar {
                    width: 8px;
                    background: #1a202c;
                }

                .scrollbar-glow::-webkit-scrollbar-thumb {
                    background: #4a5568;
                    border-radius: 4px;
                    border: 2px solid #1a202c;
                }

                .scrollbar-glow::-webkit-scrollbar-thumb:hover {
                    background: #667eea;
                    box-shadow: 0 0 8px #667eea66;
                }
            `}</style>
        </div>
    );
};

export default BookSlot;