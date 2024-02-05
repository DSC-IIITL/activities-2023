import Card from "../Card";
import "./index.css";

export default function Table({ data }) {
    console.log(data, "data")
    const display = data.map((movie) => {
       return <Card key={movie.imdbID} movie={movie} />
    })
    return (
        <div className="table">
            <div className="flex flex-col shadow-lg mb-6 mt-4">
            <table className="">
                <thead>
                    <tr className="border border-solid border-l-0 border-r-0">
                        <th>Movie</th>
                        <th>Year</th>
                        <th>Rating</th>
                        <th>Runtime</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {display}
                </tbody>
            </table>
            </div>
        </div>
    );
}