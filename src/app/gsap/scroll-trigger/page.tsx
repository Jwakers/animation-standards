import Container from "@/components/container";
import { GrowingImage } from "@/components/growing-image";
import ScrollingCarousel from "@/components/scrolling-carousel";
import Syntax from "@/components/syntax";

export default function ScrollTriggerPage() {
  return (
    <main className="min-h-screen">
      <Container className="flex flex-col items-start gap-y-10 py-24">
        <h1 className="text-8xl">
          <a
            href="https://gsap.com/docs/v3/Plugins/ScrollTrigger/"
            target="_blank"
          >
            Scroll trigger
          </a>
        </h1>

        <p>
          Scroll trigger allows us to hook animations up to scroll positions.
          The most simple application for this would be to just trigger an
          animation when it enters the viewport. It can be used to
          &quot;scrub&quot; complex timelines.
        </p>

        <p>
          Here is an example of the scroll trigger code used to animate the
          carousel below:
        </p>

        <Syntax language="javascript">{`gsap.to(containerRef.current, {
    xPercent: -100,
    scrollTrigger: {
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: 1.4,
    },
  });`}</Syntax>

        <p>
          <code>trigger</code>: The element used to calculate the start and end
          positions. Does not need to be the elemnet being animated.
          <br />
          <code>start</code>: Start the animation when the &quot;top&quot; of
          the element hits the &quot;bottom&quot; of the page. <br />
          <code>end</code>: End the animation when the &quot;bottom&quot; of the
          element hits the &quot;top&quot; of the page. <br />
          <code>scrub</code>: Setting scrub to an number delays the animations
          meaning it takes 1.4s to catch up to the scroll position, smoothing
          out animations. True will link the animation directly to the scrollbar
          movement.
        </p>

        <h2 className="text-5xl">Carousel</h2>
        <ScrollingCarousel />

        <h2 className="text-5xl">Growing image</h2>
      </Container>
      <GrowingImage />
    </main>
  );
}
