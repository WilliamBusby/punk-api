import React, {useState, useEffect} from 'react';
import './App.scss';
import Navbar from "./containers/Navbar/Navbar";
import Main from "./containers/Main/Main";

const App = () => {

  const defaultUrl = "https://api.punkapi.com/v2/beers?per_page=80&";

  const initialSearchParams = {
    beer_name: "",
    abv_gt: 0,
    brewed_before: `01-${Number(new Date().getFullYear())+1}`,
    page: 1
  }

  const [beers, setBeers] = useState([]);
  const [apiUrl, setApiUrl] = useState(defaultUrl);
  const [searchParams, setSearchParams] = useState(initialSearchParams);
  const [usePh, setUsePh] = useState(false);
  
  const getBeersList = (url) => {
    return fetch(url)
      .then(response => response.json())
      .then(data => setBeers(data));
  };

  useEffect(() => {
    getBeersList(apiUrl);
  },[apiUrl]);

  const changeSearchParams = (event) => {
    const startingParams = searchParams;
    if(event.target.id === "search-box") {
      startingParams.beer_name = event.target.value.replace(" ", "_").toLowerCase();
    } else if(event.target.id === "nav__ABV") {
      startingParams.abv_gt = event.target.value;
    } else if(event.target.id === "nav__Date") {
      startingParams.brewed_before = `01-${event.target.value}`;
    } else if(event.target.id === "nav__page-plus" && startingParams.page < 6) {
      startingParams.page++;
    } else if(event.target.id === "nav__page-minus" && startingParams.page > 1) {
      startingParams.page--;
    }
    setSearchParams(startingParams);
    updateUrl();
  }

  const handleUsePh = () => {
    setUsePh(!usePh);
  }

  const updateUrl = () => {
    let currentUrl = defaultUrl + `page=${searchParams.page}&abv_gt=${searchParams.abv_gt}&brewed_before=${searchParams.brewed_before}&`;
    if(searchParams.beer_name) currentUrl += `beer_name=${searchParams.beer_name}`; 
    setApiUrl(currentUrl);
  }

  return (
    <div className="App">
      <Navbar changeSearchParams={changeSearchParams} currentSearchParams={searchParams} handleUsePh={handleUsePh} usePh={usePh}/>
      <Main beers={beers} usePh={usePh}/>
    </div>
  );
}

export default App;
