import React from 'react';
import "./SearchBox.scss";

const SearchBox = (props) => {

  const {changeSearchParams} = props;
  return (
    <div className="search-box">
      <input id="search-box" type="text" onInput={changeSearchParams} placeholder="Search..."/>
    </div>
  )
}

export default SearchBox