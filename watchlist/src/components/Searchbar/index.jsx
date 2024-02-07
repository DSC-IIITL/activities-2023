import { useEffect, useState } from "react";
import { IconLoader } from "@tabler/icons-react";
import "./index.css";
import MovieModal from "../MovieModal";
import useDebouce from "../../hooks/useDebounce";
import useBackdrop from "../../hooks/useBackdrop";

export default function Searchbar({ onChange = () => {}, fetchResults }) {
  const [searchString, setSearchString] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(false);

  const { ref: searchbarRef } = useBackdrop(open, setOpen);
  const { callback: debouncedFetchResults, fire } = useDebouce(() => {
    if (searchString !== "") {
      setLoading(true);
      fetchResults(searchString)
        .then((data) => {
          setResults(data);
        })
        .catch((err) => console.warn(err))
        .finally(() => setLoading(false));
    }
  });

  useEffect(() => {
    setOpen(true);
  }, [results]);

  useEffect(() => {
    onChange(value);
  }, [onChange, value]);

  useEffect(() => {
    debouncedFetchResults();
  }, [searchString]);

  return (
    <div className="search-bar" ref={searchbarRef}>
      <input
        className="search-bar__input"
        type="text"
        value={searchString}
        onChange={(ev) => setSearchString(ev.target.value)}
        onFocus={() => setOpen(true)}
        title="searchbox"
        placeholder="Search for a movie"
        onKeyDown={(ev) => {
          if (ev.key === "Enter") {
            // Search immediately
            fire();
          }
        }}
      />
      {loading && <IconLoader className="loader-icon" />}
      {results.length > 0 && (
        <div
          className={`search-bar__results ${open ? "visible" : "invisible"}`}
        >
          {results.map((result) => (
            <MovieModal
              key={result.imdbID}
              id={result.imdbID}
              trigger={
                <div
                  className="search-bar__results__result"
                  onClick={() => {
                    setValue(result);
                  }}
                >
                  {result.Poster && (
                    <img src={result.Poster} alt={"Poster"} height={"100%"} />
                  )}
                  <span>{`${result.Title}, ${result.Year}`}</span>
                </div>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
