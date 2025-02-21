import { MdEventNote } from 'react-icons/md';

const Events = ({upcomingEvents}) => {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-2xl">
            <h2 className="text-3xl font-bold text-blue-600 mb-6">Upcoming Events</h2>
            <div className="grid gap-6 md:grid-cols-2">
                {upcomingEvents.map((event, index) => (
                <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
                    <MdEventNote className="text-3xl text-purple-600 mb-3" />
                    <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
                    <p className="text-gray-600">{event.date}</p>
                    <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
                    Register Now
                    </button>
                </div>
                ))}
            </div>
        </div>
    )
}

export default Events