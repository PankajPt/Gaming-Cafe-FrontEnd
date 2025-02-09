import { MdVerified } from 'react-icons/md';

// components
import Avatar from './Avatar';

const LeftSideBar = ({userDetails, isVerified, selectedSection, setSelectedSection }) => {
    return (
        <div className="w-64 bg-gradient-to-b from-blue-800 to-blue-600 text-white p-6 shadow-xl rounded-r-3xl sticky top-0 h-screen">
            <div className="flex flex-col items-center mb-8">
                {/* Avatar Section */}
                <Avatar />

                <h2 className="text-xl font-bold text-blue-100">{userDetails.username}</h2>
                <div className="flex items-center mt-1">
                {isVerified ? (
                    <>
                    <MdVerified className="text-green-400 mr-1" />
                    <span className="text-sm text-green-400">Verified</span>
                    </>
                ) : (
                    <span className="text-sm text-yellow-400">Not Verified</span>
                )}
                </div>
            </div>

            <ul className="space-y-3">
                {['profile', 'my-plan', 'book-slot', 'events', 'logout'].map((section) => (
                <li
                    key={section}
                    className={`p-3 rounded-xl cursor-pointer transition duration-200 flex items-center ${
                    selectedSection === section
                        ? 'bg-blue-900 shadow-inner border-2 border-blue-300'
                        : 'hover:bg-blue-700/80 hover:shadow-md'
                    }`}
                    onClick={() => setSelectedSection(section)}
                >
                    <span className="capitalize">{section.replace('-', ' ')}</span>
                </li>
                ))}
            </ul>
        </div>
    )
}

export default LeftSideBar