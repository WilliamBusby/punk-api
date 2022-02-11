
import React from 'react';
import ChangePageButton from '../../components/ChangePageButton/ChangePageButton';
import FilterItem from '../../components/FilterItem/FilterItem';
import SearchBox from '../../components/SearchBox/SearchBox';
import "./Navbar.scss";
import leftArrow from "./../../assets/left-arrow.png";
import rightArrow from "./../../assets/right-arrow.png";

const Navbar = (props) => {

  const {changeSearchParams, currentSearchParams} = props;

  return (
    <div className="nav">
      <h1><span className="nav__punk">PUNK</span> API</h1>
      <div className="nav__search">
        <SearchBox changeSearchParams={changeSearchParams}/>
        <div className="nav__filters">
          <FilterItem name="nav__ABV" min="0" max="12" step="0.5" changeSearchParams={changeSearchParams}/>
          <FilterItem name="nav__Date" min="2008" max="2023" step="1" changeSearchParams={changeSearchParams}/>
          <FilterItem name="nav__pH" min="3" max="6" step="0.2" changeSearchParams={changeSearchParams}/>
        </div>
        <div className="nav__change-page">
          <ChangePageButton id="nav__page-plus" img={rightArrow} changeSearchParams={changeSearchParams} />
          <p className="nav__text">{currentSearchParams.page}</p>
          <ChangePageButton id="nav__page-minus" img={leftArrow} changeSearchParams={changeSearchParams} />
        </div>
      </div>
    </div>
  )
}

export default Navbar