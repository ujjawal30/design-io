import { getShapeInfo } from "@/lib/utils";

interface LeftSidebarProps {
  shapes: any[];
}

const LeftSidebar = ({ shapes }: LeftSidebarProps) => {
  console.log("shapes :>> ", shapes);
  return (
    <section className="flex flex-col border-t border-primary-grey-200 bg-primary-black text-primary-grey-300 min-w-56 sticky left-0 max-sm:hidden h-full select-none overflow-y-auto pb-20">
      <h3 className="border border-primary-grey-200 p-4 text-xs uppercase">
        Elements
      </h3>

      {shapes?.map((shape) => {
        const { name, icon: Icon } = getShapeInfo(shape[1].type);

        return (
          <div
            key={shape[0]}
            className="flex gap-4 px-4 py-3 items-center hover:bg-primary-purple hover:cursor-pointer"
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
