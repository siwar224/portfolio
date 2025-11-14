'use client'

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 border-t border-border/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div>
              <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-2">About Me</p>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">Passionate About Crafting Digital Excellence</h2>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm a final-year Computer Engineering student based in Tunisia with a passion for building scalable, user-focused web applications. My expertise spans full-stack development, from crafting intuitive React interfaces to architecting robust backend systems with Node.js, Laravel, and Spring Boot.
              </p>
              <p>
                Throughout my professional journey, I've developed a deep appreciation for clean code, agile methodologies, and collaborative development. I thrive in environments that challenge me to learn, innovate, and deliver measurable results.
              </p>
              <p>
                Currently, I'm exploring DevOps practices, cloud deployment strategies, and emerging technologies that push the boundaries of web development. When I'm not coding, you'll find me contributing to open-source projects or diving into technical writing.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-lg border border-border/40 hover:border-accent/40 transition-colors bg-card/50">
              <h3 className="text-lg font-semibold text-foreground mb-3">Current Focus</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Full-stack web application development</li>
                <li>✓ Modern React.js patterns and optimization</li>
                <li>✓ Backend scalability and API design</li>
                <li>✓ DevOps and CI/CD implementation</li>
              </ul>
            </div>

          <div className="p-6 rounded-lg border border-border/40 hover:border-accent/40 transition-colors bg-card/50">
  <h3 className="text-lg font-semibold text-foreground mb-3">Quick Facts</h3>
  <ul className="space-y-2 text-muted-foreground">
    <li>📍 Tunisia & Italy resident</li>
    <li>🎓 Engineering student at Esprit</li>
    <li>📞 +39 333 467 0615 / +216 50763787</li>
    <li>🌐 3 Languages (English, French, Arabic)</li>
  </ul>
</div>
          </div>
        </div>
      </div>
    </section>
  )
}
