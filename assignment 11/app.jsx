
import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");

  return (
    <div className="container">
      <h2>Text Display App</h2>

      <input
        type="text"
        placeholder="Enter your text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <h1>{text}</h1>
    </div>
  );
}

export default App;
