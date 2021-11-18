import "./App.css";

function App() {
  async function handleGetJoke() {
    const result = await fetch("http://localhost:5000/jokes/random");
    const joke = await result.json();
    console.log("get my random joke: ", joke);
  }

  return (
    <div className="App">
      <button onClick={handleGetJoke}>Random Joke</button>
    </div>
  );
}

export default App;
