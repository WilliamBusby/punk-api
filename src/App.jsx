import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.scss';
import Navbar from "./containers/Navbar/Navbar";
import Main from "./containers/Main/Main";
import BeerPage from './components/BeerPage/BeerPage';

const App = () => {

  const initialSearchParams = {
    beer_name: "",
    abv_gt: 0,
    brewed_before: `${Number(new Date().getFullYear())+1}`,
    usePh: false
  }

  const [beers, setBeers] = useState([]);
  const [filteredBeerList, setFilteredBeerList] = useState([]);
  const [displayedBeers, setDisplayedBeers] = useState([]);
  const [searchParams, setSearchParams] = useState(initialSearchParams);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageStart, setPageStart] = useState(0);
  
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

  useEffect(() => {
    setDisplayedBeers(filteredBeerList.slice(pageStart, pageStart + 30));
    setCurrentPage(Math.ceil(filteredBeerList.length / 30));
  },[currentPage, pageStart, filteredBeerList]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 18) % filteredBeerList.length;
    setPageStart(newOffset);
  }

  const changeSearchParams = (event) => {
    const startingParams = searchParams;
    if(event.target.id === "search-box") {
      startingParams.beer_name = event.target.value.toLowerCase();
    } else if(event.target.id === "nav__ABV") {
      startingParams.abv_gt = event.target.value;
    } else if(event.target.id === "nav__Date") {
      startingParams.brewed_before = event.target.value;
    } else if(event.target.id === "nav__ph") {
      startingParams.usePh = !startingParams.usePh;
    }
    setCurrentPage(1);
    setPageStart(0);
    setSearchParams(startingParams);
    filterBeers();
  }

  const filterBeers = () => {
    const textFiltered = beers.filter(beer => beer.name.toLowerCase().includes(searchParams.beer_name));
    const abvFilteredBeers = textFiltered.filter(beer => beer.abv > searchParams.abv_gt);
    const brewedBeforeBeers = abvFilteredBeers.filter(beer => beer.first_brewed.slice(-4) < searchParams.brewed_before);
    const phBeers = brewedBeforeBeers.filter(beer => (searchParams.usePh) ? (beer.ph < 4 && beer.ph) : beer);
    setFilteredBeerList(phBeers);
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
          path="/"
          element = {<><Navbar changeSearchParams={changeSearchParams} currentSearchParams={searchParams} handlePageClick={handlePageClick} currentPage={currentPage} />
          <Main beers={displayedBeers}/></>}> 
          </Route>
          <Route 
          path="/:beerId"
          element= {<BeerPage beers={beers} />}>
          </Route>
        </Routes>
        
      </div>
    </Router>

  );
}

export default App;
