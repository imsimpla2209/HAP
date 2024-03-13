import axios from "axios"
import { base_url } from "../../utils/base_url"

const getUsers = async (userData) => {
    const response = await axios.get(`${base_url}user/all-users`, userData)
    return response.data
}

const customerService = {
    getUsers,
}
export default customerService