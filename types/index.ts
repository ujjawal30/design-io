import { LucideIcon } from "lucide-react";

export enum CursorMode {
  Hidden,
  Chat,
  ReactionSelector,
  Reaction,
}

export type CursorState = {
  mode: CursorMode;
  message?: string;
  previousMessage?: string | null;
  reaction?: string;
  isPressed?: boolean;
};

export type Reaction = {
  value: string;
  timestamp: number;
  point: { x: number; y: number };
};

export type ReactionEvent = {
  x: number;
  y: number;
  value: string;
};

export type ActiveElement = {
  name: string;
  value: string;
  icon: LucideIcon;
} | null;
