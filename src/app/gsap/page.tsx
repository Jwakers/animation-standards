import Container from "@/components/container";
import Dropdown from "@/components/dropdown";
import SpinButton from "@/components/spin-button";
import Syntax from "@/components/syntax";

export default function GsapPage() {
  return (
    <main className="min-h-screen">
      <Container className="py-24 flex flex-col items-start gap-y-10">
        <h1 className="text-8xl">
          Animating with{" "}
          <a href="https://gsap.com/docs/v3/" target="_blank">
            GSAP
          </a>
        </h1>
        <p>
          GSAP is a framework agnostic Javav Script animation library that can
          be used for a variety of simpe to complex web animations. The syntax
          is simple to understand as well as being easily extensible. GSAP also
          has plugins to extend functionality as well as keep bundle size down.
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
        <h2 className="text-5xl">Examples</h2>
        <SpinButton />

        <Dropdown />

        <h2>GSAP with react</h2>
      </Container>
    </main>
  );
}
