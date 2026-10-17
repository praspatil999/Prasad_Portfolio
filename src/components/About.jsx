import { motion } from 'motion/react'
import { Shield, Zap, Layers, HeartHandshake } from 'lucide-react'

export default function About() {
  const engineeringValues = [
    {
      icon: <Zap size={20} className="text-cyan" />,
      title: 'Performance-First',
      desc: 'Obsession with sub-100ms render latencies, optimized network payloads, and 60 FPS compositor animations.'
    },
    {
      icon: <Shield size={20} className="text-indigo" />,
      title: 'Reliability & Resilience',
      desc: 'Architecting graceful degradation, idempotent event ingestion, and transactional safety under burst loads.'
    },
    {
      icon: <Layers size={20} className="text-cyan" />,
      title: 'Clean Architecture',
      desc: 'Modular boundary design, strict domain typing, and testable codebases that scale across engineering teams.'
    },
    {
      icon: <HeartHandshake size={20} className="text-indigo" />,
      title: 'Design-Driven Craft',
      desc: 'Bridging high-level product design intuition with low-level systems engineering and keyboard accessibility.'
    }
  ]

  return (
    <motion.section
      className="about-section"
      id="about"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="section-intro">
        <div className="section-label-group">
          <span className="section-indicator font-mono">00 // PROFILE</span>
          <span className="section-eyebrow font-mono">ABOUT ME</span>
        </div>
        <h2 className="section-title">Engineering at the intersection of scale & craft.</h2>
      </div>

      <div className="about-grid-content">
        <div className="about-story-col">
          <p className="about-lead-paragraph">
            I'm a senior software engineer and full-stack architect based in Pune, India. Over the last 8+ years, I've partnered with venture-backed hyper-growth startups and established tech leaders to architect resilient web systems and developer tools.
          </p>

          <p className="about-body-paragraph">
            Currently at <strong>Linear</strong>, I focus on crafting developer-first tools where every millisecond matters. Prior to Linear, I built mission-critical payment rails and merchant SDKs at <strong>Razorpay</strong>, processing millions of transactions daily with high availability.
          </p>

          <div className="about-meta-grid">
            <div className="about-meta-card">
              <span className="meta-card-label font-mono">LOCATION</span>
              <span className="meta-card-value font-mono">Pune, India (18.52° N)</span>
            </div>
            <div className="about-meta-card">
              <span className="meta-card-label font-mono">EXPERIENCE</span>
              <span className="meta-card-value font-mono">8+ Years Full-Stack</span>
            </div>
            <div className="about-meta-card">
              <span className="meta-card-label font-mono">CURRENT ROLE</span>
              <span className="meta-card-value font-mono">Senior SWE @ Linear</span>
            </div>
            <div className="about-meta-card">
              <span className="meta-card-label font-mono">ENGINEERING FOCUS</span>
              <span className="meta-card-value font-mono">APIs, Systems & UI Craft</span>
            </div>
          </div>
        </div>

        {/* Engineering Philosophy Cards */}
        <div className="about-values-col">
          <div className="values-header font-mono text-xs text-secondary">
            <span>CORE ENGINEERING VALUES</span>
          </div>

          <div className="values-list">
            {engineeringValues.map((v, idx) => (
              <div key={idx} className="value-card">
                <div className="value-icon-box">{v.icon}</div>
                <div className="value-content">
                  <h3 className="value-title">{v.title}</h3>
                  <p className="value-desc">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
