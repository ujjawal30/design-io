import { create } from "zustand";

interface useModalStore {
  isOpen: boolean;
  design: DesignProps | null;
  onOpen: (design: DesignProps) => void;
  onClose: () => void;
}

export const editMetadataModal = create<useModalStore>((set) => ({
  isOpen: false,
  design: null,
  onOpen: (design) => set({ isOpen: true, design: design }),
  onClose: () => set({ isOpen: false, design: null }),
}));
