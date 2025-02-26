import { useEffect, useState } from "react";
import { fetchData } from "../../services/api.service";
import { useAuthHandler } from "../../hooks/authHandler.js";
import { FiChevronDown, FiClock, FiUser } from "react-icons/fi";

const TimeSlots = () => {
    const [slots, setSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [loading, setLoading] = useState(true);
    const { refreshAndRetry, handleInvalidJWT } = useAuthHandler();

    useEffect(() => {
        const options = {
            method: 'GET',
            data: null,
            file: null,
            isBinary: false
        };

        const getBookings = async () => {
            try {
                const response = await fetchData('admin/get-bookings', options);
                if (!response.success) {
                    if (response.message === 'jwt expired') {
                        const retryWithNewToken = await refreshAndRetry('admin/get-bookings', options);
                        if (!retryWithNewToken.success) {
                            return;
                        }
                    } else if (response.message === 'jwt malformed' || response.message === 'invalid signature') {
                        await handleInvalidJWT();
                        return;
                    }
                    return;
                }
                setSlots(response.data);
            } catch (error) {
                console.error("Error fetching slots:", error);
            } finally {
                setLoading(false);
            }
        };

        getBookings();
    }, []);

    // Group slots by date and then by timeFrame
    const groupedByDateAndTime = slots.reduce((acc, slot) => {
        if (!acc[slot.date]) acc[slot.date] = {};
        if (!acc[slot.date][slot.timeFrame]) acc[slot.date][slot.timeFrame] = [];
        acc[slot.date][slot.timeFrame].push(slot);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-white">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center mb-8 gap-4">
                    <span className="text-4xl text-purple-400 animate-pulse">🎮</span>
                    <h1 className="text-3xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                        Game Sessions
                    </h1>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-500"></div>
                        <p className="mt-4 text-purple-300 font-mono animate-pulse">
                            Loading Battle Stations...
                        </p>
                    </div>
                ) : (
                    Object.keys(groupedByDateAndTime).map((date) => (
                        <div key={date} className="mb-4 group">
                            <div 
                                className="bg-gradient-to-r from-gray-800 to-gray-700 p-4 rounded-lg cursor-pointer 
                                hover:from-gray-700 hover:to-gray-600 transition-all duration-300 shadow-lg
                                border-l-4 border-purple-500 flex justify-between items-center"
                                onClick={() => setSelectedDate(selectedDate === date ? null : date)}
                            >
                                <div className="flex items-center gap-3">
                                    <FiClock className="text-purple-400" />
                                    <span className="font-mono text-lg tracking-wide">
                                        {new Date(date).toDateString()}
                                    </span>
                                </div>
                                <FiChevronDown className={`text-purple-400 transition-transform duration-300 ${
                                    selectedDate === date ? "rotate-180" : ""
                                }`} />
                            </div>
                            
                            {selectedDate === date && (
                                <div className="mt-2 ml-6 p-4 bg-gray-800 rounded-lg border-l-4 border-blue-400 
                                animate-fadeIn shadow-lg space-y-4">
                                    {Object.keys(groupedByDateAndTime[date]).map((timeFrame) => (
                                        <div key={timeFrame} className="mb-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                                <span className="font-mono text-blue-300">
                                                    {timeFrame}
                                                </span>
                                            </div>
                                            <div className="space-y-2">
                                                {groupedByDateAndTime[date][timeFrame].map((slot) => (
                                                    <div key={slot._id} className="p-3 bg-gray-700 rounded-md hover:bg-gray-600 
                                                    transition-colors duration-200 border border-gray-600 hover:border-purple-400">
                                                        <div className="flex items-center gap-2 text-sm">
                                                            <FiUser className="text-purple-300" />
                                                            <span className="text-gray-300">
                                                                {slot.fullname} 
                                                                <span className="ml-2 text-purple-200">
                                                                    @{slot.username}
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export { TimeSlots };