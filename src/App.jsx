import React, {useState, useEffect} from 'react';
import './App.scss';
import Navbar from "./containers/Navbar/Navbar";
import Main from "./containers/Main/Main";

const App = () => {

  const defaultUrl = "https://api.punkapi.com/v2/beers?";

  const initialSearchParams = {
    beer_name: "",
    ph: 0,
    abv_gt: 0,
    brewed_before: `01-${new Date().getFullYear()+1}`
  }

  const [beers, setBeers] = useState([]);
  const [apiUrl, setApiUrl] = useState(defaultUrl);
  const [searchParams, setSearchParams] = useState(initialSearchParams);
  
  const getBeersList = (url) => {
    return fetch(url)
      .then(response => response.json())
      .then(data => setBeers(data));
  }

  useEffect(() => {
    getBeersList(apiUrl);
  },[apiUrl]);

  const changeSearchParams = (event) => {
    const startingParams = searchParams;
    if(event.target.id === "search-box") {
      startingParams.beer_name = event.target.value.replace(" ", "_").toLowerCase();
    } else if(event.target.id === "nav__ABV") {
      startingParams.abv_gt = event.target.value;
    } else if(event.target.id === "nav__date") {
      startingParams.brewed_before = `01-${event.target.value}`;
    } else if(event.target.id === "nav__ph") {
      startingParams.ph = event.target.value;
    }
    setSearchParams(startingParams);
    updateUrl();
    getBeersList(apiUrl);
    changeForPh();
  }

  const changeForPh = () => {
    const filteredBeerList = beers.filter(beer => {return(beer.ph && (Number(beer.ph) < searchParams.ph))});
    setBeers(filteredBeerList);
  }

  const updateUrl = () => {
    let currentUrl = defaultUrl;
    if(searchParams.beer_name) currentUrl += `beer_name=${searchParams.beer_name}&`; 
    currentUrl += `abv_gt=${searchParams.abv_gt}&` + `brewed_before=${searchParams.brewed_before}&`;
    setApiUrl(currentUrl);
  }

  return (
    <div className="App">
      <Navbar changeSearchParams={changeSearchParams}/>
      <Main beers={beers}/>
    </div>
  );
}

export default App;
