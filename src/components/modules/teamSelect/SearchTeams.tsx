import React from "react";
import Input from "../../primitives/Input";

function SearchTeams({
  query,
  setQuery,
}: {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  return (
    <div>
      <Input
        name="search"
        type="search"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
      />
    </div>
  );
}
export default SearchTeams;
