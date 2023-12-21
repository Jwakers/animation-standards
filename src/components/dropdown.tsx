"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const tl = useRef<GSAPTimeline>();
  const listItems = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];

  const handleClick = () => setIsOpen(!isOpen);

  useGSAP(() => {
    tl.current = gsap.timeline({ paused: true });
    tl.current
      .to(".dropdown-list", {
        height: "auto",
        autoAlpha: 1,
      })
      .to(
        ".dropdown-list-item",
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.1,
        },
        "<0.2",
      );

    gsap.set(".dropdown-list-item", {
      y: -10,
      opacity: 0,
    });
  }, []);

  useGSAP(
    () => {
      if (!tl.current) return;
      if (isOpen) tl.current.play();
      else tl.current.reverse();
    },
    { dependencies: [isOpen], scope: container },
  );

  return (
    <div className="relative" ref={container}>
      <button
        type="button"
        className="rounded border p-4"
        onClick={handleClick}
      >
        Simple menu
      </button>
      <ul className="dropdown-list absolute bottom-0 h-0 w-full translate-y-full space-y-2 rounded border bg-white p-4 opacity-0">
        {listItems.map((item, i) => (
          <li className="dropdown-list-item" key={`dropdown-item-${i}`}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
