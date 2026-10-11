import { ArrowUp, Mail, Terminal } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'
import { PERSONAL_INFO } from '../data/portfolioData'

export default function Footer({ onOpenTerminal }) {
  const scrollToTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="portfolio-footer">
      <div className="footer-top-row">
        <div className="footer-brand">
          <div className="footer-logo font-mono">
            <span>&lt;PP/&gt;</span>
          </div>
          <p className="footer-tagline">
            Designing and engineering digital products with relentless attention to detail.
          </p>
        </div>

        <div className="footer-nav-col">
          <span className="footer-heading font-mono">SECTIONS</span>
          <div className="footer-links">
            <a href="#about" className="footer-link">About</a>
            <a href="#work" className="footer-link">Selected Work</a>
            <a href="#experience" className="footer-link">Experience</a>
            <a href="#skills" className="footer-link">Technical Stack</a>
            <a href="#contact" className="footer-link">Get in Touch</a>
          </div>
        </div>

        <div className="footer-social-col">
          <span className="footer-heading font-mono">CHANNELS</span>
          <div className="footer-links">
            <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="footer-link">
              <GithubIcon size={14} />
              <span>GitHub</span>
            </a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="footer-link">
              <LinkedinIcon size={14} />
              <span>LinkedIn</span>
            </a>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="footer-link">
              <Mail size={14} />
              <span>Email</span>
            </a>
            <button onClick={onOpenTerminal} className="footer-link terminal-trigger-btn font-mono">
              <Terminal size={14} />
              <span>Interactive CLI</span>
            </button>
          </div>
        </div>
      </div>

      <div className="footer-bottom-row">
        <p className="footer-copyright font-mono">
          &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. Crafted with precision & clean code.
        </p>

        <div className="footer-badge font-mono">
          <span className="badge-dot" />
          <span>React 19 • Motion • Vite</span>
        </div>

        <a href="#" onClick={scrollToTop} className="footer-back-to-top font-mono" aria-label="Scroll back to top">
          <span>BACK TO TOP</span>
          <ArrowUp size={14} />
        </a>
      </div>
    </footer>
  )
}
