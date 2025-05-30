import { useState, useEffect } from 'react';
import { FaGithub, FaUsers, FaCode, FaLink, FaEnvelope } from 'react-icons/fa';

const GitHubProfileCard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/pankajpt`);
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/30 p-6 rounded-2xl border-2 border-blue-500/30 shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)] backdrop-blur-sm">
        <div className="flex items-center gap-6">
          <div className="bg-gray-700 rounded-full w-20 h-20 animate-pulse" />
          <div className="flex-1 space-y-3">
            <div className="h-6 bg-gray-700 rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-gray-700 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-700 rounded w-5/6 animate-pulse" />
            <div className="flex gap-4 mt-2">
              <div className="h-4 bg-gray-700 rounded w-16 animate-pulse" />
              <div className="h-4 bg-gray-700 rounded w-16 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/30 p-6 rounded-2xl border-2 border-blue-500/30 shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)] backdrop-blur-sm">
        <div className="flex items-center gap-4 text-red-400">
          <div className="p-3 bg-red-500/20 rounded-full">
            <FaGithub className="text-xl" />
          </div>
          <p>Error loading profile</p>
        </div>
      </div>
    );
  }

  return (
      <div className="flex items-start gap-6">
        {/* Left Side - Profile Image */}
        <div className="flex-shrink-0">
          <div className="p-3 bg-blue-500/20 rounded-full">
            <img 
              src={profile.avatar_url} 
              alt={profile.name || profile.login} 
              className="w-20 h-20 rounded-full border-2 border-blue-400/50 object-cover"
            />
          </div>
        </div>
        
        {/* Right Side - Profile Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <FaGithub className="text-blue-400 text-xl" />
            <h3 className="text-xl font-bold text-blue-400 truncate">
              {profile.name || profile.login}
            </h3>
          </div>
          
          {/* Wrapped Bio Text */}
          <p className="text-gray-300 text-sm mb-3 line-clamp-3 break-words">
            {profile.bio || 'Full-stack developer focused on building efficient web applications.'}
          </p>
          
          {/* Email Address */}
          <div className="flex items-center gap-2 text-sm mb-3 text-gray-300">
            {/* <FaEnvelope className="text-purple-400 flex-shrink-0" /> */}
            <span className="break-all">pankajpatil4949@gmail.com</span>
          </div>
          
          <div className="flex gap-4 text-sm mb-3">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-purple-400">
                <FaUsers />
                <span className="font-bold">{profile.followers}</span>
              </div>
              <span className="text-xs text-gray-300">Followers</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-purple-400">
                <FaCode />
                <span className="font-bold">{profile.public_repos}</span>
              </div>
              <span className="text-xs text-gray-300">Repos</span>
            </div>
          </div>
          
          <a
            href={profile.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-600/50 hover:bg-blue-700/50 rounded-lg transition-all duration-300 border border-blue-400/30 hover:shadow-[0_0_15px_-5px_rgba(59,130,246,0.5)] text-sm w-full justify-center"
          >
            <FaLink className="text-blue-300" />
            <span className="text-gray-200 truncate">View GitHub Profile</span>
          </a>
        </div>
      </div>
  );
};

export default GitHubProfileCard;