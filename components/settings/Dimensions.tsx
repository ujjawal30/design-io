import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface DimensionsProps {
  width: string;
  height: string;
  isEditing: React.MutableRefObject<boolean>;
  handleInputChange: (property: string, value: string) => void;
}

const dimensionsOptions = [
  { label: "W", property: "width" },
  { label: "H", property: "height" },
];

const Dimensions = ({
  width,
  height,
  isEditing,
  handleInputChange,
}: DimensionsProps) => {
  return (
    <section className="flex flex-col border-b border-primary-grey-200 p-4 gap-4">
      <h3 className="text-[10px] uppercase">Dimensions</h3>

      <div className="flex flex-col gap-4">
        {dimensionsOptions.map((item) => (
          <div key={item.label} className="flex items-center gap-4 flex-1">
            <Label htmlFor={item.property} className="text-sm font-bold w-1/6">
              {item.label}
            </Label>
            <Input
              type="number"
              id={item.property}
              placeholder="100"
              value={item.property === "width" ? width : height}
              className="input-ring"
              min={10}
              onChange={(e) => handleInputChange(item.property, e.target.value)}
              onBlur={(e) => (isEditing.current = false)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Dimensions;
