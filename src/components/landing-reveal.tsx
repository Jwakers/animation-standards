"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LandingReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const master = gsap.timeline();

      function counter(duration: number) {
        return gsap.to(".loader-percent", {
          innerText: 100,
          snap: "innerText",
          duration,
          ease: "power2.out",
        });
      }

      function loader() {
        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set(".loader-wrapper", { display: "none" });
          },
        });
        tl.to(".circle-moon-move", {
          xPercent: 20,
          yPercent: -20,
          ease: "power4.out",
          duration: 1,
        })
          .to(".circle-moon-move", {
            xPercent: 100,
            yPercent: -100,
            ease: "power4.out",
            duration: 1,
          })
          .to(
            ".panel-orange",
            {
              height: "100%",
              duration: 1,
              ease: "power4.out",
            },
            "<+=0.1",
          )
          .to(
            ".circle-fill-blue",
            {
              height: "50%",
              duration: 1,
              ease: "power4.out",
            },
            "<",
          )
          .to(".circle-fill-blue", {
            height: "100%",
            duration: 1,
            ease: "power4.out",
          })
          .to(
            ".panel-blue",
            {
              height: "100%",
              duration: 1,
              ease: "power2.out",
            },
            ">-0.7",
          )
          .to(
            ".circle-fill-yellow",
            {
              height: "100%",
              duration: 1,
              ease: "power4.out",
            },
            "<",
          )
          .to(".circle-mask", {
            scale: 0.9,
          })
          .to(".circle-mask", {
            scale: 3,
            duration: 1,
          })
          .to(
            ".circle-grow-final",
            {
              scale: 3,
              duration: 1.5,
            },
            "<",
          )
          .to(
            ".loader-wrapper",
            {
              opacity: 0,
            },
            "<",
          );

        return tl;
      }

      function header() {
        const tl = gsap.timeline();

        const getIndexMultiple = (i: number) => (i + 1) * 20;

        tl.fromTo(
          ".header-letter",
          {
            opacity: 0,
            x: getIndexMultiple,
            y: getIndexMultiple,
            rotate: getIndexMultiple,
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            rotate: 0,
            duration: 2,
            stagger: 0.04,
            ease: "elastic.out(0.8,0.3)",
          },
        );
        return tl;
      }

      master.add(counter(loader().totalDuration())).add(header(), ">-1.5");
      console.log(master);
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef}>
      <div className="flex h-screen w-screen items-center justify-center">
        <h1 className="text-8xl font-bold tracking-wider">
          {"Animation".split("").map((letter, i) => (
            <span className="header-letter inline-block" key={letter + i}>
              {letter}
            </span>
          ))}
        </h1>
      </div>
      <div className="loader-wrapper fixed inset-0 z-50 h-screen w-screen bg-amber-400 dark:bg-slate-400">
        <div className="panel-orange absolute bottom-0 w-full bg-amber-500 dark:bg-slate-500"></div>
        <div className="panel-blue absolute bottom-0 w-full bg-blue-600 dark:bg-slate-100"></div>
        <div className="circle-wrapper relative flex h-full w-full items-center justify-center">
          <div className="circle-mask relative h-[80vh] w-[80vh] [clip-path:circle(49%)] [transform:translateZ(0)]">
            <div className="circle-fill-orange absolute bottom-0 h-full w-full bg-amber-500 dark:bg-slate-500"></div>
            <div className="circle-fill-blue absolute top-0 w-full bg-blue-600 dark:bg-slate-100"></div>
            <div className="circle-fill-yellow absolute bottom-0 w-full bg-yellow-600 dark:bg-slate-600"></div>
            <div className="circle-moon-move relative h-full w-full rounded-full bg-amber-400 dark:bg-slate-400"></div>
          </div>
          <div className="loader absolute bottom-10 left-10 text-8xl font-bold text-slate-950/70 mix-blend-overlay dark:text-white">
            <span className="loader-percent">0</span>%
          </div>
          <div className="circle-grow-final absolute bottom-1/2 left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 scale-0 bg-white [clip-path:circle(49%)] dark:bg-slate-900"></div>
        </div>
      </div>
    </div>
  );
}
