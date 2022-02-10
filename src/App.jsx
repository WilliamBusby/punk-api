import React, {useState, useEffect} from 'react';
import './App.scss';
import Navbar from "./containers/Navbar/Navbar";
import Main from "./containers/Main/Main";

const App = () => {

  const defaultUrl = "https://api.punkapi.com/v2/beers?";

  const searchParams = {
    beer_name: "",
    ph: 0,
    abv_gt: 0,
    brewed_before: `${new Date().getMonth()}-${new Date().getFullYear()}`
  }

  const [beers, setBeers] = useState([]);
  const [apiUrl, setApiUrl] = useState(defaultUrl);

  const getBeersList = (url) => {
    return fetch(url)
      .then(response => response.json())
      .then(data => setBeers(data));
  }

  useEffect(() => {
    getBeersList(apiUrl);
  },[apiUrl]);

  const changeSearchParams = (event) => {
    if(event.target.id === "search-box" && event.target.value.length > 0) {
      searchParams.beer_name = event.target.value.replace(" ", "_").toLowerCase();
      updateUrl("beer_name", searchParams.beer_name);
    } else if(event.target.id === "nav__ABV") {
      searchParams.abv_gt = event.target.value;
      updateUrl("abv_gt", searchParams.abv_gt);
    } else if(event.target.id === "nav__date") {
      searchParams.brewed_before = event.target.value;
      updateUrl("brewed_before", searchParams.brewed_before);
    }
  }

  const updateUrl = (inputName, inputObjectValue) => {
    let addedSearchParams = "";
    if(inputObjectValue) addedSearchParams += `${inputName}=${inputObjectValue}&`;
    setApiUrl(defaultUrl + addedSearchParams);
  }

  return (
    <div className="App">
      <Navbar changeSearchParams={changeSearchParams}/>
      <Main beers={beers}/>
    </div>
  );
}

export default App;
