import { fabric } from "fabric";
import { v4 as uuidv4 } from "uuid";

import { IFabricObject, KeyDown } from "@/types";

export const handleCopy = (canvas: fabric.Canvas) => {
  const activeObjects = canvas.getActiveObjects();
  if (!activeObjects || activeObjects.length === 0) return;

  if (activeObjects.length > 0) {
    const serializedObjects = activeObjects.map((obj) => obj.toObject());

    localStorage.setItem("copiedObjects", JSON.stringify(serializedObjects));
  }
};

export const handlePaste = (
  canvas: fabric.Canvas,
  syncShapeInStorage: (shape: fabric.Object) => void
) => {
  if (!canvas || !(canvas instanceof fabric.Canvas)) {
    console.error("Invalid canvas object. Aborting paste operation.");
    return;
  }

  const copiedObjects = localStorage.getItem("copiedObjects");
  if (!copiedObjects) return;

  try {
    const parsedObjects = JSON.parse(copiedObjects);

    parsedObjects.forEach((obj: fabric.Object) => {
      fabric.util.enlivenObjects(
        [obj],
        (enlivenedObjects: fabric.Object[]) => {
          enlivenedObjects.forEach((enlivenedObject) => {
            enlivenedObject.set({
              left: enlivenedObject.left || 0 + 10,
              top: enlivenedObject.top || 0 + 10,
              objectId: uuidv4(),
              fill: "#aabbcc",
            } as IFabricObject<any>);

            canvas.add(enlivenedObject);
            syncShapeInStorage(enlivenedObject);
          });

          canvas.renderAll();
        },
        "fabric"
      );
    });
  } catch (error) {
    console.error("Error pasting data:", error);
  }
};

export const handleKeyDown = ({
  e,
  canvas,
  deleteShape,
  syncShapeInStorage,
  redo,
  undo,
}: KeyDown) => {
  if ((e?.ctrlKey || e?.metaKey) && e.key === "z") {
    undo();
  }
  if ((e?.ctrlKey || e?.metaKey) && e.key === "y") {
    redo();
  }
  if (e.key === "Delete") {
    handleDelete(canvas, deleteShape);
  }
  if ((e?.ctrlKey || e?.metaKey) && e.key === "c") {
    handleCopy(canvas);
  }
  if ((e?.ctrlKey || e?.metaKey) && e.key === "v") {
    handlePaste(canvas, syncShapeInStorage);
  }
};

export const handleDelete = (
  canvas: fabric.Canvas,
  deleteShape: (id: string) => void
) => {
  const activeObjects = canvas.getActiveObjects();
  if (!activeObjects || activeObjects.length === 0) return;

  if (activeObjects.length > 0) {
    activeObjects.forEach((obj: IFabricObject<any>) => {
      if (!obj.objectId) return;
      canvas.remove(obj);
      deleteShape(obj.objectId);
    });
  }

  canvas.discardActiveObject();
  canvas.requestRenderAll();
};
