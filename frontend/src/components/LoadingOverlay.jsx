import React, { forwardRef } from "react";
export const LoadingOverlay = forwardRef(function LoadingOverlay(_, ref) {
  return (
    <div ref={ref} className="fixed inset-0 z-[9999] flex items-center justify-center bg-white text-black text-[1.5rem] uppercase tracking-[-.02em]">
      <div className="flex items-center">
        <span>Loading</span>
        <span className="loading-counter ml-2">[00]</span>
      </div>
    </div>
  );
});
