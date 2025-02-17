import { useState } from 'react';
  // components
  import { AdminSidebar } from './AdminSidebar.jsx'
  import { UserManagement } from './UserManagement.jsx'
  import { ManageCatalogue } from './ManageCatalogue.jsx'
  import { MembershipPlans } from './Membership.jsx'
  import { TimeSlots } from './TimeSlots.jsx'
  import { EventManagement } from './EventManagement.jsx';

const AdminDashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [activeSection, setActiveSection] = useState('users');
  const handleSection = (sectionId) => {
      setActiveSection(sectionId);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <AdminSidebar 
      activeSection={activeSection}
      handleSection={handleSection}
      />
      {/* Main Content */}
      <div className="flex-1 p-8 max-w-6xl">
        {activeSection === 'users' && <UserManagement />}
        {activeSection === 'games' && <ManageCatalogue />}
        {activeSection === 'events' && <EventManagement />}
        {activeSection === 'slots' && <TimeSlots />}
        {activeSection === 'plans' && <MembershipPlans />}
      </div>
    </div>
  );
};

export default AdminDashboard;