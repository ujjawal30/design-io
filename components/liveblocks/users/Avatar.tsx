import Image from "next/image";
import styles from "./index.module.css";

interface AvatarProps {
  src: string;
  name: string;
}

const Avatar = ({ src, name }: AvatarProps) => {
  return (
    <div className={styles.avatar} data-tooltip={name}>
      {src.includes("https://") ? (
        <Image
          className="w-full h-full rounded-full"
          src={src}
          alt={name}
          fill
        />
      ) : (
        <p className="text-white">{src}</p>
      )}
    </div>
  );
};

export default Avatar;
