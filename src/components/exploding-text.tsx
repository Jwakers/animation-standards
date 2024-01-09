"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { useTheme } from "next-themes";

export default function ExplodingText() {
  const containerRef = useRef(null);
  const anim = useRef<gsap.core.Timeline>();
  const text = "Exploding Text";
  const random = gsap.utils.random(-30, 30, 0.1, true);
  const { theme } = useTheme();
  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleMouseEnter = contextSafe(() => {
    gsap.to(".letter", {
      y: () => random(),
      rotate: () => random(),
      color: theme === "dark" ? "#fbbf24" : "rgb(30 64 175)",
    });
  }) as React.MouseEventHandler<HTMLDivElement>;

  const handleMouseLeave = contextSafe(() => {
    gsap.to(".letter", {
      y: 0,
      rotate: 0,
      color: theme === "dark" ? "#fff" : "rgb(15, 23, 42)",
      clearProps: "color",
    });
  }) as React.MouseEventHandler<HTMLDivElement>;

  return (
    <div
      ref={containerRef}
      className="text-5xl font-bold"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text.split("").map((letter, i) => (
        <span key={i} className="letter inline-block">
          {letter}
        </span>
      ))}
    </div>
  );
}
