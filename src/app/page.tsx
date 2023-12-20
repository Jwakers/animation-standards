"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Container from "@/components/container";
import Syntax from "@/components/syntax";

export default function Home() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    gsap.from(headingRef.current, {
      opacity: 0,
      scale: 1.2,
    });
  }, []);

  return (
    <main className="min-h-screen">
      <div className="relative h-screen flex flex-col justify-center items-center">
        <Container>
          <h1 className="text-8xl font-medium" ref={headingRef}>
            Animation Standards
          </h1>
        </Container>
      </div>
      <Container className="py-24 flex flex-col items-start gap-y-10">
        <h2 className="text-5xl">
          Animating with{" "}
          <a href="https://gsap.com/docs/v3/" target="_blank">
            GSAP
          </a>
        </h2>
        <p>
          GSAP is a animation library that can be used for a variety of simpe to
          complex web animations. The syntax is simple to understand as well as
          being easily extensible. GSAP also has plugins to extend functionality
          as well as keep bundle size down.
        </p>
        <p>
          Animating can be as simple as using three methods on the{" "}
          <code>gsap</code> object: <code>gsap.to()</code>{" "}
          <code>gsap.from()</code> and <code>gsap.fromTo()</code>
        </p>
        <p>
          The <code>gsap.to()</code> method takes a query string, HTML element
          or an array of elements and will animation from what is set on the
          element/s <strong>TO</strong> what is defined in the second argument
          properties. For example:
        </p>
        <Syntax language="javascript">{`
  gsap.to(".example", {
    x: 100,
    color: blue,
  });
        `}</Syntax>
        <p>
          This will take the element/s and animate change the colour to blue and
          move them accross the x axis by 100 pixels.
        </p>
        <p>
          If targeting multiple elements, you can use the <code>stagger</code>{" "}
          property to space out their animations.
        </p>
        <Syntax language="javascript">{`
  gsap.to(".example", {
    x: 100,
    color: blue,
    stagger: 0.5
  });
        `}</Syntax>
        <p>
          The <code>gsap.from</code> method is very similar but in reverse,
          instead it will animate from the defined properted in the method, to
          what the element currenty has set.
        </p>
        <p>
          lastly <code>gsap.fromTo()</code>, will take two sets of animation
          properties for more granular control animating from the frst set to
          the second, for example:
        </p>
        <Syntax language="javascript">{`
  gsap.fromTo(".example", {
    scale: 0.5,
  }, {
    scale: 1
  });
        `}</Syntax>
        <p>
          One last basic but important method on gsap is
          <code>gsap.set()</code>. Again takes the same arguments as{" "}
          <code>.to()</code> or <code>.from()</code> however will not transition
          these animations but simply set them as the starting styles. This is
          very useful for rigging an animation that is dynamially triggered.
        </p>
        <Syntax language="javascript">{`
  gsap.set(".example", {
    opacty: 0,
  });
        `}</Syntax>

        <SpinButton />
      </Container>
    </main>
  );
}

function SpinButton() {
  let animation: undefined | gsap.core.Tween;

  useGSAP(() => {
    animation = gsap.to(".spin-button", {
      rotate: 180,
      x: 100,
      backgroundColor: "red",
      color: "white",
      paused: true,
    });
  }, []);

  const handleClick = () => {
    if (!animation) return;
    if (animation.progress() === 1) return animation.reverse();
    animation.play();
  };

  return (
    <button
      type="button"
      className="spin-button px-6 py-4 bg-green-400 rounded"
      onClick={handleClick}
    >
      Animate me
    </button>
  );
}
