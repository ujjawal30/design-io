"use client";

import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";

import Navbar from "@/components/shared/Navbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import LiveContainer from "@/components/liveblocks/LiveContainer";
import {
  handleCanvasMouseDown,
  handleResize,
  initializeCanvas,
} from "@/lib/canvas";
import { ActiveElement } from "@/types";
import { defaultNavElement } from "@/constants";

const HomePage = () => {
  const [activeElement, setActiveElement] =
    useState<ActiveElement>(defaultNavElement);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const shapeRef = useRef<fabric.Object | null>(null);
  const selectedShapeRef = useRef<string | null>("rectangle");
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = initializeCanvas(canvasRef, fabricRef);

    canvas.on("mouse:down", (options) => {
      handleCanvasMouseDown({
        options,
        canvas,
        shapeRef,
        isDrawing,
        selectedShapeRef,
      });
    });

    window.addEventListener("resize", () => {
      handleResize(fabricRef.current);
    });
  }, []);

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
