"use client";

import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";

import { useMutation, useStorage } from "@/liveblocks.config";
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

const HomePage = () => {
  const [activeElement, setActiveElement] =
    useState<ActiveElement>(defaultNavElement);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const shapeRef = useRef<fabric.Object | null>(null);
  const selectedShapeRef = useRef<string | null>(null);
  const activeObjectRef = useRef<fabric.Object | null>(null);
  const isDrawing = useRef(false);

  const canvasObjects = useStorage((root) => root.canvasObject);

  const syncShapeInStorage = useMutation(({ storage }, object) => {
    if (!object) return;

    const { objectId } = object;

    const shapeData = object.toJSON();
    shapeData.objectId = objectId;

    const canvasObjects = storage.get("canvasObject");
    canvasObjects.set(objectId, shapeData);
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
  }, []);

  useEffect(() => {
    renderCanvas({ fabricRef, canvasObjects, activeObjectRef });
  }, [canvasObjects]);

  const handleActiveElement = (element: ActiveElement) => {
    setActiveElement(element);

    selectedShapeRef.current = element.value as string;
  };

  return (
    <main className="h-screen w-full overflow-hidden flex flex-col">
      <Navbar
        activeElement={activeElement}
        handleActiveElement={handleActiveElement}
      />

      <section className="flex flex-1 h-full flex-row">
        <LeftSidebar />

        <LiveContainer>
          <canvas ref={canvasRef} />
        </LiveContainer>

        <RightSidebar />
      </section>
    </main>
  );
};

export default HomePage;
