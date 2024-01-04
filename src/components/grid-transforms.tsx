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
  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleToggle = contextSafe(() => {
    flipState.current = Flip.getState(".box");
    setIsGrid(!isGrid);
  }) as React.MouseEventHandler<HTMLButtonElement>;

  const addItem = () => {
    setGridItems(gridItems + 1);
  };

  const removeItem = contextSafe((index: number) => {
    const width = boxes.current[index].offsetWidth;

    flipState.current = Flip.getState(".box");
    boxes.current[index].style.display = "none";

    Flip.from(flipState.current, {
      duration: 0.5,
      absolute: true,
      onLeave: (els) => {
        console.log("On leave", els);
        gsap.set(els, {
          width: width,
        });
        gsap.to(els, {
          opacity: 0,
          scale: 0,
        });
      },
    });
  });

  useGSAP(() => {
    if (!flipState.current) return;

    Flip.from(flipState.current, {
      duration: 0.5,
      stagger: 0.05,
      absolute: true,
    });
  }, [isGrid]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-4">
        <button
          className="rounded bg-blue-800 p-4 text-white"
          onClick={handleToggle}
        >
          Change to {isGrid ? "columns" : "grid"}
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
          "grid w-full gap-10",
          isGrid ? "grid-cols-4" : "grid-cols-1",
        )}
      >
        {[...Array(gridItems)].map((_, i) => (
          <div
            key={i}
            onClick={() => removeItem(i)}
            ref={(el) => (boxes.current[i] = el as HTMLDivElement)}
            className={clsx("box w-full bg-blue-800", isGrid ? "h-40" : "h-20")}
          ></div>
        ))}
      </div>
    </>
  );
}
