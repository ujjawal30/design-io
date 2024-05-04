import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import authOptions from "@/auth.config";
import { UserMeta } from "@/liveblocks.config";
import { liveblocks } from "@/lib/liveblocks";
import { connectToDatabase } from "@/lib/mongoose";
import { fetchDesign } from "@/lib/actions/design.actions";

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);

  if (!session)
    return new NextResponse("[LIVEBLOCKS_AUTH_ERROR]: Unauthorized", {
      status: 401,
    });

  const { room } = await req.json();

  try {
    await connectToDatabase();

    const design = await fetchDesign({ designId: room, populate: false });

    if (design.status && design.data) {
      const { creator, collaborators } = design.data;
      const canAccess =
        creator === session.user.id ||
        collaborators.some((collaborator) => collaborator === session.user.id);

      console.log("canAccess :>> ", canAccess);
      if (!canAccess)
        return new NextResponse("[LIVEBLOCKS_AUTH_ERROR]: Unauthorized", {
          status: 401,
        });

      const userInfo: UserMeta = {
        id: session.user.id,
        info: {
          name: session.user.name,
          avatar: session.user.photo,
        },
      };

      const liveblocksSession = liveblocks.prepareSession(session.user.id, {
        userInfo,
      });

      room && liveblocksSession.allow(room, liveblocksSession.FULL_ACCESS);

      const { body, status } = await liveblocksSession.authorize();

      return new NextResponse(body, { status });
    } else {
      return new NextResponse(design.message, { status: 400 });
    }
  } catch (error) {
    console.log("error :>> ", error);
    return new NextResponse("[LIVEBLOCKS_AUTH_ERROR]: Something went wrong.", {
      status: 400,
    });
  }
}
