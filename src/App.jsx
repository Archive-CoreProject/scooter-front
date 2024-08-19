import { useEffect } from "react";
import "./App.css";

function App() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });
  return (
    <>
      <div>
        <h1>초기설정</h1>
      </div>
    </>
  );
}

export default App;
