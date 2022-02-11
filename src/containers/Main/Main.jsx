
import React from 'react';
import Cardlist from "./../Cardlist/Cardlist";

const Main = (props) => {

  const {beers, usePh} = props;
  return (
    <div className="main">
      <Cardlist beers={beers} usePh={usePh}/>
    </div>
  )
}

export default Main