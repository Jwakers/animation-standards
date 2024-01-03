"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export default function RippleButton() {
  const ref = useRef<HTMLButtonElement>(null);
  const { contextSafe } = useGSAP({ scope: ref });

  const handleClick = contextSafe((e: MouseEvent) => {
    if (!ref.current) return;

    const { clientX, clientY } = e;
    const { x, y } = ref.current.getBoundingClientRect();
    const left = clientX - x;
    const top = clientY - y;

    gsap.set(".circle", { left, top });
    gsap.fromTo(
      ".circle",
      {
        scale: 0,
        opacity: 1,
      },
      {
        scale: 1,
        opacity: 0,
      },
    );
  }) as React.MouseEventHandler<HTMLButtonElement>;

  return (
    <button
      type="button"
      className="button relative overflow-hidden rounded bg-blue-800 px-6 py-4 text-white"
      onClick={handleClick}
      ref={ref}
    >
      Click me
      <span className="circle absolute aspect-square w-[200%] origin-center -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-white"></span>
    </button>
  );
}
