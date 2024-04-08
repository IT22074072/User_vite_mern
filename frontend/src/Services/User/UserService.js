import axios from "axios";
import BaseService from "../BaseService";

class UserService{
    constructor() {
        BaseService.getBaseURL()
        this.GET_USER = "user/getusers";
        this.RESET_PASS = "auth/reset-password";
        this.SIGNOUT = "auth/signout";
    }
    
    getUsers() {
        return axios.get(this.GET_USER)
    }
    deleteUser(id) {
        return axios.delete(`user/deleteUser/${id}`)
    }
    resetPassword(email) {
        console.log(email)
        let data = { email }
        return axios.post(this.RESET_PASS,data)
    }
    addNewPassword(token,password) {
        let data = { password }
        return axios.post(`auth/verify-reset-password/${token}`,data)
    }
    signOut(){
        return axios.get(this.SIGNOUT)
    }
}
export default UserService = new UserService()