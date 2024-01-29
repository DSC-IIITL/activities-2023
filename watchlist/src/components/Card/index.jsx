import "./index.css";

export default function Card(props) {
  return <div className="card">{JSON.stringify(props)}</div>;
}
