import { useCallback, useState } from "react";
import Searchbar from "./components/Searchbar";
import Card from "./components/Card";

function App() {
  const previousWatchlist = [];
  const [watchlist] = useState(previousWatchlist);

  const fetchData = useCallback(async (searchQuery) => {
    const res = await fetch(
      `http://www.omdbapi.com/?s=${searchQuery}&apikey=${
        import.meta.env.VITE_TOKEN
      }`
    );
    const data = await res.json();
    if (data.Response === "True") return data.Search;
    console.warn({ data });
    throw new Error("Something went wrong");
  }, []);

  return (
    <>
      <section className="search">
        <Searchbar
          fetchResults={fetchData}
          onChange={(val) => console.log({ val })}
        />
      </section>
      <section className="watchlist">
        {watchlist.map((movie) => {
          <Card key={movie.imdbID} movie={movie} />;
        })}
      </section>
    </>
  );
}

export default App;
