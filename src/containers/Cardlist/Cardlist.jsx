
import React from 'react';
import Card from "../../components/Card/Card";
import "./Cardlist.scss";

const Cardlist = (props) => {

  const {beers} = props;

  const displayBeers = (listOfBeers) => {
    const displayBeerList = listOfBeers.map((beer,index) => <Card beerInfo={beer} key={index} />);
    return displayBeerList;
  }

  return (
    <div className="cardlist">
      {beers && displayBeers(beers)}
    </div>
  )
}

export default Cardlist