import qs from "qs";
import jsPDF from "jspdf";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CircleIcon, ImageIcon, PentagonIcon, SlashIcon, SquareIcon, TriangleIcon, TypeIcon } from "lucide-react";

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
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
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

export function exportToPDF() {
  const canvas = document.querySelector("canvas");

  if (!canvas) return;

  const doc = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [canvas.width, canvas.height],
  });

  const data = canvas.toDataURL();

  doc.addImage(data, "png", 0, 0, canvas.width, canvas.height);

  doc.save("canvas.pdf");
}

export function formUrlQuery(queryString: string, key: string, value: string | number | null) {
  const params = { ...qs.parse(queryString.toString()), [key]: value };

  return `?${qs.stringify(params, {
    skipNulls: true,
  })}`;
}

export function removeKeysFromQuery(queryString: string, keysToRemove: string[]) {
  const currentUrl = qs.parse(queryString);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  // Remove null or undefined values
  Object.keys(currentUrl).forEach((key) => currentUrl[key] == null && delete currentUrl[key]);

  return `?${qs.stringify(currentUrl)}`;
}

export function elapsedTime(date: Date) {
  const now = new Date();
  const inputDate = new Date(date);

  const diffInSeconds = Math.floor((now.getTime() - inputDate.getTime()) / 1000);

  const times = [
    { unit: "year", seconds: 31536000 },
    { unit: "month", seconds: 2592000 },
    { unit: "week", seconds: 604800 },
    { unit: "day", seconds: 86400 },
    { unit: "hour", seconds: 3600 },
    { unit: "minute", seconds: 60 },
    { unit: "second", seconds: 1 },
  ];

  for (const time of times) {
    const interval = Math.floor(diffInSeconds / time.seconds);
    if (interval > 1) {
      return `${interval} ${time.unit}s ago`;
    } else if (interval === 1) {
      return `1 ${time.unit} ago`;
    }
  }

  return "just now";
}
