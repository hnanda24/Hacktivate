import AppointmentContext from "./appointmentContext";
import { useState } from "react";

const AppointmentState = (props) => {

    const host = "http://localhost:5000";

    let initialAlert = {
        state: false,
        message: "",
        type: "",
    };
    const [alert, setalert] = useState(initialAlert);
    const [personalAppointments, setPersonalAppointments] = useState([]);
    const creatingAlert = (state, message, type) => {
        setTimeout(() => {
            setalert({ state, message, type });
        }, 200);

        setTimeout(() => {
            setalert({
                state: false,
                message: "",
                type: "",
            });
        }, 2000);
    };
    // book an appointment 
    const bookAppointment = async (id) => {
        const response = await fetch(`${host}/api/appoint/bookAppointment/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("auth-Token")
            },
           
        });
        const json = await response.json();
        if (json.success) {
            creatingAlert(true, "Appointment Issued", "success");

        }
        else {
            creatingAlert(true, "Failed To APPOINT", "danger");
        }


        return json;
        //   });



    };
    // api to get all the appointments from a user

    const getPersonalAppointments = async () => {
        const authToken = localStorage.getItem("auth-Token");
        const response = await fetch(`${host}/api/appoint/getAllAppointments`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": authToken,
            },
        });
        const json = await response.json();

        // console.log(json)
        // setTimeout(() => {
         setPersonalAppointments(json);

        return json;
        // }, 500);
    };
    const getPersonalAppointmentsDoc = async () => {
        const authToken = localStorage.getItem("auth-Token");
        const response = await fetch(`${host}/api/appoint/getAllAppointmentsDoc`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": authToken,
            },
        });
        const json = await response.json();


        // setTimeout(() => {
        setPersonalAppointments(json.reverse());
        // }, 500);
    };

    return (
        <AppointmentContext.Provider
            value={{
                setPersonalAppointments,
                getPersonalAppointmentsDoc,
                bookAppointment,
                getPersonalAppointments,
                personalAppointments,
                alert
            }}>
                {props.children}
        </AppointmentContext.Provider>
    )
}
export default AppointmentState;