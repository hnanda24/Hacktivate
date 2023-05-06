import React from 'react'
import Navbar from './Navbar'
import LandingImg from "./images/landing.jpg"
import { useHistory, Link } from "react-router-dom";
import './styles/landing.css'
const LandingPage = () => {
  // let history = useHistory()
  const submit = ()=>{
    if(!localStorage.getItem("auth-token")){
      // history.push("/login");
    }
    else{
      // history.push("/AllDoctors")
    }
  }
  return (
    <>
    <div className='mainContainer'>
    <div className='smallConatiner'>
      <h1>Book your appointments<br/> today.</h1>
      <button className='login butto' onClick={submit}> <Link className='docs' to={"/AllDoctors"}>Book Now</Link> </button>
    </div>
    <img className='hello' src={LandingImg}></img>
    </div>
    </>
  )
}

export default LandingPage