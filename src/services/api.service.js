
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URI;

export const fetchData = async(endpoint, {method = 'GET', data = null, file = null, isBinary = false} = {})=>{
    try {
        const config = {
            method,
            headers: isBinary ? {} : { 'Content-Type': 'application/json'},
            body: isBinary && file ? file : data ? JSON.stringify(data) : null,
            credentials: 'include'
        }

        const response = await fetch(`${BASE_URL}/${endpoint}`, config)
        const responseData = await response.json();
        if(!response.ok){
            return {
                success: false,
                statusCode: responseData?.statusCode,
                message: responseData?.message,
                data: responseData?.data || "No Data Received"
            }
        }
        return responseData
    } catch (error) {
        console.error(`${method} request error:`, error);
        return {
            success: false,
            message: error?.message
        }
    }
}
