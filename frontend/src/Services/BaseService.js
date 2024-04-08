import axios from "axios";

class BaseService{
    constructor() {
        axios.defaults.baseURL = "http://localhost:3000/api/",
        axios.defaults.withCredentials = true // for send cookies
    }
    getBaseURL() {
        return this.baseURL;
    }
}
export default BaseService = new BaseService()