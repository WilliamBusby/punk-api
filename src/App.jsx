import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.scss';
import Navbar from "./containers/Navbar/Navbar";
import Main from "./containers/Main/Main";
import BeerPage from './components/BeerPage/BeerPage';

const App = () => {

  // Initial search params
  const initialSearchParams = {
    beer_name: "",
    abv_gt: 0,
    brewed_before: `${Number(new Date().getFullYear())+1}`,
    usePh: false
  }

  // States
  const [beers, setBeers] = useState([]); // Full list
  const [filteredBeerList, setFilteredBeerList] = useState([]); // List based on filters
  const [displayedBeers, setDisplayedBeers] = useState([]); // Currently shown beers
  const [searchParams, setSearchParams] = useState(initialSearchParams); // Current search params
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [pageStart, setPageStart] = useState(0); // Current beer number to start
  
  // Gets full beer list
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

  // Calls getBeersList once on load
  useEffect(() => {
    getBeersList();
  },[]);

  // Updates displayed beers list anytime page or filtered list changes
  useEffect(() => {
    setDisplayedBeers(filteredBeerList.slice(pageStart, pageStart + 30));
    setCurrentPage(Math.ceil(filteredBeerList.length / 30));
  },[currentPage, pageStart, filteredBeerList]);

  // Handles changing page
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 18) % filteredBeerList.length;
    setPageStart(newOffset);
  }

  // Updates search params
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

  // Filters beers from current state values
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
          element = {<> <Navbar changeSearchParams={changeSearchParams} currentSearchParams={searchParams} handlePageClick={handlePageClick} currentPage={currentPage} />
          <Main beers={displayedBeers} /> </>}> 
          </Route>
          
          <Route 
          path="/punk-api"
          element = {<Navigate to="/" replace />}> 
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
