import Container from "@/components/container";
import Syntax from "@/components/syntax";

export default function GsapPage() {
  return (
    <main className="min-h-screen">
      <Container className="flex flex-col items-start gap-y-10 py-24">
        <h1 className="text-8xl">
          Animating with{" "}
          <a
            href="https://gsap.com/docs/v3/"
            target="_blank"
            className="inline-link"
          >
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
          One last basic but important method on gsap is <code>gsap.set()</code>
          . Again takes the same arguments as <code>.to()</code> or{" "}
          <code>.from()</code> however will not transition these animations but
          simply set them as the starting styles. This is very useful for
          rigging an animation that is dynamially triggered.
        </p>
        <Syntax language="javascript">{`
    gsap.set(".example", {
      opacty: 0,
    });
          `}</Syntax>

        <h2 className="text-5xl">
          <a
            href="https://gsap.com/docs/v3/GSAP/gsap.timeline()"
            target="_blank"
            className="inline-link"
          >
            Timelines
          </a>
        </h2>
        <p>
          <code>gsap.timeline()</code> can be used to make very eloborate
          sequences of animations. Using this you can await other animations to
          finish before starting the next for example. The syntax for this
          follows a very similar pattern to the previous methods with the
          addition of a new argument to define the order each animation should
          run.
        </p>

        <Syntax language="javascript">{`
const tl = gsap.timeline();
tl.to(
    ".dropdown-list",
    {
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
          `}</Syntax>
        <p>
          Here we are chaing two animations together. The thired argument in the
          second use of the <code>.to()</code> method says{" "}
          <em>
            play this animation 0.2 seconds after the start of the one
            precending it.
          </em>{" "}
          <br />
          More information about timeline positioning can be found{" "}
          <a
            href="https://gsap.com/docs/v3/GSAP/gsap.timeline()#positioning-animations-in-a-timeline"
            target="_blank"
            className="inline-link"
          >
            here
          </a>
          .
        </p>

        <h2 className="text-5xl">GSAP with react</h2>
        <p>
          There are a few considerations when using{" "}
          <a
            href="https://gsap.com/resources/React"
            target="_blank"
            className="inline-link"
          >
            GSAP with react.
          </a>
        </p>
        <blockquote className="border-l-2 border-gray-200 pl-4">
          <code>useGSAP()</code> is a drop-in replacement for{" "}
          <code>useEffect()</code> or <code>useLayoutEffect()</code> that
          automatically handles cleanup using <code>gsap.context()</code>.
          Cleanup is important in React and Context makes it simple.
        </blockquote>
        <p>
          Be sure to use the <code>useGSAP()</code> hook in lieu of{" "}
          <code>useEffect()</code> whenever working with animaitons.
        </p>
        <Syntax language="javascript">{`
useGSAP(() => {
    // gsap code here...
    gsap.to(".box", {x: endX}); // <-- automatically reverted
  
  }, { scope: container }); // <-- scope is for selector text (optional)
          `}</Syntax>

        <h2 className="text-5xl">Static site generation</h2>
        <p>
          Frameworks that use static site generation such as Next.js will often
          display an element pre animation before the animation code has time to
          run. To fix this issue its best to have the initial state of the
          animation styled on the component and use <code>gsap.to()</code> to
          handle the animation.
        </p>

        <Syntax language="javascript">{`
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
            <li className="dropdown-list-item" key={\`dropdown-item-\${i}\`}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }
          `}</Syntax>
        <p>
          The timeline is defined in the <code>useGSAP()</code> hook and stored
          in a ref. This prevents it being redefined every re-render and
          automatically handles cleanup.
          <br />
          The scope is defined in the hook so we can easily use query selectors
          as apposed to defining refs for all the components we need to animate.
          <br />
          <code>gsap.set()</code> is also used here to define the starting point
          of the animation.
        </p>
      </Container>
    </main>
  );
}
