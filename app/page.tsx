"use client";

import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";

import { useMutation, useRedo, useStorage, useUndo } from "@/liveblocks.config";
import { ActiveElement, IFabricObject } from "@/types";
import { defaultNavElement } from "@/constants";

import Navbar from "@/components/shared/Navbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import LiveContainer from "@/components/liveblocks/LiveContainer";
import {
  handleCanvasMouseDown,
  handleCanvasMouseMove,
  handleCanvasMouseUp,
  handleCanvasObjectModified,
  handleResize,
  initializeCanvas,
  renderCanvas,
} from "@/lib/canvas";
import { handleDelete, handleKeyDown } from "@/lib/events";
import { handleImageUpload as handleImage } from "@/lib/shapes";

const HomePage = () => {
  const [activeElement, setActiveElement] =
    useState<ActiveElement>(defaultNavElement);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const shapeRef = useRef<fabric.Object | null>(null);
  const selectedShapeRef = useRef<string | null>(null);
  const activeObjectRef = useRef<fabric.Object | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const isDrawing = useRef<boolean>(false);

  const undo = useUndo();
  const redo = useRedo();

  const canvasObjects = useStorage((root) => root.canvasObject);

  const syncShapeInStorage = useMutation(({ storage }, object) => {
    if (!object) return;

    const { objectId } = object;

    const shapeData = object.toJSON();
    shapeData.objectId = objectId;

    const canvasObjects = storage.get("canvasObject");
    canvasObjects.set(objectId, shapeData);
  }, []);

  const deleteShape = useMutation(({ storage }, objectId) => {
    const canvasObjects = storage.get("canvasObject");

    if (!canvasObjects || !canvasObjects.has(objectId)) return;

    canvasObjects.delete(objectId);
  }, []);

  const deleteAllShapes = useMutation(({ storage }) => {
    const canvasObjects = storage.get("canvasObject");

    if (!canvasObjects || canvasObjects.size === 0) return true;

    for (const [key, value] of Array.from(canvasObjects)) {
      canvasObjects.delete(key);
    }

    return canvasObjects.size === 0;
  }, []);

  useEffect(() => {
    const canvas = initializeCanvas(canvasRef, fabricRef);

    canvas.on("mouse:down", (options) =>
      handleCanvasMouseDown({
        options,
        canvas,
        shapeRef,
        isDrawing,
        selectedShapeRef,
      })
    );

    canvas.on("mouse:move", (options) =>
      handleCanvasMouseMove({
        options,
        canvas,
        isDrawing,
        selectedShapeRef,
        shapeRef,
        syncShapeInStorage,
      })
    );

    canvas.on("mouse:up", () =>
      handleCanvasMouseUp({
        canvas,
        isDrawing,
        selectedShapeRef,
        shapeRef,
        syncShapeInStorage,
        setActiveElement,
        activeObjectRef,
      })
    );

    canvas.on("object:modified", (options) =>
      handleCanvasObjectModified({ options, syncShapeInStorage })
    );

    window.addEventListener("resize", () => {
      handleResize(fabricRef.current);
    });

    window.addEventListener("keydown", (event) =>
      handleKeyDown({
        e: event,
        canvas: fabricRef.current,
        deleteShape,
        syncShapeInStorage,
        redo,
        undo,
      })
    );

    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    renderCanvas({ fabricRef, canvasObjects, activeObjectRef });
  }, [canvasObjects]);

  const handleActiveElement = (element: ActiveElement) => {
    setActiveElement(element);

    switch (element.value) {
      case "image":
        imageInputRef.current?.click();
        isDrawing.current = false;
        if (fabricRef.current) {
          fabricRef.current.isDrawingMode = false;
        }
        break;
      case "reset":
        deleteAllShapes();
        fabricRef.current?.clear();
        setActiveElement(defaultNavElement);
        break;
      case "delete":
        handleDelete(fabricRef.current!, deleteShape);
        setActiveElement(defaultNavElement);
      default:
        break;
    }

    selectedShapeRef.current = element.value as string;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();

    handleImage({
      file: e.target.files![0],
      canvas: fabricRef as any,
      shapeRef,
      syncShapeInStorage,
    });
  };

  return (
    <main className="h-screen w-full overflow-hidden flex flex-col">
      <Navbar
        activeElement={activeElement}
        handleActiveElement={handleActiveElement}
        imageInputRef={imageInputRef}
        handleImageUpload={handleImageUpload}
      />

      <section className="flex flex-1 h-full flex-row">
        <LeftSidebar shapes={Array.from(canvasObjects)} />

        <LiveContainer>
          <canvas ref={canvasRef} />
        </LiveContainer>

        <RightSidebar />
      </section>
    </main>
  );
};

export default HomePage;
