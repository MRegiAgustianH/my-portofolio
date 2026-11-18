import Loader from "@/components/Loader";
import Navigation from "@/components/Navigation";
import Activity from "@/components/sections/Activity";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Profile from "@/components/sections/Profile";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";

export default function Home() {
  return (
    <>
      <Loader />
      <main>
        <Hero />
        <Profile />
        <Skills />
        <Projects />
        <Activity />
        <Contact />
      </main>
      <Navigation />
    </>
  );
}
