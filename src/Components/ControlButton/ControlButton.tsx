import React, { FC, ReactNode, useState } from "react";
import styles from "./ControlButton.module.css";

interface ControlButtonProps {
  icon: ReactNode;
  altIcon: ReactNode;
  cb: () => void;
  kind: string;
}

const ControlButton: FC<ControlButtonProps> = ({ icon, altIcon, cb, kind }) => {
  const [animating, setAnimating] = useState(false);
  const [useAlt, setUseAlt] = useState(false);

  return (
    <div
      className={`${animating ? styles.animate : ""} ${styles.button}`}
      onClick={() => {
        setUseAlt((prev) => !prev);
        setAnimating(true);
        setTimeout(() => {
          setAnimating(false);
        }, 300);
        cb();
      }}
    >
      {useAlt ? altIcon : icon}
    </div>
  );
};

export default React.memo(ControlButton);
