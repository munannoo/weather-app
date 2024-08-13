import { useState } from "react";

export default function Search() {
  const [serach, setSearch] = useState(null);
  return (
    <div className="search-engine">
      Search
      <input
        type="text"
        className="search-city"
        placeholder="Enter a city name"
        name="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
    </div>
  );
}
