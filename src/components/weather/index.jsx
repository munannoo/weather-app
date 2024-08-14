import { useState } from "react";
import Search from "../search";

export default function Weather() {
  const [search, setSearch] = useState("");
  return (
    <div className="bg-lime-700 p-4 rounded-lg">
      <h1 className="font-bold mb-4">Weather App</h1>
      <Search search={search} setSearch={setSearch} />
    </div>
  );
}
