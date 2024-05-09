import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const Avatar = ({ src, alt, size = 32, className, style }: AvatarProps) => {
  return (
    <Image src={src} alt={alt} height={size} width={size} className={cn("border-2 border-primary-grey-200 rounded-full", className)} style={style} />
  );
};

export default Avatar;
