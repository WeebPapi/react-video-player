import React, { useState, FC, useRef, useEffect } from "react";
import styles from "./Bar.module.css";

interface BarProps {
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  vidRef: HTMLVideoElement | null;
}

const Bar: FC<BarProps> = ({ progress, setProgress, vidRef }) => {
  const [width, setWidth] = useState<number | null>(null);
  const [displayTime, setDisplayTime] = useState(false);
  const outerDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (outerDiv.current) {
      setWidth(outerDiv.current.offsetWidth);
    }
  }, [vidRef]);
  return (
    <div
      ref={outerDiv}
      className={styles.barOuter}
      onMouseDown={(e) => {
        const clickedWidth = e.nativeEvent.offsetX;
        const percentage = (100 * clickedWidth) / (width ? width : 1);
        setProgress(percentage);
        if (vidRef) vidRef.currentTime = (percentage / 100) * vidRef.duration;
      }}
      onMouseOver={(e) => {
        setDisplayTime(true);
        console.log(e);
      }}
    >
      <div className={styles.barInner} style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default Bar;
