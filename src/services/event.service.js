import { fetchData } from "./api.service"

export const fetchEvents = async() => {
    const options = {
        method: 'GET',
        data: null,
        file: null,
        isBinary: false
    };
    try {
        const response = fetchData('users/events', options)
        sessionStorage.setItem('events', JSON.stringify(response.data));
        return response
    } catch (error) {
        return {
            success: false,
            message: error.message || "Failed to load current events."
        }
    }
}
