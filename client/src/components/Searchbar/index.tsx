import React, { useEffect, useState } from "react";
import { StyledSearchbar } from "./styled";
import Button from "../Button";
import Loader from "../Loader";
import { useDebounce } from "../../utils/hooks/useDebounce";

const Searchbar = () => {
  const [search, setSearch] = useState("");

  const debouncedValue = useDebounce(search);

  useEffect(() => {}, [debouncedValue]);

  return (
    <StyledSearchbar>
      <input
        type="search"
        id="profile-search"
        placeholder="Search for a user..."
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <Button text="Search" />

      <div className="search-results"></div>
    </StyledSearchbar>
  );
};

export default Searchbar;
