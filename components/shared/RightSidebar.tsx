import { Attributes } from "@/types";
import { modifyShape } from "@/lib/shapes";
import Dimensions from "@/components/settings/Dimensions";
import Text from "@/components/settings/Text";
import Color from "@/components/settings/Color";
import Export from "@/components/settings/Export";

interface RightSidebarProps {
  elementAttributes: Attributes;
  setElementAttributes: React.Dispatch<React.SetStateAction<Attributes>>;
  fabricRef: React.RefObject<fabric.Canvas | null>;
  activeObjectRef: React.RefObject<fabric.Object | null>;
  isEditing: React.MutableRefObject<boolean>;
  syncShapeInStorage: (obj: any) => void;
}

const RightSidebar = ({
  elementAttributes,
  setElementAttributes,
  fabricRef,
  activeObjectRef,
  syncShapeInStorage,
  isEditing,
}: RightSidebarProps) => {
  const handleInputChange = (property: string, value: string) => {
    if (!isEditing.current) isEditing.current = true;

    setElementAttributes((prev) => ({ ...prev, [property]: value }));

    modifyShape({
      canvas: fabricRef.current as fabric.Canvas,
      property,
      value,
      activeObjectRef,
      syncShapeInStorage,
    });
  };

  return (
    <section className="flex flex-col border-t border-primary-grey-200 bg-primary-black text-primary-grey-300 min-w-56 sticky right-0 max-sm:hidden h-full select-none">
      <h3 className="p-4 text-xs uppercase">Design</h3>

      <span className="text-xs text-primary-grey-300 p-4 pt-0 border-b border-primary-grey-200">
        Make changes to th canvas and see them live.
      </span>

      <Dimensions
        width={elementAttributes.width}
        height={elementAttributes.height}
        isEditing={isEditing}
        handleInputChange={handleInputChange}
      />

      <Text
        fontFamily={elementAttributes.fontFamily}
        fontSize={elementAttributes.fontSize}
        fontWeight={elementAttributes.fontWeight}
        handleInputChange={handleInputChange}
      />

      <Color />
      <Color />
      <Export />
    </section>
  );
};

export default RightSidebar;
