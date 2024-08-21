import { useState } from "react";

export default function Search({ search, setSearch, handleSearch }) {
  return (
    <div className="search-engine">
      <h3 className="font-bold mb-2">Search for the city</h3>
      <input
        type="text"
        className="p-3 py-2 rounded-lg mr-2 bg-lime-950"
        placeholder="Enter a city name"
        name="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <button
        onClick={handleSearch}
        className="p-3 py-2 rounded-lg bg-lime-950"
      >
        Submit
      </button>
    </div>
  );
}
