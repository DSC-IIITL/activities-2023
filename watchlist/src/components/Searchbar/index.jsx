import { useEffect, useRef, useState } from "react";
import { IconLoader } from "@tabler/icons-react";
import Table from "../Table";
import "./index.css";
import MovieModal from "../MovieModal";

export default function Searchbar({ onChange = () => {}, fetchResults }) {
  const [searchString, setSearchString] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const isTypingRef = useRef(null);
  const searchbarRef = useRef(null);

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
            setResults(data);
          })
          .catch((err) => console.warn(err))
          .finally(() => setLoading(false));
      }
    }, 2000);
  }, [fetchResults, searchString]);

  const handleBlur = (ev) => {
    if (!searchbarRef.current.contains(ev.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("click", handleBlur);
    } else {
      document.removeEventListener("click", handleBlur);
    }
    return () => {
      document.removeEventListener("click", handleBlur);
    };
  }, [open]);

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
            if (isTypingRef.current !== null) clearTimeout(isTypingRef.current);
            if (searchString !== "") {
              setLoading(true);
              fetchResults(searchString)
                .then((data) => {
                  setResults(data);
                })
                .catch((err) => console.warn(err))
                .finally(() => setLoading(false));
            }
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
