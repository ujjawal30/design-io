import { MousePointer2Icon } from "lucide-react";

interface CursorProps {
  color: string;
  x: number;
  y: number;
  message?: string;
}

const Cursor = ({ color, x, y, message }: CursorProps) => {
  return (
    <div
      className="pointer-events-none absolute top-0 left-0"
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
    >
      <MousePointer2Icon size={20} fill={color} color={color} />

      {message && (
        <div
          className="absolute left-2 top-5 px-4 py-2 text-sm leading-relaxed text-white whitespace-nowrap rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default Cursor;
