import { useRef } from "react";

import { Attributes } from "@/types";
import { modifyShape } from "@/lib/shapes";
import { cn, getShapeInfo } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dimensions from "@/components/settings/Dimensions";
import Text from "@/components/settings/Text";
import Color from "@/components/settings/Color";
import Export from "@/components/settings/Export";

interface RightSidebarProps {
  elementAttributes: Attributes;
  setElementAttributes: React.Dispatch<React.SetStateAction<Attributes>>;
  fabricRef: React.MutableRefObject<fabric.Canvas | null>;
  shapes: Array<any>;
  activeObjectRef: React.MutableRefObject<fabric.Object | null>;
  isEditing: React.MutableRefObject<boolean>;
  syncShapeInStorage: (obj: any) => void;
}

const RightSidebar = ({
  elementAttributes,
  setElementAttributes,
  fabricRef,
  shapes,
  activeObjectRef,
  syncShapeInStorage,
  isEditing,
}: RightSidebarProps) => {
  const fillColorRef = useRef<HTMLInputElement | null>(null);
  const strokeColorRef = useRef<HTMLInputElement | null>(null);

  const isActive = (objectId: string) =>
    // @ts-ignore
    fabricRef.current?.getActiveObject()?.objectId === objectId;

  const handleClick = (index: number) => {
    const clickedObject = fabricRef.current?.item(index);

    // @ts-ignore
    fabricRef.current?.setActiveObject(clickedObject);
    fabricRef.current?.renderAll();
  };

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
    <Tabs
      defaultValue="design"
      className="flex flex-col border-t border-primary-grey-200 bg-primary-black text-primary-grey-300 rounded-xl w-80 sticky right-0 max-sm:hidden h-full select-none overflow-auto"
    >
      <TabsList className="grid w-full grid-cols-2 border-b border-primary-grey-200 rounded-t-xl">
        <TabsTrigger className="text-xs uppercase" value="design">
          Design
        </TabsTrigger>
        <TabsTrigger className="text-xs uppercase" value="layers">
          Layers
        </TabsTrigger>
      </TabsList>

      <TabsContent className="mt-0 overflow-y-auto" value="design">
        <div className="text-xs text-primary-grey-300 p-4 border-b border-primary-grey-200">Make changes to th canvas and see them live.</div>

        <Dimensions width={elementAttributes.width} height={elementAttributes.height} isEditing={isEditing} handleInputChange={handleInputChange} />

        <Text
          fontFamily={elementAttributes.fontFamily}
          fontSize={elementAttributes.fontSize}
          fontWeight={elementAttributes.fontWeight}
          isEditing={isEditing}
          handleInputChange={handleInputChange}
        />

        <Color
          inputRef={fillColorRef}
          attribute={elementAttributes.fill}
          attributeType="fill"
          isEditing={isEditing}
          handleInputChange={handleInputChange}
        />

        <Color
          inputRef={strokeColorRef}
          attribute={elementAttributes.stroke}
          attributeType="stroke"
          isEditing={isEditing}
          handleInputChange={handleInputChange}
        />

        <Export />
      </TabsContent>

      <TabsContent className="mt-0 overflow-y-auto" value="layers">
        <div className="text-xs text-primary-grey-300 p-4 border-b border-primary-grey-200 w-full">View all your added layers in the canvas.</div>

        <div className="p-2">
          {shapes.map(([key, value]: any, index) => {
            const { name, icon: Icon } = getShapeInfo(value?.type!);

            return (
              <div
                key={key}
                className={cn(
                  "flex gap-4 px-4 py-3 items-center rounded-md hover:bg-primary-grey-200 hover:cursor-pointer",
                  isActive(key) && "!bg-primary-purple"
                )}
                onClick={() => handleClick(index)}
              >
                <Icon size={20} />
                <p className="text-sm font-semibold capitalize">{name}</p>
              </div>
            );
          })}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default RightSidebar;
