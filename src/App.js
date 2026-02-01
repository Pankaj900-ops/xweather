import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔑 Replace with your API key (regenerate later for safety)
  const API_KEY = "ee673f4b60744de7b09123652260102";

  const handleSearch = async () => {
    if (!city) return;

    setLoading(true);
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );

      if (!response.ok) {
        throw new Error("Invalid city");
      }

      const data = await response.json();
      setWeather(data.current);
    } catch (error) {
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h2>Weather Application</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      {/* Search Button */}
      <button onClick={handleSearch}>Search</button>

      {/* Loading Message */}
      {loading && <p>Loading data…</p>}

      {/* Weather Cards */}
      {weather && (
        <div className="weather-cards">
          <div className="weather-card">
            <h4>Temperature</h4>
            <p>{weather.temp_c} °C</p>
          </div>

          <div className="weather-card">
            <h4>Humidity</h4>
            <p>{weather.humidity} %</p>
          </div>

          <div className="weather-card">
            <h4>Condition</h4>
            <p>{weather.condition.text}</p>
          </div>

          <div className="weather-card">
            <h4>Wind Speed</h4>
            <p>{weather.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
