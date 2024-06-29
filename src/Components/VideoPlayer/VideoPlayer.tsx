import React, { FC, useRef, useState } from "react";
import styles from "./VideoPlayer.module.css";

interface VideoPlayerProps {
  source: string;
}

const VideoPlayer: FC<VideoPlayerProps> = ({ source }) => {
  const [playing, setPlaying] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0);
  const vidRef = useRef(null);
  return (
    <div className={styles.container}>
      <video ref={vidRef} controls src={source}></video>
    </div>
  );
};

export default VideoPlayer;
