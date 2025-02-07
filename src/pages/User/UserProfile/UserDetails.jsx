import { MdFitnessCenter } from 'react-icons/md';
const UserDetails = ({userDetails}) => {
    return (
        <>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <label className="text-sm font-semibold text-blue-500">FULL NAME</label>
            <p className="text-2xl text-gray-800 mt-1">{userDetails.fullname}</p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <label className="text-sm font-semibold text-blue-500">Username</label>
            <p className="text-2xl text-gray-800 mt-1">{userDetails.username}</p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <label className="text-sm font-semibold text-blue-500">EMAIL ADDRESS</label>
            <p className="text-2xl text-gray-800 mt-1 flex items-center">
                <MdFitnessCenter className="mr-2 text-blue-500" />
                {userDetails.email}
            </p>
        </div>
        </>
    )
}

export default UserDetails