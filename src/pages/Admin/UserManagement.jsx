import { useState, useEffect, useRef } from "react";
import { MdPeople, MdVerified, MdSearch, MdExpandMore, MdEvent, MdSecurity } from 'react-icons/md';
import { FaRegSave } from 'react-icons/fa';
import { fetchData } from "../../services/api.service.js";  
import { useAuthHandler } from '../../hooks/authHandler.js';
import CustomSelect from "./CustomSelect.jsx";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingButton, setLoadingButton] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [selectedPlans, setSelectedPlans] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const { refreshAndRetry, handleInvalidJWT } = useAuthHandler();
    const isFetched = useRef(false);
    const [selectedRoles, setSelectedRoles] = useState({});
    const [expandedUser, setExpandedUser] = useState(null);

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
                        } else if (response?.data?.forcedLogout) {
                            await handleInvalidJWT();
                            return
                        } else {
                            setError(response.message);
                        }
                    } else {
                        setUsers(response.data);
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

    const formatISTDate = (dateString) => {
        const options = {
            timeZone: 'Asia/Kolkata',
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleString('en-IN', options);
    };

    const calculateDaysRemaining = (expiresAt) => {
        const expiryDate = new Date(expiresAt);
        const currentDate = new Date();
        const diffTime = expiryDate - currentDate;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const toggleExpand = (userId) => {
        setExpandedUser(expandedUser === userId ? null : userId);
    };

    const handleRoleSelect = (userId, newRole) => {
        setSelectedRoles(prev => ({ ...prev, [userId]: newRole }));
    };

    const handlePlanSelect = (userId, plan) => {
        setSelectedPlans(prev => ({ ...prev, [userId]: plan }));
    };

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
                        setTimeout(() => setError(null), 3000);
                        return;
                    }
                    setSuccess(retryWithNewToken.message);
                    setUsers(prevUsers => 
                        prevUsers.map(user => 
                            user._id === userId ? { ...user, role: retryWithNewToken.data.role } : user
                        )
                    );
                } else if (response?.data?.forcedLogout) {
                    await handleInvalidJWT();
                    return
                } else {
                    setError(response.message);
                    return
                }
            } else {
                setSuccess(response.message);
                setUsers(prevUsers => 
                    prevUsers.map(user => 
                        user._id === userId ? { ...user, role: response.data.role } : user
                    )
                );
            }
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoadingButton(false);
            setTimeout(() => {
                setSuccess(null);
                setError(null);
            }, 3000);
        }
    };

    const handlePlanChange = async (userId, plan) => {
        const options = {
            method: 'POST',
            data: { userId, plan },
            file: null,
            isBinary: false
        };

        setLoadingButton(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await fetchData('admin/assign-plan', options);
            if (!response.success) {
                if (response.message === 'jwt expired') {
                    const retryWithNewToken = await refreshAndRetry('admin/assign-plan', options);
                    if (!retryWithNewToken.success) {
                        setError(retryWithNewToken.message);
                        setTimeout(() => setError(null), 3000);
                        return;
                    }
                    setSuccess(retryWithNewToken.message);
                    setUsers(prevUsers => 
                        prevUsers.map(user => 
                            user._id === userId ? { 
                                ...user, 
                                activePlan: [retryWithNewToken.data.plan] 
                            } : user
                        )
                    );
                } else if (response?.data?.forcedLogout) {
                    await handleInvalidJWT();
                    return
                } else {
                    setError(response.message);
                }
            } else {
                setSuccess(response.message);
                setUsers(prevUsers => 
                    prevUsers.map(user => 
                        user._id === userId ? { 
                            ...user, 
                            activePlan: [...user.activePlan, {
                                plan: response.data.plan,
                                startsAt: response.data.startsAt,
                                expiresAt: response.data.expiresAt
                            }]
                        } : user
                    )
                );
            }
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoadingButton(false);
            setTimeout(() => {
                setSuccess(null);
                setError(null);
            }, 3000);
        }
    };

    if (loading) {
        return (
            <div className="text-center text-blue-400 text-lg font-bold animate-pulse">
                LOADING USER DATABASE...
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

    const filteredUsers = users.filter(user => 
        user?.username?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <MdPeople className="text-3xl text-purple-400" />
                        <span className="text-white">User Management</span>
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">{users.length} registered users</p>
                </div>
                <div className="relative w-full md:w-64">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-lg bg-gray-800 px-4 py-2 text-sm text-white border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    />
                    <MdSearch className="absolute right-3 top-2.5 text-gray-400" />
                </div>
            </div>

            {success && (
                <div className="bg-green-900/20 p-3 rounded-lg mb-4 text-green-400 flex items-center gap-2">
                    <MdVerified className="text-xl" />
                    {success}
                </div>
            )}

            <div className="space-y-2">
                {filteredUsers.map((user) => (
                    <div key={user._id} className="bg-gray-800 rounded-lg border border-gray-700">
                        <div className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-4 flex-1">
                                <div className="relative">
                                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-sm">
                                        {user.username[0].toUpperCase()}
                                    </div>
                                    {user.isActiveUser && (
                                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-800" />
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium text-white truncate">{user.username}</div>
                                    <div className="text-xs text-gray-400 truncate">{user.email}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 flex-1 justify-end">
                                <div className="flex items-center gap-2">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                                        user.isActiveUser 
                                            ? 'bg-green-900/30 text-green-400' 
                                            : 'bg-yellow-900/30 text-yellow-400'
                                    }`}>
                                        {user.isActiveUser ? 'Active' : 'Inactive'}
                                    </span>
                                </div>

                                <button
                                    onClick={() => toggleExpand(user._id)}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <MdExpandMore className={`transform transition-transform ${
                                        expandedUser === user._id ? 'rotate-180' : ''
                                    }`} />
                                </button>
                            </div>
                        </div>

                        {expandedUser === user._id && (
                            <div className="p-4 border-t border-gray-700 bg-gray-800/50">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="text-xs text-gray-400 mb-2 font-medium">Active Plans</h4>
                                        <div className="space-y-2">
                                            {user.activePlan.length === 0 ? (
                                                <div className="text-gray-500 text-sm">No active plans</div>
                                            ) : (
                                                user.activePlan.map((plan, index) => (
                                                    <div key={index} className="bg-gray-700/20 p-3 rounded-lg">
                                                        <div className="flex justify-between items-center">
                                                            <div>
                                                                <span className="text-sm font-medium text-white capitalize">
                                                                    {plan.plan}
                                                                </span>
                                                                <div className="text-xs text-gray-400">
                                                                    {formatISTDate(plan.startsAt)} - {formatISTDate(plan.expiresAt)}
                                                                </div>
                                                            </div>
                                                            <div className="text-xs bg-gray-600/30 px-2 py-1 rounded">
                                                                {calculateDaysRemaining(plan.expiresAt)} days left
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-xs text-gray-400 mb-2 font-medium flex items-center gap-2">
                                                <MdSecurity className="text-base" />
                                                Access Management
                                            </h4>
                                            <CustomSelect
                                                value={selectedRoles[user._id]}
                                                onChange={(value) => handleRoleSelect(user._id, value)}
                                                options={[
                                                    { value: 'user', label: 'Standard User' },
                                                    { value: 'manager', label: 'Content Manager' }
                                                ]}
                                                customStyles="border-2 border-purple-500/40 hover:border-purple-400/60 bg-gray-800/50"
                                            />
                                            <button
                                                onClick={() => handleRoleChange(user._id, selectedRoles[user._id])}
                                                disabled={user.role === selectedRoles[user._id] || loadingButton}
                                                className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600/30 hover:bg-purple-600/40 text-purple-400 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                            {loadingButton ? (
                                                <div className="animate-spin h-5 w-5 border-2 border-purple-400 rounded-full border-t-transparent" />
                                            ) : (
                                                <>
                                                    <FaRegSave className="text-sm" />
                                                    <span className="text-sm">Update Role</span>
                                                </>
                                            )}
                                            </button>
                                        </div>
                                    
                                        <h4 className="text-xs text-gray-400 mb-2 font-medium flex items-center gap-2">
                                            <MdEvent className="text-base" />
                                            Subscription Management
                                        </h4>
                                        
                                            <CustomSelect
                                                value={selectedPlans[user._id]}
                                                onChange={(value) => handlePlanSelect(user._id, value)}
                                                options={[
                                                    { value: 'monthly', label: 'Monthly Plan' },
                                                    { value: 'quarterly', label: 'Quarterly Plan' },
                                                    { value: 'yearly', label: 'Yearly Plan' }
                                                ]}
                                                small
                                            />
                                            <button
                                                onClick={()=>handlePlanChange(user._id, selectedPlans[user._id])}
                                                disabled={!selectedPlans[user._id] || loadingButton}
                                                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600/30 hover:bg-purple-600/40 text-purple-400 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {loadingButton ? (
                                                    <div className="animate-spin h-5 w-5 border-2 border-purple-400 rounded-full border-t-transparent" />
                                                ) : (
                                                    <>
                                                        <FaRegSave className="text-sm" />
                                                        <span className="text-sm">Save Changes</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export { UserManagement };