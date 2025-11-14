'use client'

export default function Experience() {
  const experiences = [
    {
      title: 'Full-Stack Developer Intern',
      company: 'Tradly',
      location: 'Tunis, Tunisia',
      period: 'Jul 2025 – Aug 2025',
      description: 'Developed Youdube, an innovative web application automating video dubbing into Arabic dialects. Built responsive frontend with React.js (Vite) and Tailwind CSS, integrated Python Flask backend for audio processing, speech recognition, and AI voice generation.',
      tags: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Python', 'Flask', 'Scrum'],
    },
    {
      title: 'Web Development Intern',
      company: 'Telnet',
      location: 'Tunis, Tunisia',
      period: 'Jul 2024 – Aug 2025',
      description: 'Designed and developed a comprehensive HR management system automating key business processes. Implemented responsive user interfaces with React.js, developed robust backend services with Laravel, and optimized MongoDB database performance.',
      tags: ['React.js', 'Laravel', 'MongoDB'],
    },
    {
      title: 'Web Development Intern',
      company: 'StartNow',
      location: 'Ariana, Tunisia',
      period: 'Feb 2023 – Jun 2023',
      description: 'Created AG-GRID-BUILDER, a dynamic web interface for customizing data tables with advanced functionalities. Developed REST APIs with Node.js/Express, managed global state with Redux, and collaborated within Agile teams.',
      tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux'],
    },
  ]

  return (
    <section id="experience" className="py-20 md:py-32 border-t border-border/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div>
            <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-2">Professional Journey</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Work Experience</h2>
          </div>

          <div className="space-y-6">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className="group relative p-6 md:p-8 rounded-lg border border-border/40 hover:border-accent/40 bg-card/50 hover:bg-card/70 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors">{exp.title}</h3>
                    <p className="text-accent font-semibold">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">{exp.location}</p>
                  </div>
                  <p className="text-sm text-muted-foreground whitespace-nowrap">{exp.period}</p>
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-4">{exp.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
