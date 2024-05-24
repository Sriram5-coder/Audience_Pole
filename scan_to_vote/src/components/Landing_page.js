import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./landing.css";
import 'animate.css';

function LandingPage() {

  return (
    <div className="landing-container">
     
      <Link to="/formforvote" className="animate__animated animate__rollin">
        <button className="centered-button">Get Started</button>
      </Link>
      <Link to="/login" style={{textDecoration:'none',fontSize:'20px'}}>
        -- Login --
      </Link>
     
    </div>
  );
}

export default LandingPage;
