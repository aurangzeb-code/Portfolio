import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import SmoothScroll from "@/components/SmoothScroll";
import Intro from "@/components/Intro";

// The home page = smooth scroll + intro screen + all sections in order
export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Intro>
        <main>
          <Navbar />
          <Hero />
          <Services />
          <Projects />
          <About />
          <Contact />
        </main>
      </Intro>
    </>
  );
}