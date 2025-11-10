import React, { forwardRef } from "react";
export const HeaderTitle = forwardRef(function HeaderTitle(_, ref) {
  return (
    <div ref={ref} className="col-span-12 self-start pt-[5vh] text-[10vw] leading-[0.8] text-center text-[rgba(245,245,245,0.9)] select-none">
      <span className="block">The Creative</span>
      <span className="block">Process</span>
    </div>
  );
});
