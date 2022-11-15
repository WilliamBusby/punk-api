
import React from 'react';
import "./Card.scss";

const Card = (props) => {

  const { beerInfo } = props;
  const { name, abv, image_url, ph, first_brewed } = beerInfo;

  let beerTagline = beerInfo.tagline;

  // Adds a stop if tagline does not already have one.
  if(beerTagline.charAt(beerTagline.length-1) !== ".") beerTagline += ".";

  return (
    <div className="full-card">
      <div className="card">
        <h3 className="card__name">{name}</h3>
        <h4 className="card__abv">{abv} ABV</h4>
        <img src={image_url} alt={"Image of " + name} className="card__image"/>
        <p className="card__tag-line">{beerTagline}</p>
        <p className="card__ph">{ph} pH</p>
        <p className="card__first-brewed">{first_brewed}</p>
      </div>
    </div>
  )
}

export default Card