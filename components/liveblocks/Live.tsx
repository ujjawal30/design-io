"use client";

import { useMyPresence, useOthers } from "@/liveblocks.config";
import LiveCursors from "@/components/liveblocks/cursors/LiveCursors";
import { useCallback } from "react";

const Live = ({ children }: { children: React.ReactElement }) => {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence() as any;

  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    event.preventDefault();

    updateMyPresence({
      cursor: {
        x: Math.round(event.clientX),
        y: Math.round(event.clientY),
      },
    });
  }, []);

  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    updateMyPresence({
      cursor: {
        x: Math.round(event.clientX),
        y: Math.round(event.clientY),
      },
    });
  }, []);

  const handlePointerLeave = useCallback((event: React.PointerEvent) => {
    event.preventDefault();

    updateMyPresence({ cursor: null });
  }, []);

  return (
    <div
      className="h-full w-full border-2 border-red-500 flex justify-center items-center"
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerLeave={handlePointerLeave}
    >
      {children}
      <LiveCursors others={others} />
    </div>
  );
};

export default Live;
