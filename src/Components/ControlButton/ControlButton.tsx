import React, { FC, ReactNode, useState } from "react";
import styles from "./ControlButton.module.css";

interface ControlButtonProps {
  icon: ReactNode;
  altIcon: ReactNode;
  cb: () => void;
  useAlt: boolean;
  setUseAlt: React.Dispatch<React.SetStateAction<boolean>>;
}

const ControlButton: FC<ControlButtonProps> = ({
  icon,
  altIcon,
  cb,
  useAlt,
  setUseAlt,
}) => {
  const [animating, setAnimating] = useState(false);

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
      {useAlt ? icon : altIcon}
    </div>
  );
};

export default React.memo(ControlButton);
