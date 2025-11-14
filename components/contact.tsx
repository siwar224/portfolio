'use client'

import { Mail, Linkedin, Github, Send } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-32 border-t border-border/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div>
            <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-2">Get In Touch</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Let's Connect</h2>
            <p className="text-lg text-muted-foreground mt-4">
              I'm always interested in hearing about new projects and opportunities. Feel free to reach out!
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-3 gap-6 py-8">
            <a
              href="mailto:siwarmsellem@gmail.com"
              className="group p-6 rounded-lg border border-border/40 hover:border-accent/40 bg-card/50 hover:bg-card/70 transition-all duration-300"
            >
              <div className="flex justify-center mb-3">
                <Mail size={32} className="text-accent group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Email</h3>
              <p className="text-sm text-muted-foreground">siwarmsellem@gmail.com</p>
            </a>

            <a
              href="https://linkedin.com/in/siwarmsellem"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-lg border border-border/40 hover:border-accent/40 bg-card/50 hover:bg-card/70 transition-all duration-300"
            >
              <div className="flex justify-center mb-3">
                <Linkedin size={32} className="text-accent group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">LinkedIn</h3>
              <p className="text-sm text-muted-foreground">siwarmsellem</p>
            </a>

            <a
              href="https://github.com/siwar224"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-lg border border-border/40 hover:border-accent/40 bg-card/50 hover:bg-card/70 transition-all duration-300"
            >
              <div className="flex justify-center mb-3">
                <Github size={32} className="text-accent group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">GitHub</h3>
              <p className="text-sm text-muted-foreground">siwar224</p>
            </a>
          </div>

          {/* CTA Button */}
          <a
            href="mailto:siwarmsellem@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Send Me an Email <Send size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}
