// import logo from './logo.svg';
import './App.css';
// import '../src/components/styles/blogCard.css'
import '../src/components/styles/blogPage.css'
import '../src/components/styles/blogWriting.css'
import '../src/components/styles/forms.css'
import AppointmentState from "./context/appointment/AppointmentState";
import AuthState from "./context/auth/AuthState";
// import Navbar from './components/Navbar';
import Login from './components/Login';
import LandingPage from './components/LandingPage.js'
import SignUp from './components/SignUp';
import PersonalAppointments from './components/PersonalAppointments'
import {

  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
  RouterProvider,
  useParams

} from "react-router-dom";
import AllDoctors from './components/AllDoctors';
import { Children } from 'react';
import Navbar from './components/Navbar';
import CostChecker from './components/CostChecker';

function App() {
  

  
        
        
      
      
return (
  <>
   
    <AuthState>
      <AppointmentState>
        <Navbar/>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/AllDoctors' element={<AllDoctors/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>
        <Route path='/CostChecker' element={<CostChecker/>}/>
        <Route path='/PersonalAppointments' element={<PersonalAppointments/>}/>
        
      </Routes>



      </AppointmentState>
    </AuthState>
  </>
);
}

export default App;
