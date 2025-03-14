import { useState, useEffect, useRef } from "react";
import { MdPeople, MdVerified } from 'react-icons/md';
import { FaRegSave } from 'react-icons/fa';
import { fetchData } from "../../services/api.service.js";  
import { useAuthHandler } from '../../hooks/authHandler.js';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingButton, setLoadingButton] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const { refreshAndRetry, handleInvalidJWT } = useAuthHandler();
    const isFetched = useRef(false);

    // State to track selected roles for each user
    const [selectedRoles, setSelectedRoles] = useState({});

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setError(null);

            const options = {
                method: 'GET',
                data: null,
                file: null,
                isBinary: false
            };

            const getUsers = async () => {
                try {
                    const response = await fetchData('admin/view-users', options);
                    if (!response.success) {
                        if (response.message === 'jwt expired') {
                            const retryWithNewToken = await refreshAndRetry('admin/view-users', options);
                            if (!retryWithNewToken.success) {
                                setError(retryWithNewToken.message);
                                setLoading(false);
                                return;
                            }
                            setUsers(retryWithNewToken.data);
                        } else if (response.message === 'jwt malformed' || response.message === 'invalid signature') {
                            await handleInvalidJWT();
                        } else {
                            setError(response.message);
                        }
                    } else {
                        setUsers(response.data);
                        // Initialize selectedRoles with current roles
                        const initialSelectedRoles = response.data.reduce((acc, user) => {
                            acc[user._id] = user.role;
                            return acc;
                        }, {});
                        setSelectedRoles(initialSelectedRoles);
                    }
                } catch (err) {
                    setError(err.message || 'Something went wrong');
                } finally {
                    setLoading(false);
                }
            };
            if (!isFetched.current) {
                getUsers();
                isFetched.current = true;
            }
        };
        fetchUsers();
    }, []);

    const handleRoleChange = async (userId, newRole) => {
        const options = {
            method: 'POST',
            data: { userId, newRole },
            file: null,
            isBinary: false
        };

        setLoadingButton(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await fetchData('admin/change-role', options);
            if (!response.success) {
                if (response.message === 'jwt expired') {
                    const retryWithNewToken = await refreshAndRetry('admin/change-role', options);
                    if (!retryWithNewToken.success) {
                        setError(retryWithNewToken.message);
                        setTimeout(()=>{
                            setError(null);
                        }, 3000)
                        setLoadingButton(false);
                        return;
                    }
                    setSuccess(retryWithNewToken.message);
                    setTimeout(()=>{
                        setSuccess(null);
                    }, 3000)
                    // Update the user role in the state
                    setUsers(prevUsers => 
                        prevUsers.map(user => 
                            user._id === userId ? { ...user, role: retryWithNewToken.data.role } : user
                        )
                    );
                } else if (response.message === 'jwt malformed' || response.message === 'invalid signature') {
                    await handleInvalidJWT();
                } else {
                    setError(response.message);
                    setTimeout(()=>{
                        setError(null);
                    }, 3000)
                }
            } else {
                setSuccess(response.message);
                setTimeout(()=>{
                    setSuccess(null);
                }, 3000)
                // Update the user role in the state
                setUsers(prevUsers => 
                    prevUsers.map(user => 
                        user._id === userId ? { ...user, role: response.data.role } : user
                    )
                );
            }
        } catch (err) {
            setError(err.message || 'Something went wrong');
            setTimeout(()=>{
                setError(null);
            }, 3000)
        } finally {
            setLoadingButton(false);
        }
    };

    const handleRoleSelect = (userId, newRole) => {
        setSelectedRoles(prev => ({
            ...prev,
            [userId]: newRole,
        }));
    };

    if (loading) {
        return (
            <div className="text-center text-blue-400 text-lg font-bold animate-pulse">
                INITIALIZING USER DATABASE...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center bg-red-900/20 p-4 rounded-xl border-2 border-red-500/30 text-red-400 font-bold">
                {error}
            </div>
        );
    }

    return (        
        <div className="bg-gradient-to-br from-gray-900 to-blue-900 p-8 rounded-2xl shadow-[0_0_30px_-10px_rgba(99,102,241,0.3)] border-2 border-purple-500/30">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 font-orbitron">
                <MdPeople className="text-4xl text-purple-400 animate-pulse" />
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    USER TERMINAL
                </span>
            </h2>
            
            {success && (
                <div className="bg-green-900/20 p-4 rounded-xl border-2 border-green-500/30 text-green-400 mb-4 flex items-center gap-2">
                    <MdVerified className="text-xl" />
                    {success}
                </div>
            )}

            <div className="overflow-x-auto overflow-y-auto max-h-96 rounded-xl shadow-2xl">
                <table className="w-full">
                    <thead className="bg-gradient-to-r from-purple-900/50 to-blue-900/50">
                        <tr>
                            {['User', 'Email', 'Status', 'Role', 'Actions'].map((header, index) => (
                                <th 
                                    key={index}
                                    className="px-6 py-4 text-left text-purple-300 font-orbitron text-sm uppercase tracking-wider"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700/50">
                        {users.map((user) => (
                            <tr 
                                key={user._id} 
                                className="hover:bg-gray-800/30 transition-all duration-200 group"
                            >
                                <td className="px-6 py-4 font-medium text-blue-200">{user.username}</td>
                                <td className="px-6 py-4 text-gray-300">{user.email}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        {user.isActiveUser ? (
                                            <div className="flex items-center gap-1 text-green-400">
                                                <MdVerified className="text-xl animate-pulse" />
                                                <span className="text-sm">ACTIVE</span>
                                            </div>
                                        ) : (
                                            <div className="text-yellow-400 flex items-center gap-1">
                                                <span className="text-sm">PENDING</span>
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <select
                                        value={selectedRoles[user._id] || user.role}
                                        onChange={(e) => handleRoleSelect(user._id, e.target.value)}
                                        className="border-2 border-purple-500/30 rounded-lg px-3 py-2 bg-gray-900/50 text-gray-100 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                    >
                                        <option value="user" className="bg-gray-900">User</option>
                                        <option value="manager" className="bg-gray-900">Manager</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleRoleChange(user._id, selectedRoles[user._id])}
                                        disabled={user.role === selectedRoles[user._id] || loadingButton}
                                        className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
                                            user.role !== selectedRoles[user._id] && !loadingButton
                                                ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-purple-glow'
                                                : 'bg-gray-700/50 cursor-not-allowed'
                                        }`}
                                    >
                                        {loadingButton ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 border-4 border-t-4 border-blue-400 rounded-full animate-spin" />
                                                <span className="text-sm">PROCESSING...</span>
                                            </div>
                                        ) : (
                                            <>
                                                <FaRegSave className="text-blue-300" />
                                                <span className="text-sm">UPDATE PROTOCOL</span>
                                            </>
                                        )}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export { UserManagement };