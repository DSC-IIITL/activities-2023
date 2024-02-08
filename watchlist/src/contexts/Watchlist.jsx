import { createContext, useState } from "react";

const Watchlist = createContext();

export const WatchlistProvider = ({ children }) => {
  const previousWatchlist = [];
  const [watchlist, setWatchlist] = useState(previousWatchlist);

  const addToWatchlist = (data) => {
    if (watchlist.some(({ imdbID }) => imdbID === data.imdbID)) {
      return;
    }
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
