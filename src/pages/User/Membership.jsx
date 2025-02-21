import { MdPayment } from 'react-icons/md';

const Membership = ({activePlan}) => {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-2xl">
            <h2 className="text-3xl font-bold text-blue-600 mb-6">My Membership</h2>
            
            {/* Membership Details */}
            <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-2xl font-bold">{activePlan}</h3>
                        <p className="mt-2 opacity-90">Valid until: December 31, 2024</p>
                    </div>
                <MdPayment className="text-4xl opacity-90" />
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold">12</div>
                        <div className="text-sm opacity-90">Sessions Left</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold">5</div>
                        <div className="text-sm opacity-90">Active Challenges</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold">Gold</div>
                        <div className="text-sm opacity-90">Member Tier</div>
                    </div>
                </div>
            </div>

            {/* Previous Plan Details */}
            <div className="mt-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Previous Plans</h3>
                <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <h4 className="font-semibold text-gray-700">Basic Membership</h4>
                        <p className="text-sm text-gray-600">Valid until: June 30, 2023</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <h4 className="font-semibold text-gray-700">Trial Membership</h4>
                        <p className="text-sm text-gray-600">Valid until: March 31, 2023</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Membership