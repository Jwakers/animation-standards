"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function GrowingImage() {
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleImageload = () => {
    ScrollTrigger.refresh(true);
  };

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        scrub: 1,
        start: "center center",
        end: "+=1000",
        pin: true,
      },
    });

    tl.to(imageRef.current, {
      width: window.innerWidth,
      height: window.innerHeight,
      duration: 2,
    })
      .set(".content", { display: "block" })
      .to(imageRef.current, {
        scale: 1.2,
        filter: "blur(10px)",
        duration: 2,
      })
      .to(
        imageRef.current,
        {
          opacity: 0,
          duration: 1,
        },
        ">-1",
      )
      .from(
        ".content",
        {
          scale: 1.8,
          filter: "blur(10px)",
          duration: 2,
        },
        ">-1",
      );
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="relative my-20 flex w-full items-center justify-center"
      >
        <div className="content absolute hidden text-center">
          <h2 className="max-w-[800px] text-balance text-5xl text-blue-800 dark:text-white">
            All animations can work in reverse too
            <br />
            Scroll back up
          </h2>
        </div>
        <Image
          ref={imageRef}
          className="block object-cover"
          src="https://picsum.photos/1200/900"
          alt=""
          width={600}
          height={300}
          onLoad={handleImageload}
        />
      </div>
      <div className="py-80"></div>
      <div className="py-80"></div>
      <div className="py-80"></div>
      <div className="py-80"></div>
    </>
  );
}
