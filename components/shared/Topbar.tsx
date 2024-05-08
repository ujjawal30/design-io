"use client";

import Image from "next/image";
import { LockIcon, MenuIcon } from "lucide-react";

import ActiveUsers from "@/components/liveblocks/users/ActiveUsers";
import Title from "../settings/Title";

interface TopbarProps {
  design: DesignProps;
  userId?: string;
}

const Topbar = ({ design, userId }: TopbarProps) => {
  const { _id, title, description, creator, collaborators } = design;

  console.log("creator :>> ", creator);

  return (
    <nav className="flex select-none items-center justify-between gap-4 text-white rounded-xl">
      <section className="flex gap-2">
        <div className="bg-primary-black rounded-xl px-[22px] py-4">
          <MenuIcon size={24} />
        </div>

        <div className="bg-primary-black rounded-xl px-4">
          <Image src="/logo.png" alt="logo" width={144} height={48} />
        </div>
      </section>

      <section className="flex items-center gap-4 bg-primary-black rounded-xl px-6 py-4">
        <Title title={title} canEdit={creator._id === userId} />
        {/* <Badge className="bg-primary-grey-100 text-gray-400 hover:bg-none">
          <LockIcon size={12} className="text-gray-500" />
          &nbsp; View Only
        </Badge> */}
      </section>

      <section className="bg-primary-black rounded-xl px-4 py-3">
        <ActiveUsers />
      </section>
    </nav>
  );
};

export default Topbar;
