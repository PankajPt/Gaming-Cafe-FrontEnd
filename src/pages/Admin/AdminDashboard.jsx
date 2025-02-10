import React, { useState } from 'react';
import { FaGamepad, FaRegSave } from 'react-icons/fa';
import { 
  MdPeople, MdSportsEsports, MdEvent, MdAccessTime, MdAttachMoney,
  MdDelete, MdVerified, MdSearch, MdSchedule } from 'react-icons/md';

  // components
  import { AdminSidebar } from './AdminSidebar.jsx'
  import { UserManagement } from './UserManagement.jsx'
  import { ManageCatalogue } from './ManageCatalogue.jsx'
const AdminDashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('users');
  const handleSection = (sectionId) => {
      setActiveSection(sectionId);
  };

  const [games, setGames] = useState([
    { id: 1, title: 'Cyberpunk 2077', description: 'Action RPG', image: '' },
    { id: 2, title: 'Valorant', description: 'Tactical Shooter', image: '' }
  ]);

  const [events, setEvents] = useState([
    { id: 1, title: 'CS:GO Tournament', date: '2023-12-15', prize: 1000, entryFee: 50 },
    { id: 1, title: 'CS:GO Tournament', date: '2023-12-15', prize: 1000, entryFee: 50 }
  ]);

  const [slots, setSlots] = useState([
    { id: 1, duration: '2hr', start: '09:00', end: '11:00' },
    { id: 2, duration: '1hr', start: '14:00', end: '15:00' }
  ]);

  const [plans, setPlans] = useState([
    { id: 1, title: 'Basic Plan', price: 29, features: ['5hrs/week', 'Standard PCs'] },
    { id: 2, title: 'Pro Plan', price: 59, features: ['10hrs/week', 'Premium PCs', 'Priority Support'] }
  ]);

    // Form States
    const [newSlot, setNewSlot] = useState({ duration: '2hr', start: '', end: '' });
    const [newPlan, setNewPlan] = useState({ title: '', description: '', features: '', price: '' });


  // Temporary form states

  const [newEvent, setNewEvent] = useState({ title: '', date: '', prize: '', entryFee: '' });

    // Handler Functions
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

    const handleAddPlan = (e) => {
      e.preventDefault();
      const plan = {
        id: Date.now(),
        ...newPlan,
        features: newPlan.features.split(',').map(f => f.trim())
      };
      setPlans([...plans, plan]);
      setNewPlan({ title: '', description: '', features: '', price: '' });
    };

  const deleteGame = (gameId) => {
    setGames(games.filter(game => game.id !== gameId));
  };

   // Time Slots Section
   const renderTimeSlots = () => (
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
  );

  // Membership Plans Section
  const renderMembershipPlans = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Add Plan Card */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-2xl font-semibold text-blue-600 mb-4">Create Membership Plan</h3>
        <form onSubmit={handleAddPlan} className="space-y-4">
          <input
            type="text"
            placeholder="Plan Title"
            value={newPlan.title}
            onChange={(e) => setNewPlan({...newPlan, title: e.target.value})}
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Description"
            value={newPlan.description}
            onChange={(e) => setNewPlan({...newPlan, description: e.target.value})}
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
          <textarea
            placeholder="Features (comma separated)"
            value={newPlan.features}
            onChange={(e) => setNewPlan({...newPlan, features: e.target.value})}
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
          <input
            type="number"
            placeholder="Price"
            value={newPlan.price}
            onChange={(e) => setNewPlan({...newPlan, price: e.target.value})}
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500"
          />
          <button className="w-full bg-green-500 text-white py-3 rounded-xl hover:bg-green-600 transition-colors">
            Create Plan
          </button>
        </form>
      </div>

      {/* Plans List Card */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-2xl font-semibold text-blue-600 mb-6">Existing Plans</h3>
        <div className="space-y-4">
          {plans.map(plan => (
            <div key={plan.id} className="p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-xl font-semibold">{plan.title}</h4>
                  <p className="text-2xl font-bold text-blue-600 mt-1">
                    ${plan.price}<span className="text-sm text-gray-500">/month</span>
                  </p>
                </div>
                <button 
                  onClick={() => setPlans(plans.filter(p => p.id !== plan.id))}
                  className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition-colors"
                >
                  <MdDelete className="text-xl" />
                </button>
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <span className="mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Sidebar */}
      <AdminSidebar 
      activeSection={activeSection}
      handleSection={handleSection}
      />

      {/* Main Content */}
      <div className="flex-1 p-8 max-w-6xl">
        {/* User Management */}
        {activeSection === 'users' && <UserManagement />}

        {/* Game Catalog */}
        {activeSection === 'games' && <ManageCatalogue />}



        {/* Events Management */}
        {activeSection === 'events' && (
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
        )}

        {/* Add similar sections for Slots and Plans */}
        {activeSection === 'slots' && renderTimeSlots()}
        {activeSection === 'plans' && renderMembershipPlans()}
      </div>
    </div>
  );
};

export default AdminDashboard;