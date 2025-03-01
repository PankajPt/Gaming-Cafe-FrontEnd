import { MdPeople, MdSportsEsports, MdEvent, MdAccessTime } from "react-icons/md";
import { FaGamepad, FaKey } from "react-icons/fa";

const AdminSidebar = ({activeSection, handleSection}) => {
    const sections = [
        { id: 'users', icon: <MdPeople />, label: 'User Management' },
        { id: 'games', icon: <MdSportsEsports />, label: 'Game Catalog' },
        { id: 'events', icon: <MdEvent />, label: 'Events' },
        { id: 'slots', icon: <MdAccessTime />, label: 'Time Slots' },
        { id: 'plans', icon: <FaGamepad />, label: 'Membership Plans' },
        { id: 'cipher', icon: <FaKey />, label: 'Change Cipher' }
    ];

    return (
        <div className="w-64 bg-gradient-to-b from-blue-800 to-blue-600 text-white p-6 shadow-xl rounded-r-3xl sticky top-0 h-screen">
            <h2 className="text-2xl font-bold text-blue-100 mb-8">Cafe Admin</h2>
            <nav>
                <ul className="space-y-3">
                    {sections.map((section) => (
                        <li
                            key={section.id}
                            className={`p-3 rounded-xl cursor-pointer transition duration-200 flex items-center gap-3 ${
                                activeSection === section.id
                                    ? 'bg-blue-900 shadow-inner border-2 border-blue-300'
                                    : 'hover:bg-blue-700/80 hover:shadow-md'
                            }`}
                            onClick={() => handleSection(section.id)} // Fixed: Wrapped in an arrow function
                        >
                            {section.icon}
                            <span>{section.label}</span>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export { AdminSidebar };