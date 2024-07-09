import axios from "axios";

class PatientService{

    getAppointments(email){
        return axios.get("http://localhost:8080/api/getPatientAppointments/"+email);
    }

    getPatientProfile(email){
        return axios.get("http://localhost:8080/api/getPatientProfile/"+email);
    }

    updatePatient(patient){
        return axios.put(`http://localhost:8080/api/updatePatientProfile/${patient.patientId}`,null, {
            params: {
            name: patient.name,
            phoneNumber:patient.phoneNumber,
            age: patient.age,
            gender: patient.gender
          }});
    }

    changePassword(password,email){

        return axios.post(`http://localhost:8080/api/patient_changepassword/${email}`, null, {
    params: {
    currpassword: password.currpassword,
    newpassword: password.newpassword,
    confirmpassword: password.confirmpassword
  }
});
}


}

export default new PatientService();