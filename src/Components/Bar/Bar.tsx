import React, { useState, FC, useRef, useEffect, useCallback } from "react";
import styles from "./Bar.module.css";
import _ from "lodash";

interface BarProps {
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  vidRef: HTMLVideoElement | null;
  controlRef: HTMLDivElement | null;
}
//e: React.MouseEvent<HTMLDivElement, MouseEvent>

const Bar: FC<BarProps> = ({ progress, setProgress, vidRef, controlRef }) => {
  const [isDragged, setIsDragged] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [width, setWidth] = useState<number | null>(null);
  const [displayTime, setDisplayTime] = useState(false);
  const outerDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outerDiv.current) {
      setWidth(outerDiv.current.offsetWidth);
    }
    if (controlRef) controlRef.addEventListener("mouseup", handleMouseUp);
  }, [vidRef]);

  useEffect(() => {
    if (isDragged && controlRef) {
      controlRef.addEventListener("mousemove", handleDrag);
    } else {
      controlRef?.removeEventListener("mousemove", handleDrag);
    }

    return () => {
      controlRef?.removeEventListener("mousemove", handleDrag);
    };
  }, [isDragged]);

  const calculateNewTime = (newWidth: number) => {
    if (!width || !vidRef || isNaN(width)) return 0;

    const percentage = (100 * newWidth) / width;
    return Math.max(
      0,
      Math.min(vidRef.duration || 0, (percentage / 100) * vidRef.duration)
    );
  };

  const handleTimeChange = (newWidth: number) => {
    const newTime = calculateNewTime(newWidth);
    if (vidRef) {
      vidRef.currentTime = newTime;
      setProgress((newWidth * 100) / (width || 1));
      setDisplayTime(true);
    }
  };

  const handleDrag = useCallback(
    (event: MouseEvent) => {
      handleTimeChange(event.offsetX);
    },
    [handleTimeChange]
  );

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent> | MouseEvent
  ) => {
    setIsDragged(true);
    handleTimeChange((event as React.MouseEvent).nativeEvent.offsetX);
  };

  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      setIsDragged(false);
    },
    [handleTimeChange]
  );

  return (
    <div
      ref={outerDiv}
      className={styles.barOuter}
      onMouseDown={handleMouseDown}
    >
      <div className={styles.barInner} style={{ width: `${progress}%` }}></div>
      {displayTime ? <div className={styles.timeCode}> </div> : null}
    </div>
  );
};

export default Bar;
