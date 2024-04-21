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
