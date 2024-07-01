import { useState } from "react";
import "./App.css";
import VideoPlayer from "./Components/VideoPlayer/VideoPlayer";

function App() {
  const [count, setCount] = useState(0);
  const vidSrc =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  const thumbnail =
    "https://m.media-amazon.com/images/M/MV5BNDFkMWMxY2QtYjQyNi00MjkwLTljYjMtYzUwZDlhODlhNzY3XkEyXkFqcGdeQXVyNDgyODgxNjE@._V1_.jpg";

  return (
    <>
      <div>
        <VideoPlayer source={vidSrc} thumbnail={thumbnail} />
      </div>
    </>
  );
}

export default App;
