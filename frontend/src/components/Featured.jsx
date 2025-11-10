import React, { forwardRef } from "react";
export const Featured = forwardRef(function Featured({ titles }, ref) {
  return (
    <div ref={ref} className="featured w-[20%] h-[10vh] flex items-center justify-center text-center text-[1.5vw] relative overflow-hidden">
      {titles.map((t, i) => (
        <div key={i} className="absolute inset-0 flex items-center justify-center opacity-0" data-featured-index>
          <h3 className="m-0 w-full text-[rgba(245,245,245,0.9)] font-medium whitespace-nowrap">{t}</h3>
        </div>
      ))}
    </div>
  );
});
