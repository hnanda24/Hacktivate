import React, { useContext, useEffect, useState } from "react";
import authContext from "../context/auth/authContext";
import appointmentContext from "../context/appointment/appointmentContext";
// import Doctor from "./Doctor";/

import { useParams, Link } from "react-router-dom";


const AllDoctors = () => {
  const context = useContext(authContext);
  const context2 = useContext(appointmentContext);
  const { Doctors,fetchAllDoctors } = context;
  const{bookAppointment} =context2;
  
  useEffect(() => {

    fetchAllDoctors().then(() => {
 
        
    });
    document.title = "HealthZen - All Doctors";

 
  }, []);
return(
    <>
    <div className="container">
    {Doctors.map((doc)=>{
        return(
            <>
            
<div className="card text-center" key={doc.phone}>
  <div className="card-header">
    {doc.name}
  </div>
  <div className="card-body">
    <h5 className="card-title">{doc.state}</h5>
    <p className="card-text">{doc.address}</p>
    <button className="btn btn-primary button" onClick={()=>{bookAppointment(doc._id)
    }} >Book An Appointment</button>
  </div>
  <div className="card-footer text-muted">
    {doc.specialization}
  </div>
</div>
            </>

        )
    })}
    </div>
    </>
)
}
export default AllDoctors;
