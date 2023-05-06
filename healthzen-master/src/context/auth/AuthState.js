import AuthContext from "./authContext";
import React , {useState} from 'react'

const AuthState = (props) => {
  const [Doctors, setDoctors] = useState([]);
  // const [authName, setauthName] = useState("")
  const host = "http://localhost:5000";
  // const [status, setStatus] = useState([])
  const login = async (email, password) => {
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    const json = await response.json();
    // console.log(json);
    return json;
    // setStatus(json);
  };
  const signUp = async (name, email, password,state,phone) => {
    const response = await fetch(`${host}/api/auth/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ name: name, email: email, password: password,role:"Patient",phone:phone
      ,state:state }),
    });
    const json = await response.json();
    return json;
  };
  const getUser = async (id) => {
    const response = await fetch(`${host}/api/auth/getUser`, {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
        "user-id": id,
      },
    });
    const json = await response.json();
    return json;
  };

  const fetchAllDoctors = async ()=>{
    const response = await fetch(`${host}/api/auth/fetchAllDoctors`, {
        method: "GET",
        headers: {
          "Content-Type": "Application/json",
          
        },
      });
      const json = await response.json();
      setDoctors(json);
      console.log(json)
      return json;
    };
  return (
    <AuthContext.Provider
      value={{
        Doctors,
        login,
        signUp,
        getUser,
        fetchAllDoctors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
