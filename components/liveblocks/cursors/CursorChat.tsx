import { MousePointer2Icon } from "lucide-react";

import { Presence } from "@/liveblocks.config";
import { CursorMode, CursorState } from "@/types";

interface CursorChatProps {
  cursor: { x: number; y: number };
  cursorState: CursorState;
  setCursorState: (cursorState: CursorState) => void;
  updateMyPresence: (presence: Partial<Presence>) => void;
}

const CursorChat = ({
  cursor,
  cursorState,
  setCursorState,
  updateMyPresence,
}: CursorChatProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateMyPresence({ message: event.target.value });
    setCursorState({
      mode: CursorMode.Chat,
      message: event.target.value,
      previousMessage: null,
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setCursorState({
        mode: CursorMode.Chat,
        message: "",
        previousMessage: cursorState.message,
      });
    } else if (event.key === "Escape") {
      setCursorState({ mode: CursorMode.Hidden });
    }
  };

  return (
    <div
      className="pointer-events-none absolute top-0 left-0"
      style={{
        transform: `translate(${cursor.x}px, ${cursor.y}px)`,
      }}
    >
      {cursorState.mode === CursorMode.Chat && (
        <div>
          <MousePointer2Icon size={20} fill="black" color="black" />

          <div
            className="absolute left-2 top-5 bg-blue-500 px-4 py-2 text-sm leading-relaxed text-white rounded-2xl"
            onKeyUp={(e) => e.stopPropagation()}
          >
            {cursorState.previousMessage && (
              <div>{cursorState.previousMessage}</div>
            )}
            <input
              className="z-10 w-60 border-none bg-transparent text-white placeholder-blue-300 outline-none"
              autoFocus={true}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder={
                cursorState.previousMessage ? "" : "Type a message..."
              }
              value={cursorState.message}
              maxLength={50}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CursorChat;
