import { useContext, useEffect, useState } from "react";
import styles from "./index.module.css";
import useFetch from "../../hooks/useFetch";
import { IconExclamationCircle, IconLoader } from "@tabler/icons-react";
import WatchlistContext from "../../contexts/Watchlist";

export default function MovieModal({ trigger, id }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const { data, error, fetch, loading } = useFetch(
    `http://www.omdbapi.com/?apikey=${import.meta.env.VITE_TOKEN}&i=${id}`
  );

  const { addToWatchlist } = useContext(WatchlistContext);

  useEffect(() => {
    if (loading || !data) setModalOpen(false);
    else setModalOpen(true);
  }, [data, loading]);

  useEffect(() => {
    if (isModalOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [isModalOpen]);

  console.log({ styles });

  return (
    <>
      <button
        className={styles.modalTriggerBtn}
        onClick={() => {
          fetch();
        }}
      >
        {trigger}
        {loading ? (
          <IconLoader className={styles.loaderIcon} />
        ) : error ? (
          <IconExclamationCircle className={styles.errorIcon} />
        ) : (
          ""
        )}
      </button>
      <div
        className={`${styles.modalBackdrop} ${
          isModalOpen ? styles.visible : styles.invisible
        }`}
        role="presentation"
        onClick={() => setModalOpen(false)}
      >
        {data && (
          <dialog
            className={styles.modalDialog}
            open={isModalOpen}
            onClick={(ev) => ev.stopPropagation()}
          >
            <img className={styles.poster} src={data.Poster} alt="Poster" />
            <h3>{data.Title}</h3>
            <h6>
              {data.Year} | {data.Rated} | {data.Runtime}
            </h6>
            <p>{data.Metascore} ⭐</p>
            <button
              className={styles.modalAddBtn}
              onClick={() => {
                addToWatchlist(data);
                setModalOpen(false);
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
