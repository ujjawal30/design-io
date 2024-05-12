import { Liveblocks } from "@liveblocks/node";

const LIVEBLOCKS_SECRET_KEY = process.env.LIVEBLOCKS_SECRET_KEY;

if (!LIVEBLOCKS_SECRET_KEY)
  throw new Error(
    "Please define the LIVEBLOCKS_SECRET_KEY environment variable inside .env.local"
  );

export const liveblocks = new Liveblocks({
  secret: LIVEBLOCKS_SECRET_KEY,
});
