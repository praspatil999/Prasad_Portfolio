import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { ArrowDown, ArrowUpRight, FileText, Terminal, Code2, Globe, Cpu, Sparkles } from 'lucide-react'
import { PERSONAL_INFO } from '../data/portfolioData'

export default function Hero({ onOpenTerminal, onOpenResume }) {
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }
      setTime(new Intl.DateTimeFormat('en-US', options).format(new Date()))
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section className="hero-section" id="hero">
      {/* Background glow and ambient gradient */}
      <div className="hero-ambient-glow" aria-hidden="true" />
      <div className="hero-ambient-glow-secondary" aria-hidden="true" />

      <div className="hero-inner">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Engineering Status Pill */}
          <motion.div variants={itemVariants} className="hero-badge-wrapper">
            <span className="hero-status-pill">
              <span className="status-ping">
                <span className="ping-dot" />
                <span className="ping-ring" />
              </span>
              <span>Available for engineering leadership & high-impact roles</span>
            </span>
          </motion.div>

          {/* Intro & Name */}
          <motion.div variants={itemVariants} className="hero-title-group">
            <span className="hero-eyebrow">Hello, I'm</span>
            <h1 className="hero-headline">
              <span className="hero-name-gradient">{PERSONAL_INFO.name}</span>
            </h1>
          </motion.div>

          {/* Concise Headline */}
          <motion.h2 variants={itemVariants} className="hero-statement">
            I build resilient software, high-throughput systems, and modern applications.
          </motion.h2>

          {/* Subtitle covering engineering, full-stack, cloud */}
          <motion.p variants={itemVariants} className="hero-description">
            Senior Software Engineer & Full-Stack Architect with 8+ years designing scalable distributed systems, developer tools, and cloud infrastructure at the intersection of engineering craft and design.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="hero-cta-group">
            <a href="#work" className="btn btn-primary">
              <span>Explore My Work</span>
              <ArrowDown size={16} className="btn-icon" />
            </a>

            <button onClick={onOpenResume} className="btn btn-secondary" aria-label="Open Resume modal">
              <FileText size={16} />
              <span>Download Resume</span>
            </button>

            <a href="#contact" className="btn btn-ghost">
              <span>Get in Touch</span>
              <ArrowUpRight size={16} />
            </a>
          </motion.div>

          {/* Quick Metrics Strip */}
          <motion.div variants={itemVariants} className="hero-stats-strip">
            <div className="hero-stat-item">
              <span className="stat-number">8+</span>
              <span className="stat-label">Years Shipping</span>
            </div>
            <div className="stat-divider" />
            <div className="hero-stat-item">
              <span className="stat-number">Linear</span>
              <span className="stat-label">Current Role</span>
            </div>
            <div className="stat-divider" />
            <div className="hero-stat-item">
              <span className="stat-number">Full-Stack</span>
              <span className="stat-label">System Architecture</span>
            </div>
          </motion.div>
        </motion.div>

        {/* High-Tech Telemetry HUD Card */}
        <motion.div
          className="hero-telemetry-col"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="telemetry-card">
            {/* Header with terminal lights */}
            <div className="telemetry-header">
              <div className="telemetry-dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <span className="telemetry-title font-mono">prasad-telemetry.sys</span>
              <span className="telemetry-tag font-mono">LIVE</span>
            </div>

            {/* Telemetry Body */}
            <div className="telemetry-body">
              <div className="telemetry-row">
                <div className="row-label">
                  <Cpu size={14} className="text-cyan" />
                  <span>CURRENT ROLE</span>
                </div>
                <div className="row-value font-mono">Senior SWE @ Linear</div>
              </div>

              <div className="telemetry-row">
                <div className="row-label">
                  <Code2 size={14} className="text-indigo" />
                  <span>SPECIALIZATION</span>
                </div>
                <div className="row-value font-mono">Full-Stack & Distributed APIs</div>
              </div>

              <div className="telemetry-row">
                <div className="row-label">
                  <Globe size={14} className="text-cyan" />
                  <span>COORDINATES</span>
                </div>
                <div className="row-value font-mono">{PERSONAL_INFO.coordinates}</div>
              </div>

              <div className="telemetry-row highlight-row">
                <div className="row-label">
                  <Sparkles size={14} className="text-indigo" />
                  <span>LOCAL TIME (IST)</span>
                </div>
                <div className="row-value font-mono time-display">{time || '12:00:00 PM'}</div>
              </div>

              {/* Real-time system matrix */}
              <div className="telemetry-matrix-box">
                <div className="matrix-top">
                  <span className="font-mono text-xs">SYSTEM_HEALTH // 99.98% OK</span>
                  <span className="font-mono text-xs text-cyan">LATENCY 12ms</span>
                </div>
                <div className="matrix-cells" aria-hidden="true">
                  {Array.from({ length: 28 }).map((_, i) => (
                    <div
                      key={i}
                      className={`matrix-cell cell-pulse-${(i % 5) + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Interactive Terminal Quick Launch */}
              <div className="telemetry-terminal-cta" onClick={onOpenTerminal} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onOpenTerminal()}>
                <div className="terminal-cta-content">
                  <Terminal size={16} className="text-indigo" />
                  <div className="terminal-cta-text">
                    <span className="font-mono terminal-cta-label">Interactive Developer CLI</span>
                    <span className="font-mono terminal-cta-hint">&gt; Type "help" to explore projects & skills</span>
                  </div>
                </div>
                <span className="terminal-cta-btn font-mono">LAUNCH &gt;</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Tasteful Indicator */}
      <div className="hero-scroll-indicator">
        <a href="#about" aria-label="Scroll down to About section" className="scroll-indicator-link">
          <span className="scroll-mouse">
            <span className="scroll-wheel" />
          </span>
          <span className="scroll-text font-mono">SCROLL TO EXPLORE</span>
        </a>
      </div>
    </section>
  )
}
