
import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <h1>React Counter App</h1>

      <h2>Counter: {count}</h2>

      <div className="buttons">
        <button onClick={() => setCount(count + 1)}>
          +1
        </button>

        <button onClick={() => setCount(count - 1)}>
          -1
        </button>

        <button onClick={() => setCount(0)}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
