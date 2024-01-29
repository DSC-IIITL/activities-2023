import { useEffect, useRef, useState } from "react";
import { IconLoader } from "@tabler/icons-react";
import "./index.css";

export default function Searchbar({ onChange, fetchResults }) {
  const [searchString, setSearchString] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const isTypingRef = useRef(null);

  useEffect(() => {
    setOpen(true);
  }, [results]);

  useEffect(() => {
    onChange(value);
  }, [onChange, value]);

  useEffect(() => {
    if (isTypingRef.current !== null) clearTimeout(isTypingRef.current);
    isTypingRef.current = setTimeout(() => {
      if (searchString !== "") {
        setLoading(true);
        fetchResults(searchString)
          .then((data) => {
            setLoading(false);
            setResults(data);
          })
          .catch((err) => console.warn(err));
      }
    }, 2000);
  }, [fetchResults, searchString]);

  return (
    <div className="search-bar">
      <input
        className="search-bar__input"
        type="text"
        value={searchString}
        onChange={(ev) => setSearchString(ev.target.value)}
        onBlur={() => setOpen(false)}
        onFocus={() => setOpen(true)}
      />
      {loading && <IconLoader className="loader-icon" />}
      {results.length > 0 && (
        <div
          className={`search-bar__results ${open ? "visible" : "invisible"}`}
        >
          {results.map((result) => (
            <div
              className="search-bar__results__result"
              key={result.imdbID}
              onClick={() => setValue(result)}
            >
              {result.Poster && (
                <img src={result.Poster} alt={"Poster"} height={"100%"} />
              )}
              <span>{`${result.Title}, ${result.Year}`}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
