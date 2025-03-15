import React from "react";
import { LoaderProps } from "@/types/types";

const DualRingLoader: React.FC<LoaderProps> = ({
  size = 24,
  color = "#ae1edb",
}) => {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <div
        className="absolute border-4 border-transparent border-t-current rounded-full animate-spin"
        style={{ width: size, height: size, borderColor: `${color} transparent ${color} transparent` }}
      ></div>
    </div>
  );
};

export default DualRingLoader;
