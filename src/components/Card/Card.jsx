
import React from 'react';
import "./Card.scss";

const Card = (props) => {

  const {beerInfo} = props;

  const beerName = beerInfo.name;
  const beerAbv = beerInfo.abv;
  let beerTagline = beerInfo.tagline;
  const beerImage = beerInfo.image_url;
  let beerDesc = beerInfo.description;
  const beerPh = beerInfo.ph;
  const beerFirstBrew = beerInfo.first_brewed;

  if(beerTagline.charAt(beerTagline.length-1) !== ".") {
    beerTagline += "."
  };

  if(beerDesc.charAt(beerDesc.length-1) !== ".") {
    beerDesc += "."
  };

  return (
    <div className="card">
      <h3 className="card__name">{beerName}</h3>
      <h4 className="card__abv">{beerAbv} ABV</h4>
      <img src={beerImage} alt="" className="card__image"/>
      <p className="card__tag-line">{beerTagline}</p>
      <p className="card__ph">{beerPh} pH</p>
      <p className="card__first-brewed">{beerFirstBrew}</p>
      {/* <p className="card__desc">{beerDesc}</p> */}
    </div>
  )
}

export default Card