import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [time, setTime] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState('status') // 'status' or 'console'
  const [terminalInput, setTerminalInput] = useState('')
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'output', text: 'SYSTEM_ACTIVE // Terminal interface initialised.' },
    { type: 'output', text: 'Type "help" to view list of available commands.' }
  ])

  const terminalEndRef = useRef(null)

  // System Clock
  useEffect(() => {
    const updateClock = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }
      setTime(new Intl.DateTimeFormat('en-US', options).format(new Date()))
    }
    updateClock()
    const timer = setInterval(updateClock, 1000)
    return () => clearInterval(timer)
  }, [])

  // Global Mouse tracking for grid flashlight effect
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      document.documentElement.style.setProperty('--global-mouse-x', `${e.clientX}px`)
      document.documentElement.style.setProperty('--global-mouse-y', `${e.clientY}px`)
    }
    window.addEventListener('mousemove', handleGlobalMouseMove)
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove)
  }, [])

  // Scroll tracking for shrinking glassmorphic navigation header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-scroll terminal logs
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [terminalHistory, activeTab])

  // Scroll reveal logic (Intersection Observer fallback for older browsers)
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -12% 0px',
      threshold: 0.05,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    const revealElements = document.querySelectorAll('.reveal')
    revealElements.forEach((el) => observer.observe(el))

    return () => {
      revealElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  // Card spotlight position tracker
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }

  // Smooth scroll back to top handler
  const scrollToTop = (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // Terminal command executor
  const handleCommandSubmit = (e) => {
    e.preventDefault()
    const rawInput = terminalInput.trim()
    const cmd = rawInput.toLowerCase()
    if (!rawInput) return

    const newHistory = [...terminalHistory, { type: 'input', text: rawInput }]
    let reply

    switch (cmd) {
      case 'help':
        reply = 'Available commands:\n  about    - Brief professional biography\n  projects - Showcases key completed works\n  skills   - List of primary technologies\n  contact  - Open communication channels\n  clear    - Clear terminal logs'
        break
      case 'about':
        reply = 'Prasad Patil — Software Engineer.\n\nOver the past 8+ years, I\'ve focused on building scalable web applications, payments systems, and developer tools. Currently at Linear, crafting products at the intersection of engineering and design.'
        break
      case 'projects':
        reply = 'Selected works:\n  1. FinMate — Financial Analytics Dashboard\n  2. LaunchBoard — SaaS Release Control & Developer Insights\n  3. Walnut — Simplified Digital Banking Mobile Interface'
        break
      case 'skills':
        reply = 'Tech Stack Profile:\n  TypeScript/JS █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ 90%\n  React/Next.js █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ 95%\n  Node/Postgres █ █ █ █ █ █ █ █ █ █ █ █ █ 75%\n  Docker/AWS    █ █ █ █ █ █ █ █ █ █ 60%'
        break
      case 'contact':
        reply = 'Initiating mail draft to hello@prasadpatil.dev...\nAccessing social coordinates.'
        window.open('mailto:hello@prasadpatil.dev', '_blank')
        break
      case 'clear':
        setTerminalHistory([])
        setTerminalInput('')
        return
      default:
        reply = `Command not recognised: "${rawInput}". Type "help" for a list of valid options.`
    }

    setTerminalHistory([...newHistory, { type: 'output', text: reply }])
    setTerminalInput('')
  }

  return (
    <div className="portfolio-container">
      {/* Dynamic Ambient Background Grid */}
      <div className="grid-bg" />

      {/* Floating Glass Header */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="logo" onClick={scrollToTop} aria-label="Prasad Patil Home">PP</a>
        <nav className="nav" aria-label="Main Navigation">
          <a href="#about" className="nav-link">About</a>
          <a href="#work" className="nav-link">Work</a>
          <a href="#experience" className="nav-link">Experience</a>
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>
      </header>

      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section reveal">
          <div className="hero-glow-orb" />
          <div className="hero-content-wrapper">
            <div className="hero-text">
              <span className="hero-intro">Hello, I'm</span>
              <h1 className="hero-title text-gradient-primary">Prasad Patil</h1>
              <h2 className="hero-subtitle text-gradient-secondary">
                Software Engineer focused on building thoughtful digital products.
              </h2>
              <p className="hero-description">
                I design and build scalable, user-centered applications that solve real problems. 
                My work sits at the intersection of engineering, product, and design.
              </p>
              <div className="hero-actions">
                <a href="#work" className="btn btn-primary">
                  View my work
                  <svg className="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </a>
                <a href="#contact" className="btn btn-secondary">
                  Get in touch
                </a>
              </div>
            </div>

            <div className="hero-visual">
              {/* Dual-Tab Status and Terminal Console */}
              <div className="status-card spotlight-card" onMouseMove={handleCardMouseMove}>
                <div className="status-header">
                  <div className="status-tabs">
                    <button 
                      className={`status-tab ${activeTab === 'status' ? 'active' : ''}`}
                      onClick={() => setActiveTab('status')}
                      aria-label="View system details"
                    >
                      <span className="status-dot"></span>
                      SYSTEM_INFO
                    </button>
                    <button 
                      className={`status-tab ${activeTab === 'console' ? 'active' : ''}`}
                      onClick={() => setActiveTab('console')}
                      aria-label="Open CLI console"
                    >
                      <span className="terminal-tab-dot"></span>
                      TERMINAL_CLI
                    </button>
                  </div>
                </div>

                {activeTab === 'status' ? (
                  <div className="status-tab-content">
                    <div className="status-body">
                      <div className="status-row">
                        <span className="status-label">Role</span>
                        <span className="status-val font-mono text-white text-glow">Product Engineer</span>
                      </div>
                      <div className="status-row">
                        <span className="status-label">Focus</span>
                        <span className="status-val font-mono text-white text-glow">UI Devtools & APIs</span>
                      </div>
                      <div className="status-row">
                        <span className="status-label">Location</span>
                        <span className="status-val font-mono text-white text-glow">Pune, IN (18.52° N)</span>
                      </div>
                      <div className="status-row">
                        <span className="status-label">Local Time</span>
                        <span className="status-val font-mono text-white text-glow text-time-glow">{time || '12:00:00 AM'}</span>
                      </div>
                      <div className="status-row">
                        <span className="status-label">Current Tech</span>
                        <span className="status-val font-mono text-white text-glow">RSCs & CSS Houdini</span>
                      </div>
                    </div>
                    <div className="status-footer">
                      <span className="status-footer-label">Activity Matrix</span>
                      <div className="activity-grid-visual">
                        {Array.from({ length: 24 }).map((_, i) => (
                          <div 
                            key={i} 
                            className={`activity-block opacity-${[1, 2, 3, 2, 1, 4, 3, 2, 4, 1, 2, 3, 4, 3, 2, 1, 4, 2, 3, 1, 4, 3, 2, 4][i]}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="terminal-tab-content">
                    <div className="terminal-display">
                      {terminalHistory.map((log, index) => (
                        <div key={index} className={`terminal-line ${log.type}`}>
                          {log.type === 'input' && <span className="terminal-prompt">&gt;&nbsp;</span>}
                          <span className="terminal-text">{log.text}</span>
                        </div>
                      ))}
                      <div ref={terminalEndRef} />
                    </div>
                    <form onSubmit={handleCommandSubmit} className="terminal-input-form">
                      <span className="terminal-prompt">&gt;</span>
                      <input
                        type="text"
                        value={terminalInput}
                        onChange={(e) => setTerminalInput(e.target.value)}
                        className="terminal-input"
                        placeholder="Type 'help'..."
                        aria-label="Terminal Input"
                        autoComplete="off"
                        spellCheck="false"
                        autoFocus
                      />
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about-section reveal">
          <span className="section-label">About</span>
          <div className="about-grid">
            <div className="about-main">
              <h2 className="about-heading text-gradient-primary">
                I enjoy turning complex problems into simple, intuitive experiences.
              </h2>
              <p className="about-text">
                Over the past 8+ years, I've had the privilege of working with early-stage 
                startups and established teams to ship products that make an impact. I care 
                deeply about clean code, great design, and building things that last.
              </p>
            </div>
            <div className="about-meta">
              <div className="meta-item">
                <span className="meta-label">Location</span>
                <span className="meta-value">Pune, India</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Experience</span>
                <span className="meta-value">8+ Years</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Focus</span>
                <span className="meta-value">Web Applications, Developer Tools, APIs, and System Design</span>
              </div>
            </div>
          </div>
        </section>

        {/* Selected Work Section */}
        <section id="work" className="work-section reveal">
          <div className="section-header">
            <div>
              <span className="section-label">Selected Work</span>
              <h2 className="section-heading text-gradient-primary">A selection of projects I've worked on.</h2>
            </div>
            <a href="https://github.com/prasadpatil" target="_blank" rel="noopener noreferrer" className="view-all-link">
              View all projects
              <svg className="arrow-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
          </div>

          <div className="project-grid">
            {/* Project 1 - FinMate */}
            <article className="project-card spotlight-card" onMouseMove={handleCardMouseMove}>
              <a href="https://github.com/prasadpatil" target="_blank" rel="noopener noreferrer" className="project-card-link" aria-label="FinMate project details">
                <div className="project-image-wrapper dark-bg">
                  <div className="project-image-overlay" />
                  <img src="/finmate_preview.png" alt="FinMate UI" className="project-image" loading="lazy" />
                </div>
                <div className="project-info">
                  <h3 className="project-title">FinMate</h3>
                  <p className="project-description">Financial analytics platform for modern businesses.</p>
                  <p className="project-tech">Next.js, TypeScript, Tailwind, Prisma</p>
                  <div className="project-arrow-indicator">
                    <svg className="card-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </div>
                </div>
              </a>
            </article>

            {/* Project 2 - LaunchBoard */}
            <article className="project-card spotlight-card" onMouseMove={handleCardMouseMove}>
              <a href="https://github.com/prasadpatil" target="_blank" rel="noopener noreferrer" className="project-card-link" aria-label="LaunchBoard project details">
                <div className="project-image-wrapper light-bg">
                  <div className="project-image-overlay" />
                  <img src="/launchboard_preview.png" alt="LaunchBoard UI" className="project-image" loading="lazy" />
                </div>
                <div className="project-info">
                  <h3 className="project-title">LaunchBoard</h3>
                  <p className="project-description">Developer analytics and feature insights for SaaS teams.</p>
                  <p className="project-tech">Next.js, TypeScript, PostgreSQL, Prisma</p>
                  <div className="project-arrow-indicator">
                    <svg className="card-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </div>
                </div>
              </a>
            </article>

            {/* Project 3 - Walnut */}
            <article className="project-card spotlight-card" onMouseMove={handleCardMouseMove}>
              <a href="https://github.com/prasadpatil" target="_blank" rel="noopener noreferrer" className="project-card-link" aria-label="Walnut project details">
                <div className="project-image-wrapper light-bg flex-center">
                  <div className="project-image-overlay" />
                  <img src="/walnut_preview.png" alt="Walnut UI" className="project-image contain-mobile" loading="lazy" />
                </div>
                <div className="project-info">
                  <h3 className="project-title">Walnut</h3>
                  <p className="project-description">Digital banking experience reimagined for simplicity.</p>
                  <p className="project-tech">React Native, TypeScript, Node.js</p>
                  <div className="project-arrow-indicator">
                    <svg className="card-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </div>
                </div>
              </a>
            </article>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="experience-section reveal">
          <span className="section-label">Experience</span>
          <h2 className="section-heading text-gradient-primary">My professional journey so far.</h2>
          
          <div className="timeline">
            {/* Timeline Item 1 */}
            <div className="timeline-item">
              <div className="timeline-date">2021 — Present</div>
              <div className="timeline-marker">
                <span className="timeline-dot"></span>
              </div>
              <div className="timeline-content-card spotlight-card" onMouseMove={handleCardMouseMove}>
                <h3 className="job-title">
                  Senior Software Engineer <span className="job-company">@ Linear</span>
                </h3>
                <p className="job-description">Building tools that help teams ship better software, faster.</p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="timeline-item">
              <div className="timeline-date">2019 — 2021</div>
              <div className="timeline-marker">
                <span className="timeline-dot"></span>
              </div>
              <div className="timeline-content-card spotlight-card" onMouseMove={handleCardMouseMove}>
                <h3 className="job-title">
                  Software Engineer II <span className="job-company">@ Razorpay</span>
                </h3>
                <p className="job-description">Worked on core payments platform and developer APIs.</p>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="timeline-item">
              <div className="timeline-date">2016 — 2018</div>
              <div className="timeline-marker">
                <span className="timeline-dot"></span>
              </div>
              <div className="timeline-content-card spotlight-card" onMouseMove={handleCardMouseMove}>
                <h3 className="job-title">
                  Software Engineer <span className="job-company">@ Capillary Technologies</span>
                </h3>
                <p className="job-description">Developed scalable solutions for customer engagement.</p>
              </div>
            </div>

            {/* Timeline Item 4 */}
            <div className="timeline-item">
              <div className="timeline-date">2014 — 2016</div>
              <div className="timeline-marker">
                <span className="timeline-dot"></span>
              </div>
              <div className="timeline-content-card spotlight-card" onMouseMove={handleCardMouseMove}>
                <h3 className="job-title">
                  Software Engineer <span className="job-company">@ Persistent Systems</span>
                </h3>
                <p className="job-description">Started my journey building enterprise software.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="skills-section reveal">
          <span className="section-label">Skills</span>
          <h2 className="section-heading text-gradient-primary">Tools and technologies I work with.</h2>
          
          <div className="skills-grid">
            <div className="skills-column spotlight-card" onMouseMove={handleCardMouseMove}>
              <h3 className="skills-group-title">Languages</h3>
              <div className="skills-list">
                {['TypeScript', 'JavaScript', 'Python', 'SQL', 'HTML', 'CSS'].map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
            <div className="skills-column spotlight-card" onMouseMove={handleCardMouseMove}>
              <h3 className="skills-group-title">Frameworks</h3>
              <div className="skills-list">
                {['Next.js', 'React', 'Node.js', 'Express.js', 'Tailwind CSS'].map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
            <div className="skills-column spotlight-card" onMouseMove={handleCardMouseMove}>
              <h3 className="skills-group-title">Databases</h3>
              <div className="skills-list">
                {['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'].map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
            <div className="skills-column spotlight-card" onMouseMove={handleCardMouseMove}>
              <h3 className="skills-group-title">Tools</h3>
              <div className="skills-list">
                {['Git', 'Docker', 'Vercel', 'AWS', 'Prisma', 'Postman'].map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact-section reveal">
          <span className="section-label">Contact</span>
          <div className="contact-grid">
            <h2 className="contact-heading text-gradient-primary">
              Let's build something great together.
            </h2>
            <div className="contact-links" role="list">
              <a href="mailto:hello@prasadpatil.dev" className="contact-link" role="listitem" aria-label="Email: hello@prasadpatil.dev">
                <svg className="contact-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                hello@prasadpatil.dev
              </a>
              <a href="https://github.com/prasadpatil" target="_blank" rel="noopener noreferrer" className="contact-link" role="listitem">
                <svg className="contact-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
                github.com/prasadpatil
              </a>
              <a href="https://linkedin.com/in/prasadpatil" target="_blank" rel="noopener noreferrer" className="contact-link" role="listitem">
                <svg className="contact-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                linkedin.com/in/prasadpatil
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="footer reveal">
        <p className="copyright">&copy; 2026 Prasad Patil. All rights reserved.</p>
        <a href="#" className="back-to-top" onClick={scrollToTop} aria-label="Scroll back to top">
          Back to top
          <svg className="up-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="12" y1="19" x2="12" y2="5"></line>
            <polyline points="5 12 12 5 19 12"></polyline>
          </svg>
        </a>
      </footer>
    </div>
  )
}

export default App
