import axios from "axios";

class AdminService{

      getAllDepartments(){
      return axios.get("http://localhost:8080/api/admin/getAllDepartments");
      }
      getAllDoctors(){
      return axios.get("http://localhost:8080/api/doctor");
     }
     getAllPatients(){
      return axios.get("http://localhost:8080/api/patient");
     }
     getAllAppointment(){
      return axios.get("http://localhost:8080/api/admin/getAllAppointments");
     }
     getCountOfDepartments(){
      return axios.get("http://localhost:8080/api/admin/CountDepartments");
     }
     getCountOfAppointments(){
      return axios.get("http://localhost:8080/api/admin/CountAppointments");
     }
     getCountOfDoctors(){
      return axios.get("http://localhost:8080/api/admin/CountDoctors");
     }
     getCountOfPatients(){
      return axios.get("http://localhost:8080/api/admin/CountPatients");
     }
     addDepartment(name,image){
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
     
      return axios.post("http://localhost:8080/api/admin/addDepartment", formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
      
     }

     updateDepartment(name,image,id){
      const formData = new FormData();
      formData.append("name", name);
      formData.append('image', image);
      
      return axios.put("http://localhost:8080/api/admin/updateDepartment/"+id,formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
      
     }

     deleteDepartment(id){
       return axios.delete("http://localhost:8080/api/admin/department/"+id);
     }


     addDoctor(doctor,image){
      const formData = new FormData();
      formData.append("doctordto",new Blob([JSON.stringify(doctor)], { type: 'application/json' }));
      formData.append("image",image);
      return axios.post("http://localhost:8080/api/admin/addDoctor", formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
      
     }

     deleteDoctor(id){
      return axios.delete("http://localhost:8080/api/admin/deleteDoctor/"+id);
     }
     
     deletePatient(id){
      return axios.delete("http://localhost:8080/api/admin/deletePatient/"+id);
     }
}

export default new AdminService();



