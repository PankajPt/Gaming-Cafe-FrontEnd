import React, { useState } from "react";
import { MdDelete } from 'react-icons/md';

const MembershipPlans = () => {
    const [plans, setPlans] = useState([
        { id: 1, title: 'Basic Plan', price: 29, features: ['5hrs/week', 'Standard PCs'] },
        { id: 2, title: 'Pro Plan', price: 59, features: ['10hrs/week', 'Premium PCs', 'Priority Support'] }
    ]);
    const [newPlan, setNewPlan] = useState({ title: '', description: '', features: '', price: '' });

    const handleAddPlan = (e) => {
        e.preventDefault();
        const plan = {
            id: Date.now(),
            ...newPlan,
            features: newPlan.features.split(',').map(f => f.trim())
        };
        setPlans([...plans, plan]);
        setNewPlan({ title: '', description: '', features: '', price: '' });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Add Plan Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-2xl font-semibold text-blue-600 mb-4">Create Membership Plan</h3>
                <form onSubmit={handleAddPlan} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Plan Title"
                        value={newPlan.title}
                        onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })}
                        className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                        placeholder="Description"
                        value={newPlan.description}
                        onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                        className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500"
                        rows="3"
                    />
                    <textarea
                        placeholder="Features (comma separated)"
                        value={newPlan.features}
                        onChange={(e) => setNewPlan({ ...newPlan, features: e.target.value })}
                        className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500"
                        rows="3"
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={newPlan.price}
                        onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
                        className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="w-full bg-green-500 text-white py-3 rounded-xl hover:bg-green-600 transition-colors">
                        Create Plan
                    </button>
                </form>
            </div>

            {/* Plans List Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-2xl font-semibold text-blue-600 mb-6">Existing Plans</h3>
                <div className="space-y-4">
                    {plans.map(plan => (
                        <div key={plan.id} className="p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h4 className="text-xl font-semibold">{plan.title}</h4>
                                    <p className="text-2xl font-bold text-blue-600 mt-1">
                                        ${plan.price}<span className="text-sm text-gray-500">/month</span>
                                    </p>
                                </div>
                                <button
                                    onClick={() => setPlans(plans.filter(p => p.id !== plan.id))}
                                    className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition-colors"
                                >
                                    <MdDelete className="text-xl" />
                                </button>
                            </div>
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