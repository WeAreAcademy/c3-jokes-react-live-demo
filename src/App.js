import { useState } from "react";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allJokes, setAllJokes] = useState([]);

  async function handleGetJoke() {
    const result = await fetch("http://localhost:5000/jokes/random");
    const jokes = await result.json();
    setAllJokes(jokes);
  }

  async function handleSearchJoke() {
    const result = await fetch(
      `http://localhost:5000/jokes/search?term=${searchTerm}`
    );
    const jokes = await result.json();
    setAllJokes(jokes);
  }

  const jokesAsString = allJokes
    .map((joke) => joke.setup + ": " + joke.punchline)
    .join(",");

  return (
    <div className="App">
      <button onClick={handleGetJoke}>Random Joke</button>
      <div style={{ margin: "20px" }}>
        <input
          placeholder="search here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearchJoke}>
          Search for jokes about {searchTerm}
        </button>
      </div>
      {jokesAsString}
    </div>
  );
}

export default App;
