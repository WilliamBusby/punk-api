import React, {useState, useEffect} from 'react';
import './App.scss';
import Navbar from "./containers/Navbar/Navbar";
import Main from "./containers/Main/Main";

const App = () => {

  const initialSearchParams = {
    beer_name: "",
    abv_gt: 0,
    brewed_before: `${Number(new Date().getFullYear())+1}`,
    page: 1
  }

  const [beers, setBeers] = useState([]);
  const [searchParams, setSearchParams] = useState(initialSearchParams);
  const [usePh, setUsePh] = useState(false);
  const [filteredBeerList, setFilteredBeerList] = useState([]);
  
  const getBeersList = async () => {
    const beerList = [];
    for(let i = 1; i<6; i++) {
      const response = await fetch(`https://api.punkapi.com/v2/beers?per_page=80&page=${i}`);
      const data = await response.json();
      beerList.push(data);
    }
    const flattenedArr = beerList.flat();
    setBeers(flattenedArr);
    setFilteredBeerList(flattenedArr);
  };

  useEffect(() => {
    getBeersList();
  },[]);

  const changeSearchParams = (event) => {
    const startingParams = searchParams;
    if(event.target.id === "search-box") {
      startingParams.beer_name = event.target.value.toLowerCase();
    } else if(event.target.id === "nav__ABV") {
      startingParams.abv_gt = event.target.value;
    } else if(event.target.id === "nav__Date") {
      startingParams.brewed_before = event.target.value;
    } else if(event.target.id === "nav__page-plus" && startingParams.page < 6) {
      startingParams.page++;
    } else if(event.target.id === "nav__page-minus" && startingParams.page > 1) {
      startingParams.page--;
    }
    setSearchParams(startingParams);
    filterBeers();
  }

  const handleUsePh = () => {
    setUsePh(!usePh);
  }

  const filterBeers = () => {
    const textFiltered = beers.filter(beer => beer.name.toLowerCase().includes(searchParams.beer_name));
    const abvFilteredBeers = textFiltered.filter(beer => beer.abv > searchParams.abv_gt);
    const brewedBeforeBeers = abvFilteredBeers.filter(beer => beer.first_brewed.slice(-4) < searchParams.brewed_before);
    const phBeers = (usePh) ? brewedBeforeBeers.filter(beer => (beer.ph < 4 && beer.ph)) : brewedBeforeBeers;
    setFilteredBeerList(phBeers);
  }

  return (
    <div className="App">
      <Navbar changeSearchParams={changeSearchParams} currentSearchParams={searchParams} handleUsePh={handleUsePh} usePh={usePh}/>
      <Main beers={filteredBeerList} usePh={usePh}/>
    </div>
  );
}

export default App;
