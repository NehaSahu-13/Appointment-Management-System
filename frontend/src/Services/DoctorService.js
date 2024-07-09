import axios from "axios";

class DoctorService{

    getDoctorProfile(email){
       return axios.get("http://localhost:8080/api/profile/"+email);
    }
     
    updateDoctor(doctor,image){
        const formData = new FormData();
      formData.append("doctorRes",new Blob([JSON.stringify(doctor)], { type: 'application/json' }));
        formData.append("image", image);
    
      return axios.put("http://localhost:8080/api/updateDoctor", formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    }

    changePassword(password,email){

            return axios.post(`http://localhost:8080/api/doctor_changepassword/${email}`, null, {
        params: {
        currpassword: password.currpassword,
        newpassword: password.newpassword,
        confirmpassword: password.confirmpassword
      }
    });
    }

    addTiming(newTiming,email){
      return axios.post(`http://localhost:8080/api/addTiming/${email}`, newTiming);
    }

    getTimings(email){
        return axios.get(`http://localhost:8080/api/getTimings/${email}`);
    }

    updateTiming(updateTiming){
        return axios.put("http://localhost:8080/api/updateTiming",updateTiming);
    }

    deleteTiming(id){
          return axios.delete("http://localhost:8080/api/deleteTiming/"+id)
    }
    
    getAppointments(email){
      return axios.get(`http://localhost:8080/api/getAppointments/${email}`);
    }

    changeStatus(status,id){
       return axios.post(`http://localhost:8080/api/changeStatus/${id}/${status}`);
    }

}
export default new DoctorService();