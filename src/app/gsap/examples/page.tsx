import Container from "@/components/container";
import Dropdown from "@/components/dropdown";
import SpinButton from "@/components/spin-button";

export default function ExamplesPage() {
  return (
    <main className="min-h-screen">
      <Container className="flex flex-col items-start gap-y-10 py-24">
        <h1 className="text-8xl">GSAP Examples</h1>

        <h2 className="text-5xl">Animating buttons</h2>
        <SpinButton />

        <h2 className="text-5xl">Animating common components</h2>
        <Dropdown />
      </Container>
    </main>
  );
}
