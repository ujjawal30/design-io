import Image from "next/image";
import styles from "./index.module.css";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src: string;
  name: string;
  className?: string;
}

const Avatar = ({ src, name, className }: AvatarProps) => {
  return (
    <div className={cn(styles.avatar, className)} data-tooltip={name}>
      {src.includes("https://") ? <Image className="w-full h-full rounded-full" src={src} alt={name} fill /> : <p className="text-white">{src}</p>}
    </div>
  );
};

export default Avatar;
