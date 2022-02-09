
import React from 'react';
import "./Navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <h1><span className="navbar__punk">PUNK</span> API</h1>
      <div className="navbar__search">
        <label htmlFor="searchBar">Search</label>
        <input type="text" name="searchBar" id="searchBar"/>

        <label htmlFor="ph">pH</label>
        <input type="checkbox" name="ph"/>
      </div>
    </div>
  )
}

export default Navbar