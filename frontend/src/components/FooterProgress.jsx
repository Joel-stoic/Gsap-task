import React, { forwardRef } from "react";
export const FooterProgress = forwardRef(function FooterProgress(_, ref) {
  return (
    <div ref={ref} className="col-span-12 self-end pb-[5vh] text-[10vw] leading-[0.8] text-center text-[rgba(245,245,245,0.9)] select-none">
      <span className="block">Beyond</span>
      <span className="block">Thinking</span>
      <div className="w-[160px] h-px mt-[2vh] mx-auto relative bg-[rgba(245,245,245,0.3)]">
        <div id="progress-fill" className="absolute top-0 left-0 h-full w-0 bg-[rgba(245,245,245,0.9)] transition-[width] duration-300"></div>
        <div className="absolute inset-x-0 -translate-y-1/2 flex justify-between text-[0.7rem] text-[rgba(245,245,245,0.9)] tracking-[-.02em] mx-[-25px]">
          <span id="current-section">01</span>
          <span>10</span>
        </div>
      </div>
    </div>
  );
});
