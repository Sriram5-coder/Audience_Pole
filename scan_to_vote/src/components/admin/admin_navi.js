import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../admin/admin.css";
import 'animate.css';

function Admin_navi() {

  return (
    <div className="landing-container">
     
      <Link to="/teamadd" className="animate__animated animate__rollin">
        <button className="centered-button">Team Add</button>
      </Link>
      <br/>
      <Link to="/result" className="animate__animated animate__rollin">
        <button className="centered-button">Results</button>
      </Link><br/>
      <Link to="/teamlist" className="animate__animated animate__rollin">
        <button className="centered-button">Team List</button>
      </Link>
      <Link to="/" style={{textDecoration:'none',fontSize:'20px'}}>
        -- Logout --
      </Link>
      
      
     
    </div>
  );
}

export default Admin_navi;