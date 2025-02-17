import { useState } from "react";
import { MdEvent, MdDelete } from 'react-icons/md';

const EventManagement = () => {
    const [events, setEvents] = useState([
        { id: 1, title: 'CS:GO Tournament', date: '2023-12-15', prize: 1000, entryFee: 50 },
        { id: 1, title: 'CS:GO Tournament', date: '2023-12-15', prize: 1000, entryFee: 50 }
      ]);
    const [newEvent, setNewEvent] = useState({ title: '', date: '', prize: '', entryFee: '' });
    
    return (    
    <div className="bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 flex items-center gap-2">
        <MdEvent className="text-4xl" /> Event Management
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Create Event Form */}
            <div className="bg-blue-50 p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Create New Event</h3>
                <form className="space-y-4">
                    <input
                    type="text"
                    placeholder="Event Title"
                    className="w-full border rounded-xl px-4 py-2"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    />
                    <textarea
                    placeholder="Event Description"
                    className="w-full border rounded-xl px-4 py-2"
                    />
                    <input
                    type="date"
                    className="w-full border rounded-xl px-4 py-2"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="number"
                            placeholder="Prize Money ($)"
                            className="border rounded-xl px-4 py-2"
                            value={newEvent.prize}
                            onChange={(e) => setNewEvent({...newEvent, prize: e.target.value})}
                        />
                        <input
                            type="number"
                            placeholder="Entry Fee ($)"
                            className="border rounded-xl px-4 py-2"
                            value={newEvent.entryFee}
                            onChange={(e) => setNewEvent({...newEvent, entryFee: e.target.value})}
                        />
                    </div>
                    <button className="bg-purple-500 text-white px-4 py-2 rounded-xl hover:bg-purple-600 w-full">
                    Create Event
                    </button>
                </form>
            </div>

            {/* Events List */}
            <div className="bg-blue-50 p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
                <div className="space-y-4">
                    {events.map((event) => (
                    <div key={event.id} className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-medium">{event.title}</h4>
                                <p className="text-sm text-gray-600">{new Date(event.date).toDateString()}</p>
                            </div>
                            <button className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50">
                                <MdDelete className="text-xl" />
                            </button>
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                            <div className="bg-green-50 p-2 rounded">
                                <span className="text-sm font-medium">Prize:</span> ${event.prize}
                            </div>
                            <div className="bg-yellow-50 p-2 rounded">
                                <span className="text-sm font-medium">Entry Fee:</span> ${event.entryFee}
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
    )
}

export { EventManagement }