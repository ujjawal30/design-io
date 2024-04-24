import { IFabricObject } from "@/types";

export const handleDelete = (
  canvas: fabric.Canvas,
  deleteShapeFromStorage: (id: string) => void
) => {
  const activeObjects = canvas.getActiveObjects();
  if (!activeObjects || activeObjects.length === 0) return;

  if (activeObjects.length > 0) {
    activeObjects.forEach((obj: IFabricObject<any>) => {
      if (!obj.objectId) return;
      canvas.remove(obj);
      deleteShapeFromStorage(obj.objectId);
    });
  }

  canvas.discardActiveObject();
  canvas.requestRenderAll();
};
