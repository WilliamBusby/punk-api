import React from 'react';
import {Link, useParams} from "react-router-dom";
import "./BeerPage.scss";

const BeerPage = (props) => {
  const {beers} = props;
  const {beerId} = useParams();

  const beerInfo = beers.filter(beer => beer.id == beerId);
  const {name, first_brewed, image_url, abv, food_pairing} = beerInfo[0];

  let tagline = beerInfo[0].tagline;
  let description = beerInfo[0].description;

  if(tagline.charAt(tagline.length-1) !== ".") tagline += ".";

  const setMaxCharacters = (text, maxNumber) => {
    const sentencesArr = text.split(".").map(sentence => sentence + ".");
    sentencesArr.pop();
    const characterLengthEachSentence = sentencesArr.map(sentence => sentence.length);
  
    let totalCharacterLength = 0;
    let numberOfSentences = 0;
  
    while(totalCharacterLength + characterLengthEachSentence[numberOfSentences] < maxNumber) {
      numberOfSentences++;
      totalCharacterLength += characterLengthEachSentence[numberOfSentences];
    }

    return sentencesArr.slice(0,numberOfSentences).join(" ");
  }

  description = setMaxCharacters(description, 400);

  const foodPairings = food_pairing.map((pairing, index) => <li key={index}>{pairing}</li>);

  return (
    <div className="beer-page">
      <Link to="/" style={{textDecoration: "none"}}><h1><span className="beer-page__punk">PUNK</span> API</h1></Link>
      <div className="beer-page__content">
        <h2 className="beer-page__name">{name}</h2>
        <h3 className="beer-page__tagline"><i>"{tagline}"</i></h3>
        <h3 className="beer-page__abv">ABV % = {abv}</h3>
        <h3 className="beer-page__first-brewed">First brewed in {first_brewed}</h3>
        <h3 className="beer-page__description">"{description}"</h3>
        <ul className="beer-page__food-pairing">Recommended food pairings: {foodPairings}</ul>
        <div className="beer-page__image">
          <img src={image_url} alt={name}/>
        </div>
      </div>
    </div>
  )
}

export default BeerPage