import Link from "next/link";
import { MoreVerticalIcon } from "lucide-react";

import { IUser } from "@/lib/models/user.model";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import Avatar from "@/components/liveblocks/users/Avatar";
import { IDesign } from "@/lib/models/design.model";
import MoreMenu from "../menus/MoreMenu";
import { useRouter } from "next/navigation";
import { elapsedTime } from "@/lib/utils";

interface DesignCardProps {
  design: IDesign;
  userId: string;
}

const DesignCard = ({ design, userId }: DesignCardProps) => {
  const { push } = useRouter();

  const creator = design.creator as IUser;

  return (
    <div
      onClick={() => push(`/design/${design._id}`)}
      className="flex flex-col bg-primary-grey-200 text-gray-300 rounded-xl gap-2 p-4 group cursor-pointer"
    >
      <div className="flex-1 space-y-4">
        <div className="flex justify-between items-center gap-2">
          <h3 className="text-lg font-semibold group-hover:text-primary-purple">{design.title}</h3>

          <MoreMenu design={design as DesignProps} isCreator={creator._id === userId}>
            <Button className="bg-transparent text-gray-400 rounded-full h-fit p-1.5 hover:!bg-primary-grey-100 hover:shadow-md">
              <MoreVerticalIcon size={20} />
            </Button>
          </MoreMenu>
        </div>
        <span className="text-sm text-gray-500">{design.description}</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-400">Updated {elapsedTime(design.updatedAt)}</span>

        <Tooltip content={creator.name}>
          <Avatar src={creator.photo!} alt={creator.name} />
        </Tooltip>
      </div>
    </div>
  );
};

export default DesignCard;
