import { useState } from "react";
import "./App.css";
const axios = require("axios").default;

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allJokes, setAllJokes] = useState([]);
  const [jokeSetup, setjokeSetup] = useState("");
  const [jokePunchline, setjokePunchline] = useState("");

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

  async function handleAddJoke() {
    const body = { setup: jokeSetup, punchline: jokePunchline };
    const res = await axios.post("http://localhost:5000/jokes", body);
    console.log(res);
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
      <div style={{ margin: "20px" }}>
        <h1>Insert joke</h1>
        <input
          placeholder="Setup"
          value={jokeSetup}
          onChange={(e) => setjokeSetup(e.target.value)}
        />
        <input
          placeholder="Punchline"
          value={jokePunchline}
          onChange={(e) => setjokePunchline(e.target.value)}
        />
        <button onClick={handleAddJoke}>add joke</button>
      </div>
    </div>
  );
}

export default App;
