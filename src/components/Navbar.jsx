import { useState, useEffect } from 'react'
import { Terminal as TerminalIcon, FileText, Menu, X, ArrowUpRight } from 'lucide-react'

export default function Navbar({ onOpenTerminal, onOpenResume }) {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    const sections = ['about', 'work', 'experience', 'skills', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.25, rootMargin: '-60px 0px -40% 0px' }
    )

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Work', href: '#work', id: 'work' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ]

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToTop = (e) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo */}
          <a href="#" className="navbar-logo" onClick={scrollToTop} aria-label="Prasad Patil Home">
            <span className="logo-symbol">&lt;</span>
            <span className="logo-letters">PP</span>
            <span className="logo-symbol">/&gt;</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="navbar-nav" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`navbar-link ${activeSection === link.id ? 'active' : ''}`}
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {link.label}
                {activeSection === link.id && <span className="active-pill" />}
              </a>
            ))}
          </nav>

          {/* Actions: Terminal & Resume */}
          <div className="navbar-actions">
            <button
              onClick={onOpenTerminal}
              className="nav-btn nav-btn-terminal"
              aria-label="Open developer terminal CLI"
              title="Open interactive terminal"
            >
              <TerminalIcon size={15} />
              <span className="nav-btn-text">Terminal</span>
              <kbd className="nav-kbd">~</kbd>
            </button>

            <button
              onClick={onOpenResume}
              className="nav-btn nav-btn-resume"
              aria-label="View and download resume"
            >
              <FileText size={15} />
              <span className="nav-btn-text">Resume</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-toggle"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-menu-backdrop" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <span className="mobile-menu-title">Navigation</span>
              <button
                className="mobile-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="mobile-nav-links">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  <span>{link.label}</span>
                  <ArrowUpRight size={16} />
                </a>
              ))}
            </nav>

            <div className="mobile-actions">
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenTerminal()
                }}
                className="mobile-action-btn terminal-btn"
              >
                <TerminalIcon size={18} />
                <span>Launch Interactive Terminal</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenResume()
                }}
                className="mobile-action-btn resume-btn"
              >
                <FileText size={18} />
                <span>View & Download Resume</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
