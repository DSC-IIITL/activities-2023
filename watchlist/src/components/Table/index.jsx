import Card from "../Card";
import "./index.css";

export default function Table({ data }) {
    console.log(data, "data")
    const display = data.map((movie) => {
       return <Card key={movie.imdbID} movie={movie} />
    })
    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        <th>Movie</th>
                        <th>Year</th>
                        <th>Rating</th>
                        <th>Runtime</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {display}
                </tbody>
            </table>
        </div>
    );
}