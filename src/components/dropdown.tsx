"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const listItems = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];

  const handleClick = () => setIsOpen(!isOpen);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.to(".dropdown-list", {
        height: isOpen ? "auto" : 0,
        autoAlpha: isOpen ? 1 : 0,
      }).to(
        ".dropdown-list-item",
        {
          autoAlpha: isOpen ? 1 : 0,
          y: isOpen ? 0 : -10,
          stagger: isOpen ? 0.1 : -0.05,
        },
        "-0.1"
      );
    },
    { dependencies: [isOpen], scope: container }
  );

  return (
    <div className="relative" ref={container}>
      <button
        type="button"
        className="p-4 border rounded"
        onClick={handleClick}
      >
        Simple menu
      </button>
      <ul className="dropdown-list p-4 space-y-2 absolute bottom-0 w-full border rounded translate-y-full bg-white height-0 opacity-0">
        {listItems.map((item, i) => (
          <li className="dropdown-list-item" key={`dropdown-item-${i}`}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
