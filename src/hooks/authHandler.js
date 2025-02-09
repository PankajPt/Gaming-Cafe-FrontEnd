import { useAuth } from '../context/Auth.Context.jsx'
import { fetchData } from '../services/api.js';

export const useAuthHandler = () => {
    const { logout } = useAuth()
    const refreshAndRetry = async (endpoint, options) => {
        try {
            const response = await fetchData('users/refresh', options)    
            if (response.success) {
                const retry = await fetchData(endpoint, options)
                return retry                
            }
            if (response.success === false && response.message === 'FRL') {
                await logout();
                return { success: false, forceLogout: true, message: response.error };
            }
            return response;
        } catch (error) {
            console.error('Network error during token refresh:', error);
            return { success: false, forceLogout: false, message: 'Network error' };
        }
    };
    

    const handleInvalidJWT = async() => {
        await logout()
        return
    }

    return { refreshAndRetry, handleInvalidJWT }
}
