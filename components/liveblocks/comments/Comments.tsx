import { ClientSideSuspense } from "@liveblocks/react";

import CommentsOverlay from "@/components/liveblocks/comments/CommentsOverlay";

const Comments = () => {
  return (
    <ClientSideSuspense fallback={<div>Loading…</div>}>
      {() => <CommentsOverlay />}
    </ClientSideSuspense>
  );
};

export default Comments;
