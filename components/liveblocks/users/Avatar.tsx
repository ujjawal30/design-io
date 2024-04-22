import styles from "./index.module.css";

interface AvatarProps {
  src: string;
  name: string;
}

const IMAGE_SIZE = 48;

const Avatar = ({ src, name }: AvatarProps) => {
  return (
    <div className={styles.avatar} data-tooltip={name}>
      {src.includes("https://") ? (
        <img
          className="w-full h-full rounded-full"
          src={src}
          height={IMAGE_SIZE}
          width={IMAGE_SIZE}
        />
      ) : (
        <p className="text-white">{src}</p>
      )}
    </div>
  );
};

export default Avatar;
