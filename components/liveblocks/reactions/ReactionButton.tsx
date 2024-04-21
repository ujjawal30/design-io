interface ReactionButtonProps {
  reaction: string;
  onSelect: (reaction: string) => void;
}

const ReactionButton = ({ reaction, onSelect }: ReactionButtonProps) => {
  return (
    <button
      className="transform select-none p-2 text-xl transition-transform hover:scale-150 focus:scale-150 focus:outline-none"
      onPointerDown={() => onSelect(reaction)}
    >
      {reaction}
    </button>
  );
};

export default ReactionButton;
