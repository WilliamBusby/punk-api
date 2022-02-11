
import React from 'react';
import Cardlist from "./../Cardlist/Cardlist";

const Main = (props) => {

  const {beers} = props;
  return (
    <div className="main">
      <Cardlist beers={beers}/>
    </div>
  )
}

export default Main