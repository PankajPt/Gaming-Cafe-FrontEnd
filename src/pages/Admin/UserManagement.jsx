import { useState } from "react";
import { MdPeople, MdVerified } from 'react-icons/md';
import { FaRegSave } from 'react-icons/fa';
  

const UserManagement = () => {
      const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', email: 'john@cafe.com', role: 'user', verified: true },
        { id: 2, name: 'Jane Smith', email: 'jane@cafe.com', role: 'manager', verified: false }
      ]);

      const handleRoleChange = (userId, newRole) => {
        setUsers(users.map(user => 
          user.id === userId ? { ...user, role: newRole } : user
        ));
      };

    return(        
        <div className="bg-white p-8 rounded-2xl shadow-2xl">
            <h2 className="text-3xl font-bold text-blue-600 mb-6 flex items-center gap-2">
                <MdPeople className="text-4xl" /> User Management
            </h2>
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
                        <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-medium">{user.name}</td>
                            <td className="px-6 py-4 text-gray-600">{user.email}</td>
                            <td className="px-6 py-4">
                            <div className="flex items-center gap-1">
                                {user.verified 
                                ? <MdVerified className="text-green-500" />
                                : <span className="text-yellow-500">Pending</span>
                                }
                            </div>
                            </td>
                            <td className="px-6 py-4">
                            <select
                                value={user.role}
                                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                className="border rounded-lg px-3 py-1 bg-white"
                            >
                                <option value="user">User</option>
                                <option value="manager">Manager</option>
                            </select>
                            </td>
                            <td className="px-6 py-4">
                            <button className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 flex items-center gap-1">
                                <FaRegSave /> Save
                            </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export { UserManagement }