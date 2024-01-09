"use client";

import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { useRef, useState } from "react";

gsap.registerPlugin(Flip);

export default function GridTransforms() {
  const [isGrid, setIsGrid] = useState(true);
  const flipState = useRef<Flip.FlipState>();
  const containerRef = useRef<HTMLDivElement>(null);
  const boxes = useRef<HTMLDivElement[]>([]);
  const [gridItems, setGridItems] = useState(6);
  const startHeight = useRef<string | number>(0);
  const { contextSafe } = useGSAP({ scope: containerRef });

  const saveState = contextSafe(() => {
    flipState.current = Flip.getState(
      [".box", ".skeleton-image", ".skeleton-text"],
      {
        props: "borderRadius",
      },
    );
    startHeight.current = gsap.getProperty(containerRef.current, "height");
  });

  const handleToggle = () => {
    saveState();
    setIsGrid(!isGrid);
  };

  const addItem = () => {
    setGridItems(gridItems + 1);
  };

  const retainHeight = (
    flip: gsap.core.Timeline,
    endHeight: number | string,
  ) => {
    flip.fromTo(
      containerRef.current,
      {
        height: startHeight.current,
      },
      {
        height: endHeight,
        clearProps: "height",
        duration: flip.duration(),
      },
      0,
    );
  };

  const removeItem = contextSafe((index: number) => {
    const width = boxes.current[index].offsetWidth;

    saveState();
    boxes.current[index].style.display = "none";

    if (!flipState.current) return;

    const endHeight = gsap.getProperty(containerRef.current, "height");

    const flip = Flip.from(flipState.current, {
      duration: 0.5,
      absolute: true,
      nested: true,
      simple: true,
      onLeave: (els) => {
        gsap.set(els, {
          width: width,
        });
        gsap.to(els, {
          opacity: 0,
          scale: 0,
        });
      },
    });
    retainHeight(flip, endHeight);
  });

  useGSAP(() => {
    if (!flipState.current) return;

    const endHeight = gsap.getProperty(containerRef.current, "height");

    const flip = Flip.from(flipState.current, {
      duration: 0.5,
      absolute: true,
      nested: true,
    });
    retainHeight(flip, endHeight);
  }, [isGrid]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-4">
        <button
          className="rounded bg-blue-800 p-4 text-white"
          onClick={handleToggle}
        >
          Change to {isGrid ? "rows" : "grid"}
        </button>
        <button
          className="rounded bg-blue-800 p-4 text-white"
          onClick={addItem}
        >
          Add item
        </button>
      </div>
      <div
        ref={containerRef}
        className={clsx(
          "grid w-full gap-6",
          isGrid ? "grid-cols-4" : "grid-cols-1",
        )}
      >
        {[...Array(gridItems)].map((_, i) => (
          <div
            key={i}
            onClick={() => removeItem(i)}
            ref={(el) => (boxes.current[i] = el as HTMLDivElement)}
            className={clsx(
              "box flex w-full gap-2 bg-blue-800 p-2",
              isGrid ? "h-40 flex-col" : "h-20",
            )}
          >
            <div
              className={clsx(
                "skeleton-image h-20 bg-blue-600",
                isGrid
                  ? "h-20 w-full rounded-none"
                  : "aspect-square h-full w-auto rounded-[40px]",
              )}
            ></div>
            <div
              className={clsx(
                "skeleton-text bg-blue-600 p-2 text-xs text-white",
                isGrid ? "h-auto w-40" : "h-full w-1/2",
              )}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
