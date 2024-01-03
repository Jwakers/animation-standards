import Container from "@/components/container";
import Dropdown from "@/components/dropdown";
import RippleButton from "@/components/ripple-button";

export default function ExamplesPage() {
  return (
    <main className="min-h-screen">
      <Container className="flex flex-col items-start gap-y-10 py-24">
        <h1 className="text-8xl">GSAP Examples</h1>

        <h2 className="text-5xl">Buttons</h2>
        <RippleButton />

        <h2 className="text-5xl">Menus</h2>
        <Dropdown />

        <h2 className="text-5xl">Text</h2>
      </Container>
    </main>
  );
}
