import { fetchData } from "./api.service.js";
export const subscriptionPlans = async () => {
    const options = {
        method: 'GET',
        data: null,
        file: null,
        isBinary: false
    };
    try {
        const response = await fetchData(`users/subs-plans`, options)
        sessionStorage.setItem('subPlans', JSON.stringify(response.data));
        return response
    } catch (error) {
        return {
            success: false,
            message: error.message || "Failed to fetch subscription plans."
        }
    }
}
// need to handle refresh retry in this only 