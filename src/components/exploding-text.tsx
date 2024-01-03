"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export default function ExplodingText() {
  const ref = useRef(null);
  const anim = useRef<gsap.core.Timeline>();
  const text = "Exploding Text";
  const random = gsap.utils.random(-30, 30, 0.1, true);

  useGSAP(
    () => {
      anim.current = gsap.timeline({ paused: true });
      anim.current.to(".letter", {
        y: () => random(),
        rotate: () => random(),
        color: "rgb(30 64 175)",
      });
    },
    { scope: ref },
  );

  const handleMouseEnter = () => {
    anim.current?.play();
  };

  const handleMouseLeave = () => {
    anim.current?.reverse();
  };

  return (
    <div
      ref={ref}
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
