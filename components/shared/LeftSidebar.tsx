import { cn, getShapeInfo } from "@/lib/utils";
import { IFabricObject } from "@/types";

interface LeftSidebarProps {
  shapes: any[];
  fabricRef: React.MutableRefObject<fabric.Canvas | null>;
}

const LeftSidebar = ({ shapes, fabricRef }: LeftSidebarProps) => {
  const isActive = (objectId: string) =>
    // @ts-ignore
    fabricRef.current?.getActiveObject()?.objectId === objectId;

  const handleClick = (object: fabric.Object) => {
    fabricRef.current?.setActiveObject(object);
    fabricRef.current?.renderAll();
  };

  return (
    <section className="flex flex-col border-t border-primary-grey-200 bg-primary-black text-primary-grey-300 min-w-56 sticky left-0 max-sm:hidden h-full select-none overflow-y-auto pb-20">
      <h3 className="border-b border-primary-grey-200 p-4 text-xs uppercase">
        Elements
      </h3>

      {fabricRef.current?._objects.map((object: IFabricObject<any>) => {
        const { name, icon: Icon } = getShapeInfo(object?.type!);

        return (
          <div
            key={object.objectId}
            className={cn(
              "flex gap-4 px-4 py-3 items-center hover:bg-primary-purple hover:cursor-pointer",
              isActive(object.objectId!) && "bg-primary-purple"
            )}
            onClick={() => handleClick(object)}
          >
            <Icon size={20} />
            <p className="text-sm font-semibold capitalize">{name}</p>
          </div>
        );
      })}
    </section>
  );
};

export default LeftSidebar;
