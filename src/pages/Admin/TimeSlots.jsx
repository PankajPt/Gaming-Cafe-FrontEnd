import { useState } from "react";
import { MdDelete } from 'react-icons/md';


const TimeSlots = () => {
    const [newSlot, setNewSlot] = useState({ duration: '2hr', start: '', end: '' });
    const [slots, setSlots] = useState([
        { id: 1, duration: '2hr', start: '09:00', end: '11:00' },
        { id: 2, duration: '1hr', start: '14:00', end: '15:00' }
      ]);


    const handleAddSlot = (e) => {
        e.preventDefault();
        const slot = {
          id: Date.now(),
          ...newSlot,
          timeRange: `${newSlot.start} - ${newSlot.end}`
        };
        setSlots([...slots, slot]);
        setNewSlot({ duration: '2hr', start: '', end: '' });
      };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Add Slot Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-2xl font-semibold text-blue-600 mb-4">Create Time Slot</h3>
                <form onSubmit={handleAddSlot} className="space-y-4">
                    <select
                    value={newSlot.duration}
                    onChange={(e) => setNewSlot({...newSlot, duration: e.target.value})}
                    className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500"
                    >
                    <option value="1hr">1 Hour</option>
                    <option value="2hr">2 Hours</option>
                    <option value="3hr">3 Hours</option>
                    </select>
                    
                    <div className="grid grid-cols-2 gap-4">
                    <input
                        type="time"
                        value={newSlot.start}
                        onChange={(e) => setNewSlot({...newSlot, start: e.target.value})}
                        className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="time"
                        value={newSlot.end}
                        onChange={(e) => setNewSlot({...newSlot, end: e.target.value})}
                        className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500"
                    />
                    </div>
                    <button className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition-colors">
                    Create Slot
                    </button>
                </form>
            </div>

            {/* Slots List Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-2xl font-semibold text-blue-600 mb-6">Existing Time Slots</h3>
                <div className="space-y-4">
                    {slots.map(slot => (
                    <div key={slot.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors">
                        <div>
                            <h4 className="font-medium">{slot.duration} Session</h4>
                            <p className="text-sm text-gray-600">{slot.timeRange}</p>
                        </div>
                        <button 
                        onClick={() => setSlots(slots.filter(s => s.id !== slot.id))}
                        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition-colors"
                        >
                        <MdDelete className="text-xl" />
                        </button>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export { TimeSlots }