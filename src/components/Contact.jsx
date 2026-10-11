import { useState } from 'react'
import { Mail, Copy, Check, Send, ArrowUpRight } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'
import confetti from 'canvas-confetti'
import { PERSONAL_INFO } from '../data/portfolioData'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email)
      setCopied(true)
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#6366F1', '#22D3EE', '#FFFFFF']
        })
      } catch {
        // Safe fallback if canvas not available
      }
      setTimeout(() => setCopied(false), 3000)
    } catch (err) {
      console.error('Failed to copy email', err)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    // Prepare mailto link with encoded subject and body
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`)
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`

    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
    }, 4000)
  }

  return (
    <section className="contact-section" id="contact">
      <div className="section-intro">
        <div className="section-label-group">
          <span className="section-indicator font-mono">04 // CONNECT</span>
          <span className="section-eyebrow font-mono">GET IN TOUCH</span>
        </div>
        <h2 className="section-title">Let's build something exceptional together.</h2>
        <p className="section-lead">
          I'm always open to discussing engineering leadership, high-impact technical initiatives, or consulting on complex distributed architectures.
        </p>
      </div>

      <div className="contact-grid-layout">
        {/* Contact Coordinates & Copy Button */}
        <div className="contact-info-card">
          <div className="contact-status-card">
            <span className="contact-status-dot" />
            <div>
              <span className="contact-status-label font-mono">STATUS // AVAILABLE</span>
              <p className="contact-status-sub">Actively responding to engineering inquiries</p>
            </div>
          </div>

          <div className="contact-direct-box">
            <span className="font-mono text-xs text-secondary">DIRECT EMAIL</span>
            <div className="email-display-row">
              <span className="email-text font-mono">{PERSONAL_INFO.email}</span>
              <button
                onClick={handleCopyEmail}
                className="btn btn-secondary btn-sm copy-btn"
                aria-label="Copy email address to clipboard"
                title="Copy email to clipboard"
              >
                {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div className="contact-social-links">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="social-coord-link"
              aria-label="Send direct email"
            >
              <div className="coord-left">
                <Mail size={18} className="text-indigo" />
                <span>Send Direct Email</span>
              </div>
              <ArrowUpRight size={16} />
            </a>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="social-coord-link"
              aria-label="Prasad Patil GitHub profile"
            >
              <div className="coord-left">
                <GithubIcon size={18} className="text-cyan" />
                <span>github.com/prasadpatil</span>
              </div>
              <ArrowUpRight size={16} />
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-coord-link"
              aria-label="Prasad Patil LinkedIn profile"
            >
              <div className="coord-left">
                <LinkedinIcon size={18} className="text-indigo" />
                <span>linkedin.com/in/prasadpatil</span>
              </div>
              <ArrowUpRight size={16} />
            </a>
          </div>

          {/* Location note */}
          <div className="location-footer-note font-mono text-xs">
            <span>LOCATED IN: Pune, India ({PERSONAL_INFO.coordinates})</span>
          </div>
        </div>

        {/* Quick Message Form */}
        <div className="contact-form-card">
          <h3 className="form-card-title">Send a Quick Message</h3>
          <p className="form-card-subtitle">Drop a note directly to my inbox with your project or role details.</p>

          {isSubmitted ? (
            <div className="form-success-banner">
              <Check size={20} className="text-success" />
              <div>
                <strong>Drafting in your email client!</strong>
                <p>Thank you for reaching out. I typically reply within 24 hours.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="contact-name" className="form-label font-mono">YOUR NAME</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="e.g. Alex Chen"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email" className="form-label font-mono">YOUR EMAIL</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="alex@company.com"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message" className="form-label font-mono">MESSAGE</label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="Tell me about your team, challenge, or project..."
                  className="form-textarea"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary submit-btn">
                <span>Send Message</span>
                <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
