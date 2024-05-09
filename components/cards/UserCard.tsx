import Image from "next/image";
import { Badge } from "../ui/badge";

interface UserCardProps extends UserProps {
  role: "creator" | "collaborator" | "none";
}

const UserCard = ({ _id, name, photo, role }: UserCardProps) => {
  return (
    <div key={_id} className="flex items-center gap-4 text-white">
      <Image src={photo} alt={name} width={48} height={48} className="rounded-full" />
      <p className="font-medium flex-1">{name}</p>
      {role !== "none" && <Badge className="bg-primary-grey-100 text-[12px] font-semibold text-gray-400 hover:bg-none capitalize">{role}</Badge>}
    </div>
  );
};

export default UserCard;
