
import React from 'react';
import ReactPaginate from 'react-paginate';
import FilterItem from '../../components/FilterItem/FilterItem';
import SearchBox from '../../components/SearchBox/SearchBox';
import "./Navbar.scss";

const Navbar = (props) => {

  const {changeSearchParams, currentSearchParams, handlePageClick, currentPage} = props;

  const phLabel = `pH < 4`;

  return (
    <div className="nav">
      <h1><span className="nav__punk">PUNK</span> API</h1>
      <div className="nav__search">
        <SearchBox changeSearchParams={changeSearchParams}/>
        <div className="nav__filters">
          <FilterItem name="nav__ABV" min="0" max="12" step="0.5" changeSearchParams={changeSearchParams} value={currentSearchParams.abv_gt} label="ABV % > "/>
          <FilterItem name="nav__Date" min="2008" max="2023" step="1" changeSearchParams={changeSearchParams} value={currentSearchParams.brewed_before} label="Brewed before" />
          <label htmlFor="nav__ph">{phLabel}</label>
          <input type="checkbox" checked={currentSearchParams.usePh} onChange={changeSearchParams} id="nav__ph" name="nav__ph"/>
        </div>
        
        <div className="nav__change-page">
          <ReactPaginate
          breakLabel="..."
          onPageChange={handlePageClick}
          pageRangeDisplayed={11}
          pageCount={currentPage}
          renderOnZeroPageCount={null}
          activeClassName="nav__change-page__selected"
        />
        </div>
      </div>
    </div>
  )
}

export default Navbar