import React, { forwardRef } from "react";

export const DebugInfo = forwardRef(function DebugInfo(_, ref) {
  return (
    <div ref={ref} className="hidden fixed bottom-2 right-2 z-[9000] bg-white/70 text-black p-2 text-xs font-mono">
      Current Section: 0
    </div>
  );
});
