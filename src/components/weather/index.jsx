import { useState } from "react";
import Search from "../search";

export default function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  async function fetchWeatherData(para) {
    try {
      console.log(para);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${para}&appid=3e23f68694616a89473d3a92516ee41f`
      );
      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.log(e);
      setError(e);
    }
  }

  function handleSearch() {
    fetchWeatherData(search);
  }

  return (
    <div className="bg-lime-700 p-4 rounded-lg">
      <h1 className="font-bold mb-4">Weather App</h1>
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
    </div>
  );
}
