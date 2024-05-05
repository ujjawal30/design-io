import dynamic from "next/dynamic";

import LiveRoom from "@/components/liveblocks/LiveRoom";
import Design from "../Design";
import { fetchDesign } from "@/lib/actions/design.actions";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import authOptions from "@/auth.config";

interface DesignPageProps {
  params: { id: string };
}

const DesignPage = async ({ params: { id } }: DesignPageProps) => {
  const session = await getServerSession(authOptions);

  const design = await fetchDesign({ designId: id, populate: true });

  if (!design.status || !design.data) throw new Error(design.message);

  const { creator, collaborators } = design.data;
  // @ts-ignore
  const canAccess = creator._id === session?.user.id || collaborators.some((collaborator) => collaborator._id === session?.user.id);
  if (!canAccess) redirect("/");

  return (
    <LiveRoom id={id}>
      <Design />
    </LiveRoom>
  );
};

export default DesignPage;
