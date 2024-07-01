import { FC, useCallback, useEffect, useRef, useState } from "react";
import styles from "./VideoPlayer.module.css";
import { FaPlay, FaPause } from "react-icons/fa";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { ControlButton, Bar } from "../";

interface VideoPlayerProps {
  source: string;
  thumbnail: string;
}

const VideoPlayer: FC<VideoPlayerProps> = ({ source, thumbnail }) => {
  const [playing, setPlaying] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0);
  const [useAlt, setUseAlt] = useState(false);
  const [useNativeControls, setUseNativeControls] = useState(
    window.innerWidth < 767
  );
  const vidRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    let video = vidRef.current;
    if (!playing) video?.play();
    else video?.pause();
    const interval = setInterval(() => {
      setProgress(() =>
        video ? (100 * video.currentTime) / video.duration : 0
      );
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, [playing]);

  useEffect(() => {
    if (vidRef.current?.paused) setPlaying(true);
  });

  return (
    <div className={styles.container}>
      <video
        onClick={() => {
          setPlaying((prev) => !prev);
        }}
        ref={vidRef}
        controls={useNativeControls}
        src={source}
        poster={thumbnail}
      ></video>
      <div className={styles.controls}>
        <ControlButton
          altIcon={<FaPause />}
          icon={<FaPlay />}
          cb={useCallback(() => {
            setPlaying((prev) => !prev);
            setUseAlt((prev) => !prev);
          }, [])}
          useAlt={playing}
          setUseAlt={setUseAlt}
        />
        <Bar
          vidRef={vidRef.current}
          progress={progress}
          setProgress={useCallback(setProgress, [])}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
