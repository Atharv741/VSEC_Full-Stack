
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (running) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [running]);

  const formatTime = () => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      secs
    ).padStart(2, "0")}`;
  };

  const reset = () => {
    setRunning(false);
    setSeconds(0);
  };

  return (
    <div className="container">
      <h1>Stopwatch</h1>

      <div className="timer">{formatTime()}</div>

      <div className="buttons">
        <button onClick={() => setRunning(true)} disabled={running}>
          Start
        </button>

        <button onClick={() => setRunning(false)} disabled={!running}>
          Stop
        </button>

        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default App;
