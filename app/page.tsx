import Navigation from '@/components/navigation'
import Hero from '@/components/hero'
import About from '@/components/about'
import Experience from '@/components/experience'
import Projects from '@/components/projects'
import Skills from '@/components/skills'
import Contact from '@/components/contact'
import Footer from '@/components/footer'

export const metadata = {
  title: 'Siwar M\'SALLEM | Full-Stack Developer Student ',
  description: 'Full-stack engineer specializing in React, Node.js, and scalable web applications. Portfolio showcasing modern development expertise.',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  )
}
