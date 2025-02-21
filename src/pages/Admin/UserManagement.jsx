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
        return <div className="text-center text-blue-600 text-lg font-bold">Loading users...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 font-bold">{error}</div>;
    }

    return (        
        <div className="bg-white p-8 rounded-2xl shadow-2xl">
            <h2 className="text-3xl font-bold text-blue-600 mb-6 flex items-center gap-2">
                <MdPeople className="text-4xl" /> User Management
            </h2>
            {success && <div className="text-center text-green-500 font-bold mb-4">{success}</div>}
            <div className="overflow-x-auto rounded-xl shadow-inner">
                <table className="w-full">
                    <thead className="bg-blue-50">
                        <tr>
                            <th className="px-6 py-4 text-left">User</th>
                            <th className="px-6 py-4 text-left">Email</th>
                            <th className="px-6 py-4 text-left">Status</th>
                            <th className="px-6 py-4 text-left">Role</th>
                            <th className="px-6 py-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium">{user.username}</td>
                                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1">
                                        {user.isActiveUser === 'active' 
                                            ? <MdVerified className="text-green-500" />
                                            : <span className="text-yellow-500">Pending</span>
                                        }
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <select
                                        value={selectedRoles[user._id] || user.role}
                                        onChange={(e) => handleRoleSelect(user._id, e.target.value)}
                                        className="border rounded-lg px-3 py-1 bg-white"
                                    >
                                        <option value="user">User</option>
                                        <option value="manager">Manager</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleRoleChange(user._id, selectedRoles[user._id])}
                                        disabled={user.role === selectedRoles[user._id] || loadingButton}
                                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 flex items-center gap-1 disabled:bg-blue-300 disabled:cursor-not-allowed"
                                    >
                                        {loadingButton ? (
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : (
                                            <>
                                                <FaRegSave /> Save
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