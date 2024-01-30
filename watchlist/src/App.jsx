import { useCallback, useContext } from "react";
import Searchbar from "./components/Searchbar";
import Card from "./components/Card";
import Watchlist from "./contexts/Watchlist";

function App() {
  const { watchlist } = useContext(Watchlist);

  console.log({ watchlist });

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
        <Searchbar fetchResults={fetchData} />
      </section>
      <section className="watchlist">
        {watchlist.map((movie) => (
          <Card key={movie.imdbID} movie={movie} />
        ))}
      </section>
    </>
  );
}

export default App;
