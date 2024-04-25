import { Attributes } from "@/types";
import Dimensions from "@/components/settings/Dimensions";
import Text from "@/components/settings/Text";
import Color from "@/components/settings/Color";
import Export from "@/components/settings/Export";

interface RightSidebarProps {
  elementAttributes: Attributes;
  setElementAttributes: React.Dispatch<React.SetStateAction<Attributes>>;
  fabricRef: React.RefObject<fabric.Canvas | null>;
  activeObjectRef: React.RefObject<fabric.Object | null>;
  isEditingRef: React.MutableRefObject<boolean>;
  syncShapeInStorage: (obj: any) => void;
}

const RightSidebar = ({}: RightSidebarProps) => {
  return (
    <section className="flex flex-col border-t border-primary-grey-200 bg-primary-black text-primary-grey-300 min-w-56 sticky right-0 max-sm:hidden h-full select-none">
      <h3 className="p-4 text-xs uppercase">Design</h3>

      <span className="text-xs text-primary-grey-300 p-4 pt-0 border-b border-primary-grey-200">
        Make changes to th canvas and see them live.
      </span>

      <Dimensions />
      <Text />
      <Color />
      <Color />
      <Export />
    </section>
  );
};

export default RightSidebar;
