"use client";

import { useRef } from "react";
import { gsap } from "gsap";

export default function TiltingButton() {
  const ref = useRef<HTMLButtonElement>(null);
  const duration = 250;

  const handleEnter = () => {
    setTimeout(() => {
      if (!ref.current) return;
      ref.current.style.transition = "";
    }, duration);
  };

  const handleMove: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!ref.current) return;
    const getX = gsap.utils.mapRange(0, ref.current.offsetWidth, -0.001, 0.001);
    const getY = gsap.utils.mapRange(
      0,
      ref.current.offsetHeight,
      -0.001,
      0.001,
    );
    const { clientX, clientY } = e;
    const { x, y } = ref.current.getBoundingClientRect();
    const posX = clientX - x;
    const posY = clientY - y;
    const pX = getX(posX);
    const pY = getY(posY);

    ref.current.style.transform = `matrix3d(1, 0, 0, ${pX}, 0, 1, 0, ${pY}, 0, 0, 1, 0, 0, 0, 0, 1)`;
  };

  const handleLeave = () => {
    if (!ref.current) return;
    ref.current.style.transition = `transform ${250}ms`;
    ref.current.style.transform =
      "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)";
  };

  return (
    <button
      type="button"
      className="button relative overflow-hidden rounded bg-blue-800 px-8 py-6 text-2xl text-white"
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      ref={ref}
    >
      Hover me
    </button>
  );
}
