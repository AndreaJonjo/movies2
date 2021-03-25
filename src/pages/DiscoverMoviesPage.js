import { useState } from "react";
import axios from "axios";
import MovieItem from "../components/MovieItem";

export default function DiscoverMoviesPage() {
  const [searchText, set_searchText] = useState("");
  const [state, set_state] = useState({ status: "idle" });

  const search = async () => {
    if (searchText === "") {
      set_state({ status: "idle" });
      return;
    }
    set_state({ status: "searching" });

    const queryParam = encodeURI(searchText);

    const data = await axios.get(`
    https://omdbapi.com/?apikey=20648ef1&s=${queryParam}`);

    // console.log("Success!", data);
    // console.log("questa é il data", data.data.Search);

    set_state({ status: "done", data: data.data.Search });
    console.log("this should be a movie", data);
  };

  console.log("this should be a list of movies", state.data);

  return (
    <div>
      <h1>Discover some movies!</h1>
      <p>
        <input
          value={searchText}
          onChange={(e) => set_searchText(e.target.value)}
        />
        <button onClick={search}>Search</button>
      </p>
      {state.status === "idle" && (
        <p>Type in a search term and click "Search" to start...</p>
      )}
      {state.status === "searching" && <p>Searching...</p>}
      {state.status === "done" && (
        <div>
          <h2>Search results</h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              margin: "0 -10px",
            }}
          >
            {state.data.map((movie) => (
              <MovieItem key={movie.imdbID} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
