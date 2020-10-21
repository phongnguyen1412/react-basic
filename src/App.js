import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import keys from './config'

function App() {
  const dateBuild = (d) => {
    let date = String(new window.Date());
    date = date.slice(3, 15);
    return date;
  };


  const [query, setQuery] = useState("");

  const [weather, setWeather] = useState({});

  const [notfound, setNotfound] = useState({});

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${keys.BASE_URL}weather?q=${query}&units=metric&APPID=${keys.API_KEY}`)
        .then((res) =>  res.json())
        .then((result) => {
          if (result.cod == 200) {
            setQuery("");
            setWeather(result);
          } else {
            setNotfound({ value: 'Not found city' })
          }
        });
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        React Weather App
      </header>
      <div className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 18
            ? "App hot"
            : "App cold"
          : "App"
      }>
        <main>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search..."
              className="search-bar"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </div>
          <div className="notfound">
            {notfound.value}
          </div>
          {typeof weather.main != "undefined" ? (
            <div>
              <div className="location-container">
                <div className="location">
                  {weather.name}, {weather.sys.country}
                </div>
                <div className="date"> {dateBuild(new Date())}</div>
              </div>
              <div className="weather-container">
                <div className="temperature">
                  {Math.round(weather.main.temp)}°C
            </div>
                <div className="weather">{weather.weather[0].main}</div>
              </div>
            </div>
          ) : (
              ""
            )}
        </main>
      </div>
      <footer>

      </footer>
    </div>
  );
}

export default App;
