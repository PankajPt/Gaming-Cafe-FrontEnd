import React, { useEffect, useRef, useState } from "react";
import { MdDelete } from 'react-icons/md';
import { fetchData } from "../../services/api.service.js";
import { useAuthHandler } from "../../hooks/authHandler.js";
import { subscriptionPlans } from "../../services/subscription.service.js"

const MembershipPlans = () => {
    const [plans, setPlans] = useState([]);
    const [newPlan, setNewPlan] = useState({ 
        title: '', 
        description: '', 
        features: [], 
        price: '', 
        paymentQR: null 
    });
    
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const [planToDelete, setPlanToDelete] = useState(null); 
    const { refreshAndRetry, handleInvalidJWT } = useAuthHandler();
    const isPlansFetched = useRef(false)

    const isValidForm = (plan) => {
        return plan.title && plan.description && plan.features && plan.price && plan.paymentQR;
    };

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await subscriptionPlans();
                if (!response.success) {
                    setError({ type: 'error', message: response.message });
                    return;
                }
                const order = ['monthly', 'quarterly', 'yearly'];
                const sortedPlans = response.data.sort((a, b) => order.indexOf(a.title) - order.indexOf(b.title));
                setPlans(sortedPlans);
            } catch (error) {
                setError({ type: 'error', message: 'Failed to fetch subscription plans.' });
            }
        };

        if(!isPlansFetched.current){
            fetchPlans();
            isPlansFetched.current = true
        }
    }, []);
    
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "price" && value < 0) {
            setNewPlan((prev) => ({ ...prev, [name]: 0 }));
        } else {
            setNewPlan((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleFeatureChange = (e) => {
        const value = e.target.value;
        const featureArr = value.split(",").map((item) => item.trim()); // Convert to array
        setNewPlan((prevPlan) => ({
            ...prevPlan,
            features: featureArr
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewPlan((prev) => ({ ...prev, paymentQR: file }));
        }
    };

    const handleAddPlan = async (e) => {
        e.preventDefault();

        if (!isValidForm(newPlan)) {
            setError({ type: 'error', message: 'Please fill all fields' });
            setTimeout(() => setError(null), 5000);
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('title', newPlan.title);
        formData.append('description', newPlan.description);
        formData.append('features', newPlan.features);
        formData.append('price', newPlan.price);
        formData.append('paymentQR', newPlan.paymentQR);

        const options = {
            method: 'POST',
            data: null,
            file: formData,
            isBinary: true
        };

        try {
            const response = await fetchData('admin/create-new-plan', options);
            if (!response.success) {
                if (response.message === 'jwt expired') {
                    const retryWithNewToken = await refreshAndRetry('admin/create-new-plan', options);
                    if (!retryWithNewToken.success) {
                        setError({ type: 'error', message: retryWithNewToken.message });
                        setTimeout(() => setError(null), 5000);
                        return;
                    }
                    setSuccess({ type: 'success', message: retryWithNewToken.message });
                    setNewPlan({ title: '', description: '', features: '', price: '', paymentQR: null });
                    setTimeout(() => setSuccess(null), 5000);
                    return;
                } else if (response.message === 'jwt malformed' || response.message === 'invalid signature') {
                    await handleInvalidJWT();
                    return;
                }
                setError({ type: 'error', message: response.message });
                setTimeout(() => setError(null), 5000);
                return;
            }
            setSuccess({ type: 'success', message: response.message });
            setNewPlan({ title: '', description: '', features: '', price: '', paymentQR: null });
            setTimeout(() => setSuccess(null), 5000);
        } catch (error) {
            setError({ type: 'error', message: error.message || 'Something went wrong, please try again' });
            setTimeout(() => setError(null), 5000);
        } finally {
            setLoading(false);
        }
    };

    // Handle plan deletion
    const handleDeletePlan = async (planId) => {
        const options = {
            method: 'DELETE',
            data: null,
            file: null,
            isBinary: false
        };

        try {
            const response = await fetchData(`admin/delete-plan/${planId}`, options);
            if (!response.success) {
                if (response.message === 'jwt expired') {
                    const retryWithNewToken = await refreshAndRetry(`admin/delete-plan/${planId}`, options);
                    if (!retryWithNewToken.success) {
                        setError({ type: 'error', message: retryWithNewToken.message });
                        setTimeout(() => setError(null), 5000);
                        return;
                    }
                    setSuccess({ type: 'success', message: retryWithNewToken.message });
                    setPlans((prev) => prev.filter(plan => plan._id !== planId));
                    setTimeout(() => setSuccess(null), 5000);
                    return;
                } else if (response.message === 'jwt malformed' || response.message === 'invalid signature') {
                    await handleInvalidJWT();
                    return;
                }
                setError({ type: 'error', message: response.message });
                setTimeout(() => setError(null), 5000);
                return;
            }
            setSuccess({ type: 'success', message: response.message });
            setPlans((prev) => prev.filter(plan => plan._id !== planId));
            setTimeout(() => setSuccess(null), 5000);
        } catch (error) {
            setError({ type: 'error', message: error.message || 'Failed to delete plan' });
            setTimeout(() => setError(null), 5000);
        } finally {
            setPlanToDelete(null); // Close popup after operation
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Add Plan Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-2xl font-semibold text-blue-600 mb-4">Create Membership Plan</h3>
                <form onSubmit={handleAddPlan} className="space-y-4">
                    <select
                        name="title"
                        value={newPlan.title}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select Plan Duration</option>
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                    
                    <textarea
                        placeholder="Description"
                        value={newPlan.description}
                        name="description"
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500"
                        rows="3"
                        required
                    />
                    
                    <textarea
                        placeholder="Features (comma separated)"
                        value={newPlan.features}
                        name="features"
                        onChange={handleFeatureChange}
                        className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500"
                        rows="3"
                        required
                    />
                    
                    <input
                        type="number"
                        placeholder="Price"
                        value={newPlan.price}
                        name="price"
                        onChange={handleChange}
                        min="0"
                        className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 
                                [-webkit-appearance:none] 
                                [&::-webkit-inner-spin-button]:[-webkit-appearance:none]
                                [-moz-appearance:textfield]"
                        required
                    />
                    {/* File Upload Section */}
                    <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer
                        ${newPlan.paymentQR ? 
                            'border-green-500 bg-green-50 hover:border-green-600' : 
                            'border-gray-300 hover:border-blue-500'}`}
                    >
                        <label className="flex flex-col items-center space-y-2 relative">
                            {newPlan.paymentQR && (
                                <svg 
                                    className="w-6 h-6 text-green-500 absolute top-0 right-0"
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M5 13l4 4L19 7" 
                                    />
                                </svg>
                            )}
                            <svg 
                                className={`w-8 h-8 transition-colors ${newPlan.paymentQR ? 'text-green-500' : 'text-gray-400'}`} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" 
                                />
                            </svg>
                            <span className={`font-medium transition-colors ${newPlan.paymentQR ? 'text-green-600' : 'text-gray-600'}`}>
                                {newPlan.paymentQR ? 
                                    newPlan.paymentQR.name : 
                                    'Upload Payment QR Code (PNG/JPG)'
                                }
                            </span>
                            {!newPlan.paymentQR && (
                                <span className="text-sm text-gray-500">
                                    Click to browse files
                                </span>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                                required
                            />
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-3 rounded-xl hover:bg-green-600 transition-colors disabled:bg-green-300"
                        disabled={!isValidForm(newPlan) || loading}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                            </div>
                        ) : (
                            "Create Plan"
                        )}
                    </button>
                </form>
                
                {error && (
                    <div className="mt-4 p-3 bg-red-100 text-red-600 rounded-lg">
                        {error.message}
                    </div>
                )}
                
                {success && (
                    <div className="mt-4 p-3 bg-green-100 text-green-600 rounded-lg">
                        {success.message}
                    </div>
                )}
            </div>
            
            {planToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-md w-full mx-4">
                        <p className="text-lg font-semibold mb-4">Are you sure you want to delete this plan?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => handleDeletePlan(planToDelete)}
                                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={() => setPlanToDelete(null)}
                                className="bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Plans List Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-2xl font-semibold text-blue-600 mb-6">Existing Plans</h3>
                <div className="space-y-4">
                    {plans.map(plan => (
                        <div key={plan._id} className="p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h4 className="text-xl font-semibold capitalize">{plan.title}</h4>
                                    <p className="text-2xl font-bold text-blue-600 mt-1">
                                    ₹{plan.price}<span className="text-sm text-gray-500">/month</span>
                                    </p>
                                </div>
                                <button
                                    onClick={() => setPlanToDelete(plan._id)}
                                    className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition-colors"
                                >
                                    <MdDelete className="text-xl" />
                                </button>
                            </div>
                            <p className="text-gray-600 mb-4">{plan.description}</p>
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
};

export { MembershipPlans };
