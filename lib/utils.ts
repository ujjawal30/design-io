import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  CircleIcon,
  ImageIcon,
  PentagonIcon,
  SlashIcon,
  SquareIcon,
  TriangleIcon,
  TypeIcon,
} from "lucide-react";

const adjectives = [
  "Happy",
  "Creative",
  "Energetic",
  "Lively",
  "Dynamic",
  "Radiant",
  "Joyful",
  "Vibrant",
  "Cheerful",
  "Sunny",
  "Sparkling",
  "Bright",
  "Shining",
];

const animals = [
  "Dolphin",
  "Tiger",
  "Elephant",
  "Penguin",
  "Kangaroo",
  "Panther",
  "Lion",
  "Cheetah",
  "Giraffe",
  "Hippopotamus",
  "Monkey",
  "Panda",
  "Crocodile",
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomName(): string {
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomAnimal = animals[Math.floor(Math.random() * animals.length)];

  return `${randomAdjective} ${randomAnimal}`;
}

export function getShapeInfo(shapeType: string) {
  switch (shapeType) {
    case "rect":
      return {
        icon: SquareIcon,
        name: "Rectangle",
      };

    case "circle":
      return {
        icon: CircleIcon,
        name: "Circle",
      };

    case "triangle":
      return {
        icon: TriangleIcon,
        name: "Triangle",
      };

    case "line":
      return {
        icon: SlashIcon,
        name: "Line",
      };

    case "i-text":
      return {
        icon: TypeIcon,
        name: "Text",
      };

    case "image":
      return {
        icon: ImageIcon,
        name: "Image",
      };

    case "freeform":
      return {
        icon: PentagonIcon,
        name: "Free Drawing",
      };

    default:
      return {
        icon: SquareIcon,
        name: shapeType,
      };
  }
}
