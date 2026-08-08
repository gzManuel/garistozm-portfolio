import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Projects } from '@/components/Projects';
import { Signals } from '@/components/Signals';
import { Skills } from '@/components/Skills';
import { Timeline } from '@/components/Timeline';

export default function Home() {
  return (
    <>
      <Header />
      {/*
        tabIndex={-1} makes the skip-link target focusable, so activating the
        link moves focus here rather than only scrolling — otherwise the next
        Tab sends the user straight back into the header.
      */}
      <main id="top" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Signals />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
