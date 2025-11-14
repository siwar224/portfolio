'use client'

import Image from 'next/image'
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated background elements */}
      <div className="absolute top-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute bottom-40 -right-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl opacity-30 animate-blob animation-delay-4"></div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <p className="text-accent font-semibold text-sm tracking-widest uppercase">Welcome to my portfolio</p>
             <h1 className="text-5xl md:text-7xl font-bold text-foreground text-pretty leading-tight">
Final-Year Engineering Student</h1>

              <p className="text-xl text-muted-foreground max-w-lg">
                I craft scalable web applications with modern technologies, delivering engaging digital experiences that drive business impact.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                View My Work <ArrowRight size={18} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border hover:bg-accent/10 text-foreground rounded-lg font-semibold transition-colors"
              >
                Get In Touch
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              <a
                href="https://github.com/siwar224"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-border hover:bg-accent/10 text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/siwarmsellem"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-border hover:bg-accent/10 text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:siwarmsellem@gmail.com"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-border hover:bg-accent/10 text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-border/40 shadow-2xl hover:shadow-accent/20 transition-shadow duration-500 animate-float">
              <Image
                src="/images/design-mode/profile%20%282%29.png"
                alt="Siwar M'SALLEM"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
