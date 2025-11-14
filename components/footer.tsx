'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/40 py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Siwar M'SALLEM. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Crafted with <span className="text-accent">♥</span> using React & Next.js
          </p>
        </div>
      </div>
    </footer>
  )
}
