import {
  fontFamilyOptions,
  fontSizeOptions,
  fontWeightOptions,
} from "@/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";

interface TextProps {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  isEditing: React.MutableRefObject<boolean>;
  handleInputChange: (property: string, value: string) => void;
}

const selectConfigs = [
  {
    property: "fontFamily",
    label: "Style",
    placeholder: "Choose a font",
    options: fontFamilyOptions,
  },
  {
    property: "fontSize",
    label: "Size",
    placeholder: "Choose font size",
    options: fontSizeOptions,
  },
  {
    property: "fontWeight",
    label: "Weight",
    placeholder: "Choose font weight",
    options: fontWeightOptions,
  },
];

const Text = ({
  fontFamily,
  fontSize,
  fontWeight,
  isEditing,
  handleInputChange,
}: TextProps) => {
  return (
    <section className="flex flex-col border-b border-primary-grey-200 p-4 gap-4">
      <h3 className="text-[10px] uppercase">Text</h3>

      <div className="flex flex-col gap-4">
        {selectConfigs.map((config) => (
          <div key={config.property} className="flex items-center gap-4 flex-1">
            <Label className="text-sm font-bold w-1/4">{config.label}</Label>
            <Select
              onValueChange={(value) =>
                handleInputChange(config.property, value)
              }
              value={
                config.property === "fontFamily"
                  ? fontFamily
                  : config.property === "fontSize"
                  ? fontSize
                  : fontWeight
              }
            >
              <SelectTrigger
                className="input-ring w-full rounded-sm border border-primary-grey-200"
                onBlur={(e) => (isEditing.current = false)}
              >
                <SelectValue placeholder={config.placeholder} />
              </SelectTrigger>
              <SelectContent className="border-primary-grey-200 bg-primary-black text-primary-grey-300">
                {config.options.map((option) => (
                  <SelectItem
                    key={option.label}
                    value={option.value}
                    className="focus-within:!bg-primary-purple focus-within:!text-primary-grey-300 hover:!bg-primary-purple hover:!text-primary-grey-300"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Text;
