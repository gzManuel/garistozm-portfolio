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
      <main id="top">
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
