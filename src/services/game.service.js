import { fetchData } from "./api.service.js";
export const fetchGameCatalogue = async () => {
    const options = {
        method: 'GET',
        data: null,
        file: null,
        isBinary: false
    };
    try {
        const response = await fetchData(`users/catalogue`, options)
        sessionStorage.setItem('gameCatalogue', JSON.stringify(response.data));
        return response
    } catch (error) {
        return {
            success: false,
            message: error.message || "Failed to fetch game catalog."
        }
    }
}