"use client";

import { ThreadData } from "@liveblocks/client";
import { useThreads } from "@/liveblocks.config";
import PinnedComment from "./PinnedComment";
import { useMaxZIndex } from "@/hooks/useMaxZIndex";

const CommentsOverlay = () => {
  const maxZIndex = useMaxZIndex();
  const { threads } = useThreads();

  return (
    <div>
      {threads
        .filter((thread) => !thread.metadata.resolved)
        .map((thread) => (
          <PinnedComment
            key={thread.id}
            thread={thread}
            maxZIndex={maxZIndex}
          />
        ))}
    </div>
  );
};

export default CommentsOverlay;
