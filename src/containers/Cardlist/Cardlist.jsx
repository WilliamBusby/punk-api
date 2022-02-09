
import React, { useState, useEffect } from 'react';
import Card from "../../components/Card/Card";
import "./Cardlist.scss";

const Cardlist = () => {

  const [beers, setBeers] = useState([]);

  const getBeersList = () => {
    return fetch("https://api.punkapi.com/v2/beers?page=1&per_page=9")
      .then(response => response.json())
      .then(data => setBeers(data));
  }

  const displayBeers = (listOfBeers) => {
    const newBeerList = [...listOfBeers];
    const displayBeerList = newBeerList.map((beer,index) => <Card beerInfo={beer} key={index} />);
    return displayBeerList;
  }

  useEffect(() => {
    getBeersList();
  },[]);

  return (
    <div className="cardlist">
      {beers && displayBeers(beers)}
    </div>
  )
}

export default Cardlist