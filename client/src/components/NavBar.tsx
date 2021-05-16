import React from "react";
import {ReactComponent as Icon} from '../img/logo.svg';



function NavBar() {

  return (
    <div className="nav-bar">
          <Icon className="logo"/>
          <h1>Rick and Morty Charactes</h1>
    </div>
  );
}

export default NavBar;
