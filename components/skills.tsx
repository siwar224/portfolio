'use client'

export default function Skills() {
  const skillCategories = [
    {
      title: 'Frontend',
      skills: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux', 'Angular', 'Bootstrap']
    },
    {
      title: 'Backend',
      skills: ['Node.js', 'Express.js', 'Laravel', 'Spring Boot', 'Python', 'Flask', 'REST APIs']
    },
    {
      title: 'Databases',
      skills: ['MongoDB', 'MySQL', 'SQL Server' ]
    },
    {
      title: 'DevOps & Tools',
      skills: ['Docker', 'Jenkins', 'GitHub Actions', 'SonarQube', 'Prometheus', 'Grafana', 'Git']
    },
    {
      title: 'Languages',
      skills: ['JavaScript', 'Python', 'Java', 'C++', 'SQL']
    },
    {
      title: 'Methodologies',
      skills: ['Agile', 'Scrum', 'CI/CD']
    }
  ]

  return (
    <section id="skills" className="py-20 md:py-32 border-t border-border/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div>
            <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-2">Expertise</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Technical Skills</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg border border-border/40 hover:border-accent/40 bg-card/50 hover:bg-card/70 transition-all duration-300 group"
              >
                <h3 className="text-lg font-bold text-foreground mb-4 group-hover:text-accent transition-colors">
                  {category.title}
                </h3>
                <div className="space-y-2">
                  {category.skills.map((skill, skillIdx) => (
                    <div key={skillIdx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                        {skill}
                      </span>
                    </div>
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
