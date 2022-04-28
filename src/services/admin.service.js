import api from './api'
class AdminService {
    

    getFathers() {
        return api.get("/user/fathers");
    }
    getAdmins() {
        return api.get("/user/admins");
    }
}
export default new AdminService();
