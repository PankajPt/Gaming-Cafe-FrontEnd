
export const fetchData = async(endpoint, method = 'GET', data = null)=>{
    try {
        const config = {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }

        if(data && (method === 'POST' || method === 'PATCH' || method === 'PUT')){
            config.body = JSON.stringify(data)
        }
        const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URI}/${endpoint}`,config)
        const responseData = await response.json();
        if(!response.ok){
            return {
                success: false,
                status: responseData?.statusCode,
                message: responseData?.message
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