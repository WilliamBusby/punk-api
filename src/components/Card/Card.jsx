
import React, {useState} from 'react';
import "./Card.scss";

const Card = (props) => {

  const {beerInfo} = props;

  const [isDescShowing, setIsDescShowing] = useState(false);

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

  const handleIsDescShowing = () => {
    setIsDescShowing(!isDescShowing);
  }

  return (
    <div className="full-card">
      { !isDescShowing &&  <div className="card" onClick={handleIsDescShowing}>
        <h3 className="card__name">{beerName}</h3>
        <h4 className="card__abv">{beerAbv} ABV</h4>
        <img src={beerImage} alt="" className="card__image"/>
        <p className="card__tag-line">{beerTagline}</p>
        <p className="card__ph">{beerPh} pH</p>
        <p className="card__first-brewed">{beerFirstBrew}</p>
      </div>}
      {isDescShowing && <div className="card card-desc" onClick={handleIsDescShowing}>
        <h3 className="card__name">{beerName}</h3>
        <p className="card-desc__text">{beerDesc}</p>
      </div>}
    </div>

  )
}

export default Card