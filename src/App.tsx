import { useState } from "react";
import "./App.css";
import VideoPlayer from "./Components/VideoPlayer/VideoPlayer";

function App() {
  const [count, setCount] = useState(0);
  const vidSrc =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  return (
    <>
      <div>
        <VideoPlayer source={vidSrc} />
      </div>
    </>
  );
}

export default App;
