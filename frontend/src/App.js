import Home from "./Components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Dashboard from "./Components/Admin/Dashboard";
import Department from "./Components/Admin/Department";
import Doctors from "./Components/Admin/Doctors";
import AddDoctor from "./Components/Admin/AddDoctor";
import Patients from "./Components/Admin/Patients";
import Appointments from "./Components/Doctor/Appointments";
import DefaultPage from "./Components/DefaultPage";
import DoctorProfile from "./Components/Doctor/DoctorProfile";
import EditDoctor from "./Components/Doctor/EditDoctor";
import DoctorChangePassword from "./Components/Doctor/DoctorChangePassword";
import Timings from "./Components/Doctor/Timings";
import PatientAppointment from "./Components/Patient/PatientAppointment";
import HomeDepartments from "./Components/Departments";
import ShowDoctors from "./Components/ShowDoctors";
import DoctorDetails from "./Components/DoctorDetails";
import FindDoctors from "./Components/Doctors";
import PatientProfile from "./Components/Patient/PatientProfile";
import PatientChangePassword from "./Components/Patient/PatientChangePassword";


function App() {
  return (
  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home/>} />
          <Route path="register" element={<Register/>} />
          <Route path="login" element={<Login/>} />
          <Route path="admin/dashboard" element={<Dashboard/>}/>
          <Route path="admin/departments" element={<Department/>}/>
          <Route path="admin/doctors" element={<Doctors/>}/>
          <Route path="/addDoctor" element={<AddDoctor/>}/>
          <Route path="admin/patients" element={<Patients/>}/>
          <Route path="/doctor/appointments" element={<Appointments/>}/>
          <Route path="/defaultPage" element={<DefaultPage/>}/>
          <Route path="doctor/profile" element={<DoctorProfile/>}/>
          <Route path="/editDoctor/:email" element={<EditDoctor/>}/>
          <Route path="/doctor/changePassword" element={<DoctorChangePassword/>}/>
          <Route path="/doctor/timings" element={<Timings/>}/>
          <Route path="/patient/appointments" element={<PatientAppointment/>}/>
          <Route path="/departments" element={<HomeDepartments/>}/>
          <Route path="/showDoctors/:id/:name" element={<ShowDoctors/>}/>
          <Route path="/doctorDetails/:id" element={<DoctorDetails/>}/>
          <Route path="doctors" element={<FindDoctors/>}/>
          <Route path="/patient/appointments" element={<PatientAppointment/>}/>
          <Route path="/patient/profile" element={<PatientProfile/>}/>
          <Route path="/patient/changePassword" element={<PatientChangePassword/>}/>
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
