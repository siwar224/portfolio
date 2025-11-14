'use client'

import Image from 'next/image'
import { ExternalLink, Github } from 'lucide-react'

export default function Projects() {
  const projects = [
    {
      title: 'Youdube',
      subtitle: 'AI-Powered Video Dubbing Platform',
      description: 'Automated video dubbing into Arabic dialects with speech recognition, dialect translation, and synchronized AI voice generation.',
      image: '/video-dubbing-platform-interface.jpg',
      tags: ['React', 'Node.js', 'Flask', 'Python', 'MongoDB', 'AI'],
      links: {
        live: 'https://www.youdube.net',
        github: '#'
      }
    },
    {
      title: 'HR Management System',
      subtitle: 'Enterprise Automation Platform',
      description: 'Comprehensive HR solution centralizing employee management, leave requests, payroll, and organizational workflows with real-time reporting.',
      image: '/hr-dashboard-interface.jpg',
      tags: ['React', 'Laravel', 'MongoDB', 'Responsive'],
      links: {
        live: '#',
        github: '#'
      }
    },
    {
      title: 'AG-GRID-BUILDER',
      subtitle: 'Dynamic Table Customization Tool',
      description: 'Interactive interface for dynamic AG Grid table customization with advanced filtering, sorting, and conditional rendering capabilities.',
      image: '/data-table-builder-interface.jpg',
      tags: ['React', 'Redux', 'AG-Grid', 'Express', 'MongoDB'],
      links: {
        live: '#',
        github: '#'
      }
    },
    {
      title: 'EcoEvents',
      subtitle: 'Ecological Event Management Platform',
      description: 'Full-stack platform for managing ecological events with user roles, event calendar, partnerships, and resource management using Laravel 12.',
      image: '/event-management-dashboard.jpg',
      tags: ['Laravel', 'MySQL', 'Docker', 'SonarQube', 'Prometheus'],
      links: {
        live: '#',
        github: '#'
      }
    },
    {
      title: 'TheMenuFy',
      subtitle: 'Personalized Meal Ordering System',
      description: 'Intelligent meal ordering platform with AI chatbot recommendations, Stripe payment integration, and Docker-based CI/CD pipeline.',
      image: '/meal-ordering-application.jpg',
      tags: ['React', 'Node.js', 'Flask', 'Stripe', 'Docker', 'CI/CD'],
      links: {
        live: '#',
        github: '#'
      }
    },
    {
      title: 'DevOps Pipeline',
      subtitle: 'Automated Deployment & Monitoring',
      description: 'Complete CI/CD pipeline with Jenkins, SonarQube, Docker containerization, and Prometheus/Grafana monitoring for Spring Boot applications.',
      image: '/devops-dashboard-monitoring.jpg',
      tags: ['Jenkins', 'Docker', 'Prometheus', 'Grafana', 'SonarQube'],
      links: {
        live: '#',
        github: '#'
      }
    }
  ]

  return (
    <section id="projects" className="py-20 md:py-32 border-t border-border/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div>
            <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-2">Featured Work</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Notable Projects</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-lg border border-border/40 hover:border-accent/40 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-muted">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-6 bg-card/50">
                  <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-accent transition-colors">{project.title}</h3>
                  <p className="text-sm text-accent font-semibold mb-3">{project.subtitle}</p>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="px-2 py-1 text-xs bg-accent/10 text-accent rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-1 text-xs text-muted-foreground">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    {project.links.live !== '#' && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent/70 transition-colors"
                      >
                        <ExternalLink size={16} /> Live
                      </a>
                    )}
                    {project.links.github !== '#' && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent/70 transition-colors"
                      >
                        <Github size={16} /> Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
