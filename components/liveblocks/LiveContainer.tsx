"use client";

import { useCallback, useEffect, useState } from "react";

import { useMyPresence, useOthers } from "@/liveblocks.config";
import { CursorMode, CursorState } from "@/types";

import LiveCursors from "@/components/liveblocks/cursors/LiveCursors";
import CursorChat from "@/components/liveblocks/cursors/CursorChat";

const Live = ({ children }: { children: React.ReactElement }) => {
  const [cursorState, setCursorState] = useState<CursorState>({
    mode: CursorMode.Hidden,
  });

  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence();

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
    setCursorState({ mode: CursorMode.Hidden });
    updateMyPresence({ cursor: null });
  }, []);

  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      console.log("e.key :>> ", e.key);
      if (e.key === "/") {
        setCursorState({
          mode: CursorMode.Chat,
          previousMessage: null,
          message: "",
        });
      } else if (e.key === "Escape") {
        updateMyPresence({ message: "" });
        setCursorState({ mode: CursorMode.Hidden });
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
      }
    };

    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [updateMyPresence]);

  return (
    <div
      className="h-full w-full border-2 border-red-500 flex justify-center items-center"
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerLeave={handlePointerLeave}
    >
      {children}
      {cursor && (
        <CursorChat
          cursor={cursor}
          cursorState={cursorState}
          setCursorState={setCursorState}
          updateMyPresence={updateMyPresence}
        />
      )}
      <LiveCursors others={others} />
    </div>
  );
};

export default Live;
