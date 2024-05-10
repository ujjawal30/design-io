import Link from "next/link";
import { MoreVerticalIcon } from "lucide-react";

import { IUser } from "@/lib/models/user.model";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import Avatar from "@/components/liveblocks/users/Avatar";

interface DesignCardProps {
  _id: string;
  title: string;
  description: string;
  updatedAt: Date;
  creator: IUser;
}

const DesignCard = ({ _id, title, description, creator, updatedAt }: DesignCardProps) => {
  return (
    <Link href={`/design/${_id}`} className="flex flex-col bg-primary-grey-200 text-white rounded-xl gap-2 p-4">
      <div className="flex-1 space-y-4">
        <div className="flex justify-between items-center gap-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Button className="bg-transparent text-gray-400 rounded-full h-fit p-1.5 hover:!bg-primary-grey-100 hover:shadow-md">
            <MoreVerticalIcon size={20} />
          </Button>
        </div>
        <span className="text-sm text-gray-400">{description}</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-base text-gray-300">Updated on {new Date(updatedAt).getDate()}</span>

        <Tooltip content={creator.name}>
          <Avatar src={creator.photo!} alt={creator.name} />
        </Tooltip>
      </div>
    </Link>
  );
};

export default DesignCard;
