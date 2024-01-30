import { useContext, useEffect, useState } from "react";
import "./index.css";
import useFetch from "../../hooks/useFetch";
import { IconExclamationCircle, IconLoader } from "@tabler/icons-react";
import Watchlist from "../../contexts/Watchlist";

export default function MovieModal({ trigger, id }) {
  const [open, setOpen] = useState(false);
  const { data, error, fetch, loading } = useFetch(
    `http://www.omdbapi.com/?apikey=${import.meta.env.VITE_TOKEN}&i=${id}`
  );

  const { addToWatchlist } = useContext(Watchlist);

  useEffect(() => {
    if (loading || !data) setOpen(false);
    else setOpen(true);
  }, [data, loading]);

  useEffect(() => {
    if (open) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  return (
    <>
      <button
        className="modal__btn"
        onClick={() => {
          fetch();
        }}
      >
        {trigger}
        {loading ? (
          <IconLoader className="loader-icon" />
        ) : error ? (
          <IconExclamationCircle className="error-icon" />
        ) : (
          ""
        )}
      </button>
      <div
        className={`modal__backdrop ${open ? "visible" : "invisible"}`}
        role="presentation"
        onClick={() => setOpen(false)}
      >
        {data && (
          <dialog
            className="modal__dialog"
            open={open}
            onClick={(ev) => ev.stopPropagation()}
          >
            <img src={data.Poster} alt="Poster" />
            <h3>{data.Title}</h3>
            <h6>
              {data.Year} | {data.Rated} | {data.Runtime}
            </h6>
            <p>{data.Metascore} ⭐</p>
            <button
              className="modal__add"
              onClick={() => {
                addToWatchlist(data);
                setOpen(false);
              }}
            >
              Add to watchlist
            </button>
          </dialog>
        )}
      </div>
    </>
  );
}
