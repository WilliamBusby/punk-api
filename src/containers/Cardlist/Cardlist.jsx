
import React from 'react';
import Card from "../../components/Card/Card";
import "./Cardlist.scss";

const Cardlist = (props) => {

  const {beers, usePh} = props;

  const displayBeers = (listOfBeers) => {
    const newBeerList = [...listOfBeers];
    const filteredBeerList = (usePh) ? filterByPh(newBeerList) : newBeerList;
    const displayBeerList = filteredBeerList.map((beer,index) => <Card beerInfo={beer} key={index} />);
    return displayBeerList;
  }

  const filterByPh = (beerList) => {
    return beerList.filter(beer => (beer.ph < 4 && beer.ph));
  }

  return (
    <div className="cardlist">
      {beers && displayBeers(beers)}
    </div>
  )
}

export default Cardlist