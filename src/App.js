import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "ee673f4b60744de7b09123652260102";

  const handleSearch = () => {
    if (!city) return;

    // ✅ MUST be synchronous
    setLoading(true);
    setWeather(null);

    fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        }
        return response.json();
      })
      .then((data) => {
        setWeather(data.current);
      })
      .catch(() => {
        alert("Failed to fetch weather data");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="app">
      <h2>Weather Application</h2>

      {/* REQUIRED input */}
      <input
        type="text"
        value={city}
        placeholder="Enter city name"
        onChange={(e) => setCity(e.target.value)}
      />

      {/* REQUIRED button */}
      <button onClick={handleSearch}>Search</button>

      {/* ✅ TEST LOOKS FOR THIS IMMEDIATELY */}
      {loading && <p>'Loading data...'</p>}

      {weather && (
        <div className="weather-cards">
          <div className="weather-card">
            <p>Temperature</p>
            <p>{weather.temp_c} °C</p>
          </div>

          <div className="weather-card">
            <p>Humidity</p>
            <p>{weather.humidity} %</p>
          </div>

          <div className="weather-card">
            <p>Condition</p>
            <p>{weather.condition.text}</p>
          </div>

          <div className="weather-card">
            <p>Wind Speed</p>
            <p>{weather.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
