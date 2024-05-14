import { contextMenuCommands } from "@/constants";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuShortcut, ContextMenuTrigger } from "@/components/ui/context-menu";

interface CustomContextMenuProps {
  children: React.ReactElement;
  id?: string;
  className?: string;
  onPointerUp?: React.PointerEventHandler<HTMLDivElement>;
  onPointerDown?: React.PointerEventHandler<HTMLDivElement>;
  onPointerMove?: React.PointerEventHandler<HTMLDivElement>;
  onPointerLeave?: React.PointerEventHandler<HTMLDivElement>;
  handleContextMenuTrigger: (command: string) => void;
}

const CustomContextMenu = ({
  children,
  id,
  className,
  onPointerUp,
  onPointerDown,
  onPointerMove,
  onPointerLeave,
  handleContextMenuTrigger,
}: CustomContextMenuProps) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger
        id={id}
        className={className}
        onPointerUp={onPointerUp}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="flex w-80 flex-col gap-y-1 border-none bg-primary-black py-4 text-white">
        {contextMenuCommands.map((command) => (
          <ContextMenuItem
            key={command.label}
            className="flex justify-between px-3 py-2 hover:!bg-primary-grey-200 hover:!text-white"
            onClick={() => handleContextMenuTrigger(command.label)}
          >
            <command.icon size={20} className="mr-4 text-primary-grey-300" />
            <p>{command.label}</p>
            <ContextMenuShortcut>{command.shortcut}</ContextMenuShortcut>
          </ContextMenuItem>
        ))}
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default CustomContextMenu;
