"use client";

import { ReactNode } from "react";
import { ClientSideSuspense } from "@liveblocks/react";

import { RoomProvider } from "@/liveblocks.config";
import { LiveMap } from "@liveblocks/client";

const Room = ({ children }: { children: ReactNode }) => {
  return (
    <RoomProvider
      id="my-room"
      initialPresence={{
        cursor: null,
        cursorColor: null,
        editingText: null,
        message: null,
      }}
      initialStorage={{ canvasObject: new LiveMap() }}
    >
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default Room;
