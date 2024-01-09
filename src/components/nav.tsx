"use client";

import Link from "next/link";
import Container from "./container";
import { useRef } from "react";
import { gsap } from "gsap";

export default function Nav() {
  const container = useRef(null);

  const handleMouseEnter = (event: React.MouseEvent) => {
    const { target } = event;
    const { offsetWidth, offsetLeft } = target as HTMLLIElement;
    gsap.to(".rule", {
      width: offsetWidth,
      x: offsetLeft,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(".rule", {
      width: 0,
    });
  };

  return (
    <nav ref={container}>
      <Container className="absolute inset-x-0 top-0">
        <ul className="flex gap-10 py-6">
          <li
            className="text-xl"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link href="/">Home</Link>
          </li>
          <li
            className="text-xl"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link href="/gsap">GSAP</Link>
          </li>
          <li
            className="text-xl"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link href="/gsap/examples">Examples</Link>
          </li>
          <li
            className="text-xl"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link href="/gsap/scroll-trigger">Scroll trigger</Link>
          </li>
        </ul>
        <hr className="rule absolute bottom-0 w-0 border-b border-blue-800" />
      </Container>
    </nav>
  );
}
