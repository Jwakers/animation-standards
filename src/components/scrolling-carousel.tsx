"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollingCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);

  const getRandomImage = () => {
    const random = gsap.utils.random(320, 420, 1, true);
    const width = random();
    const height = random();

    return {
      width,
      height,
      url: `https://picsum.photos/${width}/${height}`,
    };
  };

  useGSAP(() => {
    gsap.to(containerRef.current, {
      xPercent: -100,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.4,
      },
    });
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="flex items-center gap-10 overflow-visible"
      >
        {[...Array(8)].map((_, i) => {
          const { width, height, url } = getRandomImage();
          return (
            <Image
              key={url + i}
              src={url}
              width={width}
              height={height}
              className="h-full w-full object-cover"
              alt=""
            />
          );
        })}
      </div>
    </>
  );
}
