
import React from 'react';
import Card from "../../components/Card/Card";
import {Link} from "react-router-dom";
import "./Cardlist.scss";

const Cardlist = (props) => {

  const {beers} = props;

  const displayBeers = (listOfBeers) => {
    const displayBeerList = listOfBeers.map((beer,index) => <Link to={`/${index+1}`} key={index} style={{ textDecoration: 'none' }} ><Card beerInfo={beer} /></Link>);
    return displayBeerList;
  }

  return (
    <div className="cardlist">
      {beers && displayBeers(beers)}
    </div>
  )
}

export default Cardlist