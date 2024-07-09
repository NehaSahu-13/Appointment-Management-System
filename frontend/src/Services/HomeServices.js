import axios from "axios";

class HomeServices{
   
    login(user) {
          return axios.post("http://localhost:8080/api/login",user);
    }

    registerPatient(user){
        return axios.post("http://localhost:8080/api/registerPatient", null, {
            params: {
            name: user.name,
            email: user.email,
            password: user.password
          }});
    }

     getAllDepartments(){
        return axios.get("http://localhost:8080/api/admin/getAllDepartments");
    }
    
    searchDepartment(searchTerm){
       return axios.get(`http://localhost:8080/api/searchDepartment/${searchTerm}`)
    }

    getDoctorsByDepartment(id){
       return axios.get(`http://localhost:8080/api/getDoctorsByDepartment/${id}`)
    }

    getDoctorDetail(id){
       return axios.get(`http://localhost:8080/api/getDoctorDetail/${id}`)
    }
    bookAppointment(appointment,email){
       return axios.post(`http://localhost:8080/api/bookAppointment/${email}`,appointment);
    }

    getAllDoctors(){
      return axios.get("http://localhost:8080/api/doctor");
     }

     searchDoctor(searchTerm){
         return axios.get(`http://localhost:8080/api/searchDoctor/${searchTerm}`)
     }
}
export default new HomeServices();