import "./index.css";

export default function Card({ movie }) {
  const { Title, Released, Genre, Metascore, Poster } = movie;

  return (
    <div className="card">
      <img src={Poster} alt={Title} className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{Title}</h2>
        <p className="card-text">
          <strong>Release Year:</strong> {Released}
        </p>
        <p className="card-text">
          <strong>Genre:</strong> {Genre}
        </p>
        <p className="card-text">
          <strong>Rating:</strong> {Metascore}
        </p>
      </div>
    </div>
  );
}
