import { GiArtificialIntelligence, GiSpy, GiPadlock } from 'react-icons/gi';

const UserDetails = ({ userDetails }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/30 p-6 rounded-2xl border-2 border-blue-500/30 shadow-[0_0_15px_-5px_rgba(59,130,246,0.3)]">
        <div className="flex items-center mb-4">
          <GiArtificialIntelligence className="text-2xl text-purple-400 mr-3" />
          <span className="text-sm font-semibold text-blue-300 uppercase tracking-wide">Digital Identity</span>
        </div>
        <p className="text-2xl font-bold text-blue-100">{userDetails.fullname}</p>
      </div>

      <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/30 p-6 rounded-2xl border-2 border-blue-500/30 shadow-[0_0_15px_-5px_rgba(59,130,246,0.3)]">
        <div className="flex items-center mb-4">
          <GiSpy className="text-2xl text-purple-400 mr-3" />
          <span className="text-sm font-semibold text-blue-300 uppercase tracking-wide">Operative Handle</span>
        </div>
        <p className="text-2xl font-bold text-blue-100">@{userDetails.username}</p>
      </div>

      <div className="col-span-full bg-gradient-to-br from-blue-900/50 to-purple-900/30 p-6 rounded-2xl border-2 border-blue-500/30 shadow-[0_0_15px_-5px_rgba(59,130,246,0.3)]">
        <div className="flex items-center mb-4">
          <GiPadlock className="text-2xl text-purple-400 mr-3" />
          <span className="text-sm font-semibold text-blue-300 uppercase tracking-wide">Secure Channel</span>
        </div>
        <p className="text-2xl font-bold text-blue-100 break-all">{userDetails.email}</p>
      </div>
    </div>
  );
};

export default UserDetails;