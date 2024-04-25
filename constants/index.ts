import { ActiveElement } from "@/types";
import {
  CircleIcon,
  ImageIcon,
  MessageCircleIcon,
  MousePointer2Icon,
  PentagonIcon,
  RotateCwIcon,
  SlashIcon,
  SquareIcon,
  TrashIcon,
  TriangleIcon,
  TypeIcon,
} from "lucide-react";

export const COLORS = [
  "#E57373",
  "#9575CD",
  "#4FC3F7",
  "#81C784",
  "#FFF176",
  "#FF8A65",
  "#F06292",
  "#7986CB",
];

export const shapeElements = [
  {
    icon: SquareIcon,
    name: "Rectangle",
    value: "rectangle",
  },
  {
    icon: CircleIcon,
    name: "Circle",
    value: "circle",
  },
  {
    icon: TriangleIcon,
    name: "Triangle",
    value: "triangle",
  },
  {
    icon: SlashIcon,
    name: "Line",
    value: "line",
  },
  {
    icon: ImageIcon,
    name: "Image",
    value: "image",
  },
  {
    icon: PentagonIcon,
    name: "Free Drawing",
    value: "freeform",
  },
];

export const navElements = [
  {
    icon: MousePointer2Icon,
    name: "Select",
    value: "select",
  },
  {
    icon: SquareIcon,
    name: "Rectangle",
    value: shapeElements,
  },
  {
    icon: TypeIcon,
    value: "text",
    name: "Text",
  },
  {
    icon: TrashIcon,
    value: "delete",
    name: "Delete",
  },
  {
    icon: RotateCwIcon,
    value: "reset",
    name: "Reset",
  },
  {
    icon: MessageCircleIcon,
    value: "comments",
    name: "Comments",
  },
];

export const defaultNavElement = {
  icon: MousePointer2Icon,
  name: "Select",
  value: "select",
};

export const defaultAttributes = {
  width: "",
  height: "",
  fontSize: "",
  fontFamily: "",
  fontWeight: "",
  fill: "#aabbcc",
  stroke: "#aabbcc",
};
