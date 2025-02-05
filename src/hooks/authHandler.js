import { useAuth } from '../context/Auth.Context'
import { useNavigate } from 'react-router-dom'


export const useAuthHandler = () => {
    const refreshAndRetry = async () => {
        const { logout } = useAuth()
        const navigate = useNavigate()
        const options = {
            method: 'GET',
            credentials: 'include',
        }

        const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URI}/users/refresh`, options)
        if(!response.ok){
            try {
                await logout()
            } catch (error) {
                console.log(error.message)
            } finally{
                navigate('/logout')
                return false
            }
        }
        return true
    }

    return refreshAndRetry
}
