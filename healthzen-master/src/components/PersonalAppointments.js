// import  { useEffect } from 'react'
import React, { useContext, useEffect, useState } from "react";
import "./styles/appointment.css";

import appointmentContext from "../context/appointment/appointmentContext";
const PersonalAppointments = () => {
  const context2 = useContext(appointmentContext);
  const { getPersonalAppointments } = context2;
  const [appoint, setappoint] = useState([]);
  const [val, setval] = useState(false);
  useEffect(() => {
    getPersonalAppointments().then((json) => {
      setappoint(json);
      setval(true);
    });

    //  console.log(personalAppointments.appointments);
  }, []);

  console.log(appoint);
  return (
    <>
       
      {appoint.map((appoints) => {
        return (
          <>
     
     <div class="card centre" style={{"width" : "18rem"}}>
  <div class="card-body">
    <h5 class="card-title">Doctor's Name</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary" key={appoints._id}>{appoints.docName}</h6>
    <p class="card-text"> {appoints.createDate.substring(0,10)}</p>
    
  </div>
</div>



            
          </>
        );
      })}

    </>
  );
  // console.log(json)
};

export default PersonalAppointments;
