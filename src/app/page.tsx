"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Container from "@/components/container";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: containerRef });
  const title = "Animation standards";

  useGSAP(
    () => {
      gsap.to(".letter", {
        opacity: 1,
        scale: 1,
        stagger: 0.04,
        y: 0,
      });

      gsap.to(".letter", {
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 20%",
          end: "bottom top",
          scrub: 0.5,
        },
        scale: 0,
        x: "-40",
        stagger: 0.1,
      });
    },
    { scope: containerRef }
  );

  const handleMouseEnter = contextSafe((e) => {
    gsap.to(e.target, {
      rotateY: 180,
    });
  });

  const handleMouseLeave = contextSafe((e) => {
    gsap.to(e.target, {
      rotateY: 0,
    });
  });

  return (
    <main className="min-h-screen">
      <div
        ref={containerRef}
        className="relative h-screen flex flex-col justify-center items-center"
      >
        <Container>
          <h1 className="text-8xl font-medium" ref={headingRef}>
            {title.split("").map((letter, i) => (
              <span
                key={i}
                className={clsx(
                  "letter inline-block opacity-0 -translate-y-10",
                  letter === " " && "w-6"
                )}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {letter}
              </span>
            ))}
          </h1>
        </Container>
      </div>
    </main>
  );
}
