"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export default function SpinButton() {
  const ref = useRef<HTMLDivElement>(null);
  const anim = useRef<GSAPTween>();
  const { contextSafe } = useGSAP({ scope: ref });

  useGSAP(() => {
    anim.current = gsap.to(".spin-button", {
      rotate: 180,
      x: 100,
      backgroundColor: "red",
      color: "white",
      paused: true,
    });
  }, []);

  const handleClick = contextSafe(() => {
    if (!anim.current) return;
    if (anim.current.paused()) return anim.current.paused(false);

    anim.current.reversed(!anim.current.reversed());
  });

  return (
    <div ref={ref}>
      <button
        type="button"
        className="spin-button px-6 py-4 bg-green-400 rounded"
        onClick={handleClick}
      >
        Animate me
      </button>
    </div>
  );
}
