import styles from "./index.module.css";

export default function Card({ movie }) {
  const { Title, Released, Genre, Metascore, Poster } = movie;

  return (
    <div className={styles.card}>
      <img src={Poster} alt={Title} className={styles.cardImage} />
      <div className={styles.cardContent}>
        <h2 className={styles.cardTitle}>{Title}</h2>
        <p className={styles.cardText}>
          <strong>Release Year:</strong> {Released}
        </p>
        <p className={styles.cardText}>
          <strong>Genre:</strong> {Genre}
        </p>
        <p className={styles.cardText}>
          <strong>Rating:</strong> {Metascore}
        </p>
      </div>
    </div>
  );
}
