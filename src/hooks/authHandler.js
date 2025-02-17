import { useAuth } from '../context/Auth.Context.jsx'
import { fetchData } from '../services/api.js';

export const useAuthHandler = () => {
    const { logout } = useAuth()
    // expect retry api endpoint and options as input
    const refreshAndRetry = async (endpoint, options) => {
        try {
            const refreshOptions = {
                method: 'GET',
                data: null,
                file: null,
                isBinary: false
            }
            const response = await fetchData('users/refresh', refreshOptions)
            
            if (response.success) {
                const retry = await fetchData(endpoint, options)
                return retry                
            }
            console.log(response)
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
