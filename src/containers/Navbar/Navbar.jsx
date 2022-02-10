
import React from 'react';
import FilterItem from '../../components/FilterItem/FilterItem';
import SearchBox from '../../components/SearchBox/SearchBox';
import "./Navbar.scss";

const Navbar = (props) => {

  const {changeSearchParams} = props;

  return (
    <div className="navbar">
      <h1><span className="navbar__punk">PUNK</span> API</h1>
      <div className="navbar__search">
        <SearchBox changeSearchParams={changeSearchParams}/>
        <FilterItem name="nav__ABV" min="0" max="12" step="0.5" changeSearchParams={changeSearchParams}/>
        <FilterItem name="nav__date" min="2008" max="2023" step="1" changeSearchParams={changeSearchParams}/>
        <FilterItem name="nav__ph" min="0" max="6" step="0.2" changeSearchParams={changeSearchParams}/>
      </div>
    </div>
  )
}

export default Navbar