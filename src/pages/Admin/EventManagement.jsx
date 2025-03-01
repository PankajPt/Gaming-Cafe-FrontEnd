import { useState, useEffect } from "react";
import { MdEvent, MdDelete, MdAttachMoney } from 'react-icons/md';
import { GiTrophy } from 'react-icons/gi';
import { fetchData } from "../../services/api.service";
import { fetchEvents } from "../../services/event.service";
import { toast } from 'react-toastify';
import { FaCalendarAlt, FaImage } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './admin.css'

const EventManagement = () => {
    const [events, setEvents] = useState([]);
    const [formData, setFormData] = useState({ 
        title: '', 
        description: '', 
        prizeMoney: '', 
        entryFee: '', 
        date: '', 
        thumbnail: null 
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getEvents = async () => {
            try {
                const cachedData = sessionStorage.getItem('events');
                if (cachedData) {
                    try {
                        const parsedData = JSON.parse(cachedData);
                        setEvents(Array.isArray(parsedData) ? parsedData : []);
                    } catch {
                        sessionStorage.removeItem('events'); // Remove corrupted data
                        setEvents([]); // Fallback to empty array
                    }
                    return;
                }
    
                const response = await fetchEvents();
                if (!response.success) {
                    toast.error(response.message);
                    return;
                }
    
                setEvents(response.data);
                sessionStorage.setItem('events', JSON.stringify(response.data || []));
            } catch (error) {
                toast.error(error.message || "An error occurred while fetching events.");
            }
        };
    
        getEvents();
    }, []);
    

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "thumbnail") {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleDateChange = (date) => {
        if (date) {
            const formattedDate = date.toISOString().split('T')[0]; // Formats to YYYY-MM-DD
            setFormData({ ...formData, date: formattedDate });
        } else {
            setFormData({ ...formData, date: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value) data.append(key, value);
            });

            if (!formData.title || !formData.description || !formData.date) {
                toast.error("Please fill all required fields.");
                setLoading(false);
                return;
            }

            const options = {
                method: 'POST',
                data: null,
                file: data,
                isBinary: true
            };

            const response = await fetchData('admin/create-event', options);
            if (!response.success) throw new Error(response.message);

            setEvents(prev => {
                const updatedEvents = [{ ...response.data }, ...prev];
                sessionStorage.setItem('events', JSON.stringify(updatedEvents));
                return updatedEvents;
            });

            toast.success('Event created successfully!');
            setFormData({ title: '', description: '', prizeMoney: '', entryFee: '', date: '', thumbnail: null });
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (eventId) => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;

        try {
            const options = { method: 'DELETE' };
            const response = await fetchData(`admin/delete-event/${eventId}`, options);
            if (!response.success) throw new Error(response.message);

            setEvents(prev => {
                const updatedEvents = prev.filter(event => event._id !== eventId);
                sessionStorage.setItem('events', JSON.stringify(updatedEvents));
                return updatedEvents;
            });

            toast.success('Event deleted successfully!');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (    
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border-2 border-blue-500/30 shadow-2xl">
        <h2 className="text-3xl font-bold text-blue-400 mb-6 flex items-center gap-2 font-orbitron">
            <MdEvent className="text-4xl text-purple-400" /> EVENT COMMAND CENTER
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Create Event Form */}
            <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/30 p-6 rounded-2xl border-2 border-blue-500/30">
                <h3 className="text-xl font-semibold mb-4 text-blue-300 font-orbitron">INITIATE NEW MISSION</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <input
                            type="text"
                            name="title"
                            placeholder="Mission Title"
                            className="w-full bg-gray-800/50 border-2 border-blue-500/30 rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:border-purple-400"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="relative">
                        <textarea
                            name="description"
                            placeholder="Mission Briefing"
                            className="w-full bg-gray-800/50 border-2 border-blue-500/30 rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:border-purple-400 h-32"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                        <DatePicker
                            selected={formData.date ? new Date(formData.date) : null}
                            onChange={handleDateChange}
                            minDate={new Date()}
                            placeholderText="SELECT MISSION DATE"
                            dateFormat="MMMM d, yyyy" // Display format remains readable
                            className="w-full bg-gray-800/50 border-2 border-blue-500/30 rounded-xl px-4 py-3 text-gray-200 placeholder-gray-400 focus:outline-none focus:border-purple-400"
                            popperClassName="!bg-gray-800 !border-2 !border-blue-500/30 !rounded-xl"
                            calendarClassName="!bg-gray-800 !text-gray-200"
                            wrapperClassName="w-full"
                            customInput={
                                <div className="relative">
                                    <input
                                        className="w-full pr-10 bg-transparent text-gray-200"
                                        value={formData.date ? new Date(formData.date).toLocaleDateString('en-US', {
                                            year: 'numeric', month: 'long', day: 'numeric'
                                        }) : ''}
                                        readOnly
                                    />
                                    <FaCalendarAlt className="absolute right-4 top-4 text-blue-400 hover:text-purple-400 transition-colors" />
                                </div>
                            }
                            renderCustomHeader={({
                                date,
                                decreaseMonth,
                                increaseMonth,
                                prevMonthButtonDisabled,
                                nextMonthButtonDisabled,
                            }) => (
                                <div className="flex items-center justify-between px-2 py-1 bg-gray-700">
                                    <button
                                        onClick={decreaseMonth}
                                        disabled={prevMonthButtonDisabled}
                                        className="text-blue-400 hover:text-purple-400 disabled:opacity-50"
                                    >
                                        ←
                                    </button>
                                    <span className="text-purple-400 font-orbitron">
                                        {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
                                    </span>
                                    <button
                                        onClick={increaseMonth}
                                        disabled={nextMonthButtonDisabled}
                                        className="text-blue-400 hover:text-purple-400 disabled:opacity-50"
                                    >
                                        →
                                    </button>
                                </div>
                            )}
                            dayClassName={(date) => 
                                date < new Date().setHours(0,0,0,0) ? '!text-gray-500' : '!text-gray-200 hover:!bg-blue-500/20'
                            }
                        />
                    </div>
                    <div className="relative">
                            <label className="flex items-center justify-center w-full bg-gray-800/50 border-2 border-blue-500/30 rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-800/70 transition-colors">
                                <FaImage className="mr-2 text-blue-400" />
                                <span className="text-gray-300">
                                    {formData.thumbnail ? formData.thumbnail.name : 'Upload Thumbnail'}
                                </span>
                                <input
                                    type="file"
                                    name="thumbnail"
                                    className="hidden"
                                    onChange={handleChange}
                                    accept="image/*"
                                    required
                                />
                            </label>
                        </div>
                        </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Victory Prize Input */}
                        <div className="relative">
                            <input
                                type="number"
                                name="prizeMoney"
                                placeholder="Victory Prize (₹)"
                                className="w-full bg-gray-800/50 border-2 border-blue-500/30 rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:border-purple-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                value={formData.prizeMoney}
                                onChange={handleChange}
                                required
                            />
                            <GiTrophy className="absolute right-4 top-4 text-gray-400" />
                        </div>
                        {/* Entry Fee Input */}
                        <div className="relative">
                            <input
                                type="number"
                                name="entryFee"
                                placeholder="Entry Fee (₹)"
                                className="w-full bg-gray-800/50 border-2 border-blue-500/30 rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:border-purple-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                value={formData.entryFee}
                                onChange={handleChange}
                                required
                            />
                            <MdAttachMoney className="absolute right-4 top-4 text-gray-400" />
                        </div>
                    </div>

                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50"
                    >
                        {loading ? 'Launching Mission...' : 'Activate Event'}
                    </button>
                </form>
            </div>

            {/* Events List */}
            <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/30 p-6 rounded-2xl border-2 border-blue-500/30">
                <h3 className="text-xl font-semibold mb-4 text-purple-300 font-orbitron">ACTIVE MISSIONS</h3>
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                    {events.map((event) => (
                        <div key={event._id} className="bg-gray-900/50 p-4 rounded-xl border-2 border-blue-500/30 hover:border-purple-400/50 transition-colors">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-medium text-blue-300">{event.title}</h4>
                                    <p className="text-sm text-gray-400 mt-1">
                                        {event.date
                                            ? new Date(event.date).toLocaleString('en-IN', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true
                                            })
                                            : "No Date Available"}
                                    </p>
                                </div>
                                <button 
                                    onClick={() => handleDelete(event._id)}
                                    className="text-red-400 hover:text-red-500 p-2 rounded-full hover:bg-red-900/20 transition-colors"
                                >
                                    <MdDelete className="text-xl" />
                                </button>
                            </div>
                            <div className="mt-3 grid grid-cols-2 gap-3">
                                <div className="bg-green-900/20 p-3 rounded-lg border border-green-500/30">
                                    <span className="text-sm text-green-400">Prize Pool:</span>
                                    <div className="text-lg font-bold text-green-300">₹{event.prizeMoney}</div>
                                </div>
                                <div className="bg-yellow-900/20 p-3 rounded-lg border border-yellow-500/30">
                                    <span className="text-sm text-yellow-400">Entry Fee:</span>
                                    <div className="text-lg font-bold text-yellow-300">₹{event.entryFee}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    </div>
    )
}

export { EventManagement }