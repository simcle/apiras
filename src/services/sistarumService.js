import axios from "axios";

export const getBebApi = async () => {
    try {
        const data = await axios.get('http://103.184.53.236/sistarum/bebapi')
        return data.data.data
        
    } catch (error) {
        return error
    }
}

