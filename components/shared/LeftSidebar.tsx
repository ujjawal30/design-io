import { cn, getShapeInfo } from "@/lib/utils";

interface LeftSidebarProps {
  shapes: Array<any>;
  fabricRef: React.MutableRefObject<fabric.Canvas | null>;
}

const LeftSidebar = ({ shapes, fabricRef }: LeftSidebarProps) => {
  const isActive = (objectId: string) =>
    // @ts-ignore
    fabricRef.current?.getActiveObject()?.objectId === objectId;

  const handleClick = (index: number) => {
    const clickedObject = fabricRef.current?.item(index);

    // @ts-ignore
    fabricRef.current?.setActiveObject(clickedObject);
    fabricRef.current?.renderAll();
  };

  return (
    <section className="flex flex-col border-t border-primary-grey-200 bg-primary-black text-primary-grey-300 min-w-56 sticky left-0 max-sm:hidden h-full select-none overflow-y-auto pb-20">
      <h3 className="border-b border-primary-grey-200 p-4 text-xs uppercase">
        Elements
      </h3>

      {shapes.map(([key, value]: any, index) => {
        const { name, icon: Icon } = getShapeInfo(value?.type!);

        return (
          <div
            key={key}
            className={cn(
              "flex gap-4 px-4 py-3 items-center hover:bg-primary-purple hover:cursor-pointer",
              isActive(key) && "bg-primary-purple"
            )}
            onClick={() => handleClick(index)}
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
