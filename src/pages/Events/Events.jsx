import React from 'react'

export default function Events() {
  return (
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold">Upcoming Events</h2>
          <p className="mt-4 text-lg">Join us for tournaments, competitions, and more!</p>
          <div className="mt-8">
            <div className="bg-blue-600 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold">Monthly Tournament</h3>
              <p className="mt-2">Get ready to compete! Join our monthly gaming tournament and win exciting prizes.</p>
            </div>
          </div>
        </div>
      </section>
  );
}