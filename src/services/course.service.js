import api from './api';
class CourseService {

    getAll() {
        return api.get("/course/");

    }
    getCourse(id){
        return api.get("/course/" + id)
    }
    getCourseByUserByCourse(email,id){
        return api.get("/user/" + email + "/course/" + id)
    }
    getSections(id){
        return api.get("/course/" + id + "/sections")

    }
    remove(id){
       
        return api.delete("/course/" + id)

    }
    

    getSection(section_id, email){
        return api.get("/course/section/" + section_id + "/" + email)

    }


}
export default new CourseService();
