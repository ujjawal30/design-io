import { useState } from "react";
import Image from "next/image";
import { LoaderIcon, PlusIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface UserCardProps extends UserProps {
  role: "creator" | "collaborator" | "none";
  handleCollaborators: (userId: string, action: "add" | "remove") => Promise<void>;
}

const UserCard = ({ _id, name, photo, role, handleCollaborators }: UserCardProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);

    if (role === "none") {
      // add user
      await handleCollaborators(_id, "add");
    } else {
      // remove user
      await handleCollaborators(_id, "remove");
    }

    setIsLoading(false);
  };

  return (
    <div key={_id} className="flex items-center gap-4 text-white">
      <Image src={photo} alt={name} width={48} height={48} className="rounded-full" />
      <p className="font-medium flex-1">{name}</p>

      {role !== "none" ? (
        <>
          <Badge className="bg-primary-grey-100 text-[12px] font-semibold text-gray-400 hover:bg-none capitalize">{role}</Badge>
          {role === "collaborator" && (
            <Button disabled={isLoading} className="bg-primary-grey-100 text-gray-400 rounded-full h-fit p-1" onClick={handleClick}>
              {isLoading ? <LoaderIcon size={16} className="animate-spin" /> : <XIcon size={16} />}
            </Button>
          )}
        </>
      ) : (
        <Button disabled={isLoading} className="bg-primary-grey-100 text-gray-400 rounded-full h-fit p-1" onClick={handleClick}>
          {isLoading ? <LoaderIcon size={16} className="animate-spin" /> : <PlusIcon size={16} />}
        </Button>
      )}
    </div>
  );
};

export default UserCard;
