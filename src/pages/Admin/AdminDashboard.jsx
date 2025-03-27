import { useState } from 'react';
// components
import { AdminSidebar } from './AdminSidebar.jsx'
import { UserManagement } from './UserManagement.jsx'
import { ManageCatalogue } from './ManageCatalogue.jsx'
import { MembershipPlans } from './Membership.jsx'
import { TimeSlots } from './TimeSlots.jsx'
import { EventManagement } from './EventManagement.jsx';
import PasswordUpdate from '../User/PasswordUpdate.jsx'

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('users');
  const handleSection = (sectionId) => {
      setActiveSection(sectionId);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <AdminSidebar 
      activeSection={activeSection}
      handleSection={handleSection}
      />
      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-8 w-full lg:ml-72 mt-5 min-h-[calc(100vh-6rem)] flex flex-col">
        {activeSection === 'users' && <UserManagement />}
        {activeSection === 'games' && <ManageCatalogue />}
        {activeSection === 'events' && <EventManagement />}
        {activeSection === 'slots' && <TimeSlots />}
        {activeSection === 'plans' && <MembershipPlans />}
        {activeSection === 'cipher' && <PasswordUpdate />}
      </div>
    </div>
  );
};

export default AdminDashboard;