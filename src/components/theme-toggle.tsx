"use client";

import { useTheme } from "next-themes";
import { SunIcon } from "@heroicons/react/24/outline";
import { MoonIcon } from "@heroicons/react/24/solid";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function ThemeToggle() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [toggle, setToggle] = useState<typeof theme | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!toggle) return;

      const tl = gsap.timeline();
      tl.fromTo(
        ".step",
        {
          height: 0,
        },
        {
          height: "100%",
          stagger: 0.1,
          duration: 0.3,
          onComplete: () => {
            if (!toggle) return;
            setTheme(toggle);
          },
        },
      )
        .fromTo(
          ".step",
          {
            yPercent: 0,
          },
          {
            yPercent: 100,
            stagger: 0.1,
            duration: 0.3,
          },
        )
        .fromTo(
          ".step",
          {
            backgroundColor:
              theme === "dark" ? "rgb(255, 255, 255)" : "rgb(15, 23, 42)",
          },
          {
            backgroundColor:
              theme === "dark" ? "rgb(15, 23, 42)" : "rgb(255, 255, 255)",
            duration: tl.totalDuration(),
          },
          "0",
        );
    },
    { dependencies: [toggle], scope: containerRef },
  );

  const renderThemeToggle = () => {
    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <SunIcon
          className="h-6 w-6 text-amber-500 "
          role="button"
          onClick={() => setToggle("light")}
        />
      );
    } else {
      return (
        <MoonIcon
          className="h-6 w-6 text-gray-900 "
          role="button"
          onClick={() => setToggle("dark")}
        />
      );
    }
  };

  return (
    <div ref={containerRef}>
      {renderThemeToggle()}
      <div className="stairs pointer-events-none fixed inset-0 z-50 grid grid-cols-5">
        <div className="step h-0" />
        <div className="step h-0" />
        <div className="step h-0" />
        <div className="step h-0" />
        <div className="step h-0" />
      </div>
    </div>
  );
}
