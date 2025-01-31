import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const login  = async(username, password) => {
        const loginData = {
            username,
            password
        }
        // console.log(JSON.stringify(loginData))
        try {
            const response = await fetch(`https://madgearapi.onrender.com/api/v1/users/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loginData)
                }
            )
            const userData = await response.json()
            console.log(userData)
            if (!response.ok){
                // localStorage.setItem('userData', "")
                return userData.message
            }
            setUser(userData.role)
            localStorage.setItem('userData', JSON.stringify(userData))
            console.log(localStorage.getItem(userData))
        } catch (error) {
            return error.message
        }
    }

    const logout = async()=>{
        setUser(null)
        localStorage.removeItem(user)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
          {children}
        </AuthContext.Provider>
      );
}

export const useAuth = () => useContext(AuthContext);