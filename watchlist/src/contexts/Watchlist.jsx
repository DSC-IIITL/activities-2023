  import { createContext, useState } from "react";

const Watchlist = createContext();

export const WatchlistProvider = ({ children }) => {
  const previousWatchlist = [];
  const [watchlist, setWatchlist] = useState(previousWatchlist);

  const addToWatchlist = (data) => {
    setWatchlist((watchlist) => [...watchlist, data]);
  };

  const removeFromWatchlist = (id) => {
    setWatchlist((watchlist) =>
      watchlist.filter(({ imdbID }) => id !== imdbID)
    );
  };

  return (
    <Watchlist.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
      }}
    >
      {children}
    </Watchlist.Provider>
  );
};

export default Watchlist;
