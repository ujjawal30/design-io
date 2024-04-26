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

export const fontFamilyOptions = [
  { value: "Helvetica", label: "Helvetica" },
  { value: "Times New Roman", label: "Times New Roman" },
  { value: "Comic Sans MS", label: "Comic Sans MS" },
  { value: "Brush Script MT", label: "Brush Script MT" },
];

export const fontSizeOptions = [
  {
    value: "10",
    label: "10",
  },
  {
    value: "12",
    label: "12",
  },
  {
    value: "14",
    label: "14",
  },
  {
    value: "16",
    label: "16",
  },
  {
    value: "18",
    label: "18",
  },
  {
    value: "20",
    label: "20",
  },
  {
    value: "22",
    label: "22",
  },
  {
    value: "24",
    label: "24",
  },
  {
    value: "26",
    label: "26",
  },
  {
    value: "28",
    label: "28",
  },
  {
    value: "30",
    label: "30",
  },
  {
    value: "32",
    label: "32",
  },
  {
    value: "34",
    label: "34",
  },
  {
    value: "36",
    label: "36",
  },
];

export const fontWeightOptions = [
  {
    value: "400",
    label: "Normal",
  },
  {
    value: "500",
    label: "Semibold",
  },
  {
    value: "600",
    label: "Bold",
  },
];
