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

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

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
          <div className="mt-3 border-t-2 border-lime-600">
            <div className="mt-3 location-details flex gap-5">
              <p>
                Results for{" "}
                <span className="font-bold">{weatherData.name}</span>
              </p>
              <p className="date">
                {days[getCurrentDate().getDay()] +
                  " / " +
                  getCurrentDate().getHours() +
                  ":00"}
              </p>
            </div>

            <div className="weather-details text-center mt-3">
              <div className="description mb-3">
                <h1 className="temp">
                  {Math.floor(weatherData?.main?.temp - 273.15)}
                </h1>
                <p>{weatherData?.weather[0]?.description}</p>
              </div>
              <div className="others flex flex-wrap justify-center mb-3">
                <h3 className="basis-1/3">Wind</h3>
                <h3 className="basis-1/3">Humidity</h3>
                <p className="wind basis-1/3">{weatherData?.wind?.speed}</p>
                <p className="humidity basis-1/3">
                  {weatherData?.main?.humidity}
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
