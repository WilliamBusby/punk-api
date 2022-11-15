import React from 'react';
import {Link, useParams} from "react-router-dom";
import "./BeerPage.scss";

const BeerPage = (props) => {
  const {beers} = props;
  const {beerId} = useParams();

  // Get beer from beer id
  const beerInfo = beers.filter(beer => String(beer.id) === String(beerId));

  // Returns 404 if beer not found
  if(beerInfo.length === 0 ) {return (
  <div className="beer-page">
    <Link to="/" style={{textDecoration: "none"}}><h1><span className="beer-page__punk">PUNK</span> API</h1></Link>
    <div className="beer-page__center">404 Beer Not Found</div>
  </div>)}

  const {name, first_brewed, image_url, abv, food_pairing} = beerInfo[0];

  let tagline = beerInfo[0].tagline;
  let description = beerInfo[0].description;

  // Adds full stop to tagline.
  if(tagline.charAt(tagline.length-1) !== ".") tagline += ".";

  // Maxes the number of sentences that a description can have.
  const setMaxCharacters = (text, maxNumber) => {
    if(text.indexOf(".") === -1) {return text + "."}
    const sentencesArr = text.split(".").filter(sentence => sentence).map(sentence => sentence + ".");
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
    <>
    {(beers !== []) && (
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
          <img src={image_url} alt={"Image of " + name}/>
        </div>
      </div>
    </div>
    )}
    </>
  )
}

export default BeerPage