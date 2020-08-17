import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayCountryItem = ({country, handleShowButton}) => {
  return (
    <div>
      {`${country.name}  `}
      <button value={country.name} onClick={handleShowButton}>show</button>
    </div>
  )
}

const DisplaySpecificCountry = ({country}) => {
  const [weather, setWeather] = useState({});
  
  const hook = () => {
    const api_key = process.env.REACT_APP_API_KEY;
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      .then(res => {
        const data = res.data.current
        console.log(data);
        setWeather({...data, icon: data.weather_icons[0], description: data.weather_descriptions[0]});
      })
      .catch(e => console.error(e));
  }

  useEffect(hook, []);
  console.log(weather);
  return (
    <>
      <h1>{country.name}</h1>
      <p>
        capital: {country.capital}<br/>
        population: {country.population}
      </p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(langugage => <li key={langugage.name + country.name}>{langugage.name}</li>)}
      </ul>
      <img src={country.flag} alt={`${country.name}'s flag`} style={{"maxWidth": "200px"}}/>
      <h2>{`Weather in ${country.capital}`}</h2>
      <div>
        <strong>temperature:</strong> {weather.temperature} Celcius<br/>
        <img src={weather.icon} alt={weather.description}/><br/>
        <strong>wind:</strong> {weather['wind_speed']} mph direction {weather['wind_dir']}
      </div>
    </>
  )
}

const DisplayCountries = ({countriesToShow, handleShowButton}) => {
  let displayedResutls;

  if (countriesToShow.length > 10) {
    displayedResutls = 'Too many matches, specify another filter';
  } else if (countriesToShow.length === 1) {
    displayedResutls = <DisplaySpecificCountry country={countriesToShow[0]}/>
  } else {
    displayedResutls = countriesToShow.map(country => {
      return <DisplayCountryItem 
        country={country} 
        key={country.name} 
        handleShowButton={handleShowButton}
      />
  })
  }

  return (
    <div>
      {displayedResutls}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  const countriesToShow = (filter === '') 
    ? countries
    : countries.filter(country => country.name.toLowerCase()
        .includes(filter.toLowerCase()));

  const handleChangeFilter = (e) => {
    setFilter(e.target.value);
  }

  const handleShowButton = (e) => {
    setFilter(e.target.value);
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        console.log(res.data[0])
        setCountries(res.data)
      });
  }, [])
  
  return (
    <div>
      find countries <input value={filter} onChange={handleChangeFilter} autoFocus/>
      <DisplayCountries 
        countriesToShow={countriesToShow} 
        handleShowButton={handleShowButton}
      />
    </div>
  )
};

export default App;