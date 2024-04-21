interface AvatarProps {
  src: string;
  name: string;
}

const IMAGE_SIZE = 48;

const Avatar = ({ src, name }: AvatarProps) => {
  return (
    <div
      className="relative flex justify-center items-center place-content-center border-4 border-white rounded-full w-12 h-12 bg-slate-600 ml-3"
      data-tooltip={name}
    >
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
