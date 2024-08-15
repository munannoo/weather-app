import { useState } from "react";
import Search from "../search";

export default function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  async function fetchWeatherData(para) {
    setLoading(true);
    try {
      console.log(para);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${para}&appid=3e23f68694616a89473d3a92516ee41f`
      );
      const data = await response.json();
      if (data) {
        setWeatherData(data);
        setLoading(false);
      }

      console.log(data);
    } catch (e) {
      setLoading(false);
      console.log(e);
      setError(e);
    }
  }

  function handleSearch() {
    fetchWeatherData(search);
  }

  function getCurrentDate() {
    return new Date();
  }

  return (
    <div className="bg-lime-700 p-4 rounded-lg">
      <h1 className="font-bold mb-4">Weather App</h1>
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {loading ? <p>loading data pls wait...</p> : null}

      <div>
        {weatherData ? (
          <div>
            Results for <span className="font-bold">{weatherData.name}</span>
            <p className="date">
              {getCurrentDate().getDate() +
                "/" +
                getCurrentDate().getMonth() +
                "/" +
                getCurrentDate().getFullYear()}
            </p>
            <div className="weather-details">
              <p className="description">
                {weatherData?.weather[0]?.description}
              </p>
              <p className="temp">{weatherData?.main?.temp}</p>
              <p className="win">{weatherData?.wind?.speed}</p>
              <p className="humidity">{weatherData?.main?.humidity}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
