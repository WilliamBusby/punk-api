
import React, { useState, useEffect } from 'react';
import Card from "../../components/Card/Card";
import "./Cardlist.scss";

const Cardlist = (props) => {

  const {beers} = props;

  const displayBeers = (listOfBeers) => {
    const newBeerList = [...listOfBeers];
    const displayBeerList = newBeerList.map((beer,index) => <Card beerInfo={beer} key={index} />);
    return displayBeerList;
  }
  
  return (
    <div className="cardlist">
      {beers && displayBeers(beers)}
    </div>
  )
}

export default Cardlist