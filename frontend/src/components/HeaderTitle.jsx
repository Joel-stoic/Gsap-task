import React, { forwardRef } from "react";

export const HeaderTitle = forwardRef(function HeaderTitle(_, ref) {
  return (
    <div
      ref={ref}
      className="col-span-12 self-start pt-[5vh] text-center text-[rgba(245,245,245,0.9)] select-none "
    /* keep layout separate from size */
    >
     <span
        className="block font-[700] leading-[0.79] mb-3"
        style={{
          fontSize: "8vw",
          fontFamily: "'Bebas Neue', sans-serif",
          letterSpacing: "-0.04em"
        }}
      >
        THE CREATIVE
      </span>
      <span
        className="block font-[700] leading-[0.78]"
        style={{
          fontSize: "var(--headline-size)",
          fontFamily: "'Bebas Neue', sans-serif",
          letterSpacing: "-0.04em"
        }}
      >
        PROCESS
      </span>
    </div>
  );
});