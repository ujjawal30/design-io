"use client";

import { useCallback, useEffect, useState } from "react";

import {
  useBroadcastEvent,
  useEventListener,
  useMyPresence,
  useOthers,
} from "@/liveblocks.config";
import useInterval from "@/hooks/useInterval";
import { CursorMode, CursorState, Reaction, ReactionEvent } from "@/types";

import LiveCursors from "@/components/liveblocks/cursors/LiveCursors";
import CursorChat from "@/components/liveblocks/cursors/CursorChat";
import ReactionSelector from "@/components/liveblocks/reactions/ReactionSelector";
import FlyingReaction from "@/components/liveblocks/reactions/FlyingReaction";
import Comments from "@/components/liveblocks/comments/Comments";
import CustomContextMenu from "../shared/CustomContextMenu";

interface LiveContainerProps {
  children: React.ReactElement;
  undo: () => void;
  redo: () => void;
}

const LiveContainer = ({ children, undo, redo }: LiveContainerProps) => {
  const [cursorState, setCursorState] = useState<CursorState>({
    mode: CursorMode.Hidden,
  });
  const [reactions, setReactions] = useState<Reaction[]>([]);

  const others = useOthers();
  const broadcast = useBroadcastEvent();
  const [{ cursor }, updateMyPresence] = useMyPresence();

  useInterval(() => {
    setReactions((reactions) =>
      reactions.filter((reaction) => reaction.timestamp > Date.now() - 4000)
    );
  }, 1000);

  useInterval(() => {
    if (
      cursorState.mode === CursorMode.Reaction &&
      cursorState.isPressed &&
      cursor
    ) {
      setReactions((reactions) =>
        reactions.concat([
          {
            point: { x: cursor.x, y: cursor.y },
            value: cursorState.reaction || "",
            timestamp: Date.now(),
          },
        ])
      );

      broadcast({
        x: cursor.x,
        y: cursor.y,
        value: cursorState.reaction || "",
      });
    }
  }, 100);

  useEventListener((eventData) => {
    const event = eventData.event as ReactionEvent;
    setReactions((reactions) =>
      reactions.concat([
        {
          point: { x: event.x, y: event.y },
          value: event.value,
          timestamp: Date.now(),
        },
      ])
    );
  });

  const setReaction = (reaction: string) => {
    setCursorState({
      mode: CursorMode.Reaction,
      reaction,
      isPressed: false,
    });
  };

  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    event.preventDefault();

    if (cursor == null || cursorState.mode !== CursorMode.ReactionSelector) {
      const overlayPanel = document.querySelector("#canvas");
      if (overlayPanel == null) {
        return;
      }
      const { top, left } = overlayPanel.getBoundingClientRect();

      updateMyPresence({
        cursor: {
          x: Math.round(event.clientX) - left,
          y: Math.round(event.clientY) - top,
        },
      });
    }
  }, []);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent) => {
      const overlayPanel = document.querySelector("#canvas");
      if (overlayPanel == null) {
        return;
      }
      const { top, left } = overlayPanel.getBoundingClientRect();

      updateMyPresence({
        cursor: {
          x: Math.round(event.clientX) - left,
          y: Math.round(event.clientY) - top,
        },
      });

      setCursorState((prev) =>
        prev.mode === CursorMode.Reaction ? { ...prev, isPressed: true } : prev
      );
    },
    [cursorState.mode, setCursorState]
  );

  const handlePointerUp = useCallback(
    (event: React.PointerEvent) => {
      setCursorState((prev) =>
        prev.mode === CursorMode.Reaction ? { ...prev, isPressed: true } : prev
      );
    },
    [cursorState.mode, setCursorState]
  );

  const handlePointerLeave = useCallback((event: React.PointerEvent) => {
    setCursorState({ mode: CursorMode.Hidden });
    updateMyPresence({ cursor: null });
  }, []);

  const handleContextMenuTrigger = useCallback((command: string) => {
    switch (command) {
      case "Chat":
        setCursorState({
          mode: CursorMode.Chat,
          previousMessage: null,
          message: "",
        });
        break;

      case "Reactions":
        setCursorState({ mode: CursorMode.ReactionSelector });
        break;

      case "Undo":
        undo();
        break;

      case "Redo":
        redo();
        break;

      default:
        break;
    }
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
      } else if (e.key === "e") {
        setCursorState({ mode: CursorMode.ReactionSelector });
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
    <CustomContextMenu
      className="relative flex-1 w-full flex justify-center items-center"
      handleContextMenuTrigger={handleContextMenuTrigger}
      id="canvas"
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
    >
      <div>
        {children}

        {cursor && (
          <CursorChat
            cursor={cursor}
            cursorState={cursorState}
            setCursorState={setCursorState}
            updateMyPresence={updateMyPresence}
          />
        )}

        {reactions.map((reaction) => (
          <FlyingReaction
            key={reaction.timestamp.toString()}
            x={reaction.point.x}
            y={reaction.point.y}
            timestamp={reaction.timestamp}
            value={reaction.value}
          />
        ))}

        {cursorState.mode === CursorMode.ReactionSelector && (
          <ReactionSelector setReaction={setReaction} />
        )}

        <LiveCursors others={others} />

        <Comments />
      </div>
    </CustomContextMenu>
  );
};

export default LiveContainer;
