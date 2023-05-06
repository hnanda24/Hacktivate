import React, { useState, useContext, useEffect } from "react";
import authContext from "../context/auth/authContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

// import Notification from "./Notification";
const SignUp = () => {
  const history = useNavigate();
  const context = useContext(authContext);
  const { signUp } = context;

  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [pass, setpass] = useState();
  const [conpass, setConpass] = useState();
  const [state, setstate] = useState();
  const [phone, setphone] = useState();

  // const [dob, setdob] = useState();

  //   const [conpass, setConpass] = useState();
  //   const [message, setmessage] = useState("")
  // const [noti, setnoti] = useState(false)
  document.title = "HealthZen - Sign Up"

  useEffect(() => {
    if (localStorage.getItem("auth-Token")) {
      history("/");
    }
  }, []);

  const setName = (e) => {
    setname(e.target.value);
  };
  const setMail = (e) => {
    setemail(e.target.value);
  };
  const setPass = (e) => {
    setpass(e.target.value);
  };
  const setConPass = (e) => {
    setConpass(e.target.value);
  };
  const setState = (e) => {
    setstate(e.target.value);
  };
  const setPhone = (e) => {
    setphone(e.target.value);
  };


  const SignUpAttempt = (e) => {
    e.preventDefault();
    if (pass === conpass && pass.length > 5 && name.length > 3) {
      signUp(name, email, pass,state,phone).then((res) => {
        if (res.success) {
          localStorage.setItem("auth-Token", res.authToken);
          history("/");
        }
        
      });
    }
    //  checking if password matches
    
    // checking if pass is more than 5 chars or not
    
    // checking if username is more than 3 chars
    
  };

  return (
    <>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="blogWriting-bg"
      ></motion.div>
      <div className="signUp-bg-img"></div>
      <div className="blogWritingBox">
        <motion.form
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="form "
          onSubmit={SignUpAttempt}
        >
          <div className="formElem">
            <label htmlFor="name">Enter Name</label>

            <input
              placeholder="Enter your Full Name"
              className="formInput"
              type="text"
              id="name"
              name="name"

              onChange={setName}
            />
          </div>
          <div className="formElem">
            <label htmlFor="email">Enter your email</label>
            <input
              placeholder="Enter your Email Id"
              className="formInput"
              type="email"
              id="email"
              name="email"
              onChange={setMail}
            />
          </div>
          <div className="formElem">
            <label htmlFor="password">Password</label>
            <input
              placeholder="Enter a password"
              className="formInput"
              type="password"
              id="password"
              name="password"
              onChange={setPass}
            />
            <label htmlFor="password">(containing atleast 5 characters)</label>
          </div>
          <div className="formElem">
            <label htmlFor="Conpassword">Confirm Password</label>
            <input
              placeholder="Re-enter your passord"
              className="formInput"
              type="password"
              id="Conpassword"
              name="Conpassword"
              onChange={setConPass}
            />
            
          </div>
          <div className="formElem">
            <label htmlFor="state">Enter Your location(state)</label>
            <input
              placeholder="Your State"
              className="formInput"
              type="text"
              id="State"
              name="State"
              onChange={setState}
            />

          </div>
          <div className="formElem">
            <label htmlFor="phone">Enter Your phone number</label>
            <input
              placeholder="Your Phone NUmber"
              className="formInput"
              type="number"
              id="Phone"
              name="Phone"
              onChange={setPhone}
            />

          </div>
         
          <div className="formElem">
            <button className="submitBtn" type="submit">
              Sign Up
            </button>
            <Link className="link" to={"/Login"}>
              Already have an account? Login
            </Link>
            
          </div>
        </motion.form>
      </div>
    </>
  );
};

export default SignUp;
