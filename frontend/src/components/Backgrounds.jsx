import React from "react";
export function Backgrounds({ images }) {
  return (
    <div className="absolute inset-0 z-[1] overflow-hidden bg-black">
      {images.map((src, i) => (
        <img key={i} data-bg className="bg-img" src={src} alt={`Background ${i + 1}`} />
      ))}
    </div>
  );
}
