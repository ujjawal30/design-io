import { User } from "@liveblocks/client";

import { Presence, UserMeta } from "@/liveblocks.config";
import { COLORS } from "@/constants";

import Cursor from "@/components/liveblocks/cursors/Cursor";

interface LiveCursorsProps {
  others: readonly User<Presence, UserMeta>[];
}

const LiveCursors = ({ others }: LiveCursorsProps) => {
  return others.map(({ connectionId, presence }) => {
    if (!presence?.cursor) return null;
    return (
      <Cursor
        color={COLORS[connectionId % COLORS.length]}
        x={presence.cursor.x}
        y={presence.cursor.y}
        key={connectionId}
        message={presence.message}
      />
    );
  });
};

export default LiveCursors;
