import React from "react";

export function ListColumn({ items, side }) {
  const isLeft = side === "left";
  const dataAttr = isLeft ? { "data-left": true } : { "data-right": true };
  const base = isLeft ? "left-col w-[40%] text-left" : "right-col w-[40%] text-right";

  return (
    <div className={`${base} flex flex-col gap-1`}>
      {items.map((t, i) => (
        <div
          key={i}
          {...dataAttr}
          data-index={i}              
          className={isLeft ? "artist" : "category"}
        >
          {t}
        </div>
      ))}
    </div>
  );
}
