"use client";
import { useState } from "react";
import css from "./SkeletonLoader.module.css";

interface ImgWithSkeletonProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export default function ImgWithSkeleton({
  src,
  alt,
  width = 200,
  height = 150,
}: ImgWithSkeletonProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ width, height, position: "relative" }}>
      {!loaded && (
        <div className={css.skeleton} style={{ width, height }}></div>
      )}
      <img
        src={src}
        alt={alt}
        style={{ width, height, display: loaded ? "block" : "none" }}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
