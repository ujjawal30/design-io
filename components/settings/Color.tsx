import { Label } from "../ui/label";

interface ColorProps {
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  attribute: string;
  attributeType: string;
  handleInputChange: (property: string, value: string) => void;
}

const Color = ({
  inputRef,
  attribute,
  attributeType,
  handleInputChange,
}: ColorProps) => {
  return (
    <section className="flex flex-col border-b border-primary-grey-200 p-4 gap-4">
      <h3 className="text-[10px] uppercase">{attributeType}</h3>

      <div
        className="flex items-center gap-2 border border-primary-grey-200"
        onClick={() => inputRef.current?.click()}
      >
        <input
          type="color"
          value={attribute}
          ref={inputRef}
          onChange={(e) => handleInputChange(attributeType, e.target.value)}
        />
        <Label className="flex-1">{attribute}</Label>
      </div>
    </section>
  );
};

export default Color;
