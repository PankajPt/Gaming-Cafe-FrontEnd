import { FaEdit } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';

const LeftSideBar = ({userLogo, handleFileChange, userDetails, isVerified, selectedSection, setSelectedSection }) => {
    return (
        <div className="w-64 bg-gradient-to-b from-blue-800 to-blue-600 text-white p-6 shadow-xl rounded-r-3xl sticky top-0 h-screen">
            <div className="flex flex-col items-center mb-8">
                <div className="relative group">
                <img
                    src={userLogo}
                    alt="Profile"
                    className="rounded-full w-32 h-32 border-4 border-blue-200 shadow-xl mb-4 transform transition duration-300 hover:scale-105"
                />
                <label className="absolute bottom-2 right-2 bg-orange-500 p-2 rounded-full cursor-pointer hover:bg-orange-600 shadow-md transition duration-200">
                    <FaEdit className="text-white" />
                    <input type="file" className="hidden" onChange={handleFileChange} />
                </label>
                </div>
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