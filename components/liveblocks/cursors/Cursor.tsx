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
    </div>
  );
};

export default Cursor;
