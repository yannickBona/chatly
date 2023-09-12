import React, { useEffect, useState } from "react";
import { StyledSearchbar } from "./styled";
import Button from "../Button";
import Loader from "../Loader";
import { useDebounce } from "../../utils/hooks/useDebounce";
import { getUsers } from "../../services/api/User/getUsers";
import { TUser } from "../../contexts/types";
import { $ResponseData } from "../../types";
import ProfileCard from "../ProfileCard";
import ResultCard from "../ResultCard";

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [searchResult, setSearchResult] = useState<TUser[]>([]);

  const debouncedValue = useDebounce(search);

  useEffect(() => {
    if (!debouncedValue) return setSearchResult([]);

    (async () => {
      setLoading(true);
      try {
        const response: $ResponseData<TUser[]> = await getUsers(search);
        if (response.status !== 200 || !response.data)
          return setErr("Unknown error");

        setSearchResult(response.data);
      } catch (err) {
        setErr("Unknown error");
      } finally {
        setLoading(false);
      }
    })();
  }, [debouncedValue]);

  const onResultNavigate = () => {};

  return (
    <StyledSearchbar>
      <input
        type="search"
        id="profile-search"
        placeholder="Search for a user..."
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <Button disabled={!debouncedValue} text="Search" />

      {!!search && (
        <div className="search-results">
          {!loading ? (
            !!searchResult.length ? (
              searchResult.map((r) => <ResultCard {...r} />)
            ) : (
              <p>No results found...</p>
            )
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </StyledSearchbar>
  );
};

export default Searchbar;
