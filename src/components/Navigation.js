import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className='navigation'>
      <NavLink to='/'>Accueil</NavLink>
      <NavLink to='/about'>A propos</NavLink>
      <NavLink to='/news'>News</NavLink>
    </div>
  );
};

export default Navigation;
