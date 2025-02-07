import { FaCalendarAlt, FaRegClock, FaRegHeart } from 'react-icons/fa';

const BookSlot = ({}) => {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-2xl">
            <h2 className="text-3xl font-bold text-blue-600 mb-6">Book a Session</h2>
            <div className="grid grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-xl">
                    <FaCalendarAlt className="text-4xl text-blue-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Available Slots</h3>
                    <div className="space-y-3">
                    {['Mon 9:00 AM', 'Wed 2:00 PM', 'Fri 7:00 AM'].map((slot) => (
                        <div key={slot} className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer">
                        <FaRegClock className="inline mr-2 text-blue-500" />
                        {slot}
                        </div>
                    ))}
                    </div>
                </div>
                <div className="bg-green-50 p-6 rounded-xl">
                    <FaRegHeart className="text-4xl text-green-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Your Bookings</h3>
                    <div className="space-y-3">
                    {['March 25 - Yoga Session', 'April 1 - PT Session'].map((booking) => (
                        <div key={booking} className="bg-white p-3 rounded-lg shadow-sm">
                        {booking}
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookSlot