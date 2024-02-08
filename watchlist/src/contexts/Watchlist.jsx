import { createContext, useState } from "react";

/**
 * @type {import("react").Context<{
 *  watchlist: import("../types").Movie[];
 * addToWatchlist: (data: import("../types").Movie) => void;
 * removeFromWatchlist: (id: string) => void;
 * >}}
 */
const Watchlist = createContext();

export const WatchlistProvider = ({ children }) => {
  const previousWatchlist = [];
  const [watchlist, setWatchlist] = useState(previousWatchlist);

  const addToWatchlist = (data) => {};

  const removeFromWatchlist = (id) => {};

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
