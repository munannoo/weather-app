import { useState } from "react";
import Search from "../search";

export default function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  async function fetchWeatherData(para) {
    setWeatherData(null);
    setErrorMsg(null);
    setLoading(true);
    try {
      setLoading(true);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${para}&appid=3e23f68694616a89473d3a92516ee41f`
      );
      if (!response.ok) {
        setErrorMsg(response.statusText);
        setWeatherData(null);
      }
      const data = await response.json();

      if (data) {
        setWeatherData(data);
        setLoading(false);
      }

      console.log(data, "fetch ma");
    } catch (e) {
      console.log("catched?");

      setLoading(false);
      setErrorMsg(e.toString());
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
    <div className="bg-lime-700 p-4 rounded-lg mt-20">
      <h1 className="font-bold mb-4">Weather App</h1>
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {loading ? <p>loading data pls wait...</p> : null}

      {errorMsg ? (
        <p>
          An Error has occured!! <br /> error:
          <span className="text-red-600"> {errorMsg}</span>
        </p>
      ) : null}

      <div>
        {weatherData && !errorMsg ? (
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
