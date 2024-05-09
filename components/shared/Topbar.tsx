"use client";

import Image from "next/image";
import { LockIcon, MenuIcon } from "lucide-react";

import ActiveUsers from "@/components/liveblocks/users/ActiveUsers";
import Title from "../settings/Title";
import AccountMenu from "../menus/AccountMenu";
import Avatar from "../liveblocks/users/Avatar";
import { useSelf } from "@/liveblocks.config";
import DesignMenu from "../menus/DesignMenu";

interface TopbarProps {
  design: DesignProps;
  userId?: string;
}

const Topbar = ({ design, userId }: TopbarProps) => {
  const { _id, title, description, creator, collaborators } = design;

  const currentUser = useSelf();

  const isCreator = creator._id === userId;

  return (
    <nav className="flex select-none items-center justify-between gap-4 text-white rounded-xl">
      <section className="flex gap-2">
        <DesignMenu design={design} isCreator={isCreator}>
          <div className="bg-primary-black rounded-xl px-[22px] py-4">
            <MenuIcon size={24} />
          </div>
        </DesignMenu>

        <div className="bg-primary-black rounded-xl px-4">
          <Image src="/logo.png" alt="logo" width={144} height={48} />
        </div>
      </section>

      <section className="flex items-center gap-4 bg-primary-black rounded-xl px-6 py-4">
        <Title designId={_id} title={title} isCreator={isCreator} />
        {/* <Badge className="bg-primary-grey-100 text-gray-400 hover:bg-none">
          <LockIcon size={12} className="text-gray-500" />
          &nbsp; View Only
        </Badge> */}
      </section>

      <section className="flex gap-2">
        <ActiveUsers design={design} userId={userId!} isCreator={isCreator} />

        <AccountMenu id={userId!} info={currentUser.info}>
          <div className="bg-primary-black rounded-xl p-3">
            <Avatar src={currentUser.info.avatar} alt={currentUser.info.name} />
          </div>
        </AccountMenu>
      </section>
    </nav>
  );
};

export default Topbar;
