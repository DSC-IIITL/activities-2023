import "./index.css";
import { useContext } from "react";
import Watchlist from "../../contexts/Watchlist";


export default function Card(props) {
  const { removeFromWatchlist } = useContext(Watchlist);
  const handleDelete = (e) => {
    removeFromWatchlist(e.target.id)
    console.log("removed")
  }
  return (
    <div className="card">
      <td><h3>{props.movie.Title}</h3></td>
      <td><p>{props.movie.Year}</p></td>
      <td><p>{props.movie.imdbRating}</p></td>
      <td><p>{props.movie.Runtime}</p></td>
      <td><button className="remove" id={props.movie.imdbID} onClick={handleDelete}>Delete</button></td>
    </div>
  );
}
