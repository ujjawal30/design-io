"use client";

import Image from "next/image";
import { useCallback, useMemo, useRef, useState } from "react";
import { ThreadData } from "@liveblocks/client";
import { Thread } from "@liveblocks/react-comments";

import { ThreadMetadata, useEditThreadMetadata } from "@/liveblocks.config";

type Props = {
  thread: ThreadData<ThreadMetadata>;
  maxZIndex: number;
};

const PinnedComment = ({ thread, maxZIndex, ...props }: Props) => {
  const editThreadMetadata = useEditThreadMetadata();

  // const { isLoading } = useUser(thread.comments[0].userId);

  const threadRef = useRef<HTMLDivElement>(null);

  const handleIncreaseZIndex = useCallback(() => {
    if (maxZIndex === thread.metadata.zIndex) {
      return;
    }

    editThreadMetadata({
      threadId: thread.id,
      metadata: {
        zIndex: maxZIndex + 1,
      },
    });
  }, [thread, editThreadMetadata, maxZIndex]);

  // if (isLoading) {
  //   return null;
  // }

  // Open pinned threads that have just been created
  const startMinimized = useMemo(
    () => Number(new Date()) - Number(new Date(thread.createdAt)) > 100,
    [thread]
  );

  const [minimized, setMinimized] = useState(startMinimized);

  /**
   * memoize the result of this function so that it doesn't change on every render but only when the thread changes
   * Memo is used to optimize performance and avoid unnecessary re-renders.
   *
   * useMemo: https://react.dev/reference/react/useMemo
   */

  const memoizedContent = useMemo(
    () => (
      <div
        ref={threadRef}
        id={`thread-${thread.id}`}
        className="absolute left-0 top-0 flex gap-5"
        style={{
          transform: `translate(${thread.metadata.x}px, ${thread.metadata.y}px)`,
        }}
      >
        <div
          className="absolute flex cursor-pointer gap-4"
          {...props}
          onClick={(e: any) => {
            handleIncreaseZIndex();

            // check if click is on/in the composer
            if (
              e.target &&
              e.target.classList.contains("lb-icon") &&
              e.target.classList.contains("lb-button-icon")
            ) {
              return;
            }

            setMinimized(!minimized);
          }}
        >
          <div
            className="relative flex h-9 w-9 select-none items-center justify-center rounded-bl-full rounded-br-full rounded-tl-md rounded-tr-full bg-white shadow"
            data-draggable={true}
          >
            <Image
              src={`https://liveblocks.io/avatars/avatar-${Math.floor(
                Math.random() * 30
              )}.png`}
              alt="Dummy Name"
              width={28}
              height={28}
              draggable={false}
              className="rounded-full"
            />
          </div>
          {!minimized ? (
            <div className="flex min-w-60 flex-col overflow-hidden rounded-lg bg-white text-sm shadow">
              <Thread
                thread={thread}
                indentCommentContent={false}
                onKeyUp={(e) => {
                  e.stopPropagation();
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
    ),
    [thread.comments.length, minimized]
  );

  return <>{memoizedContent}</>;
};

export default PinnedComment;
