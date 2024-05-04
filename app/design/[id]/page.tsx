import dynamic from "next/dynamic";

import LiveRoom from "@/components/liveblocks/LiveRoom";

interface DesignPageProps {
  params: { id: string };
}

const Design = dynamic(() => import("../Design"), { ssr: false });

const DesignPage = ({ params: { id } }: DesignPageProps) => {
  return (
    <LiveRoom id={id}>
      <Design />
    </LiveRoom>
  );
};

export default DesignPage;
