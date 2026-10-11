import { useEffect } from 'react'
import { X, ExternalLink, CheckCircle2, AlertTriangle, Layers, Cpu, ArrowRight } from 'lucide-react'
import { GithubIcon } from './Icons'

export default function CaseStudyModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'auto'
    }
  }, [onClose])

  if (!project) return null

  const cs = project.caseStudy

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="case-study-title">
      <div className="case-study-modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="case-study-header">
          <div className="case-study-header-text">
            <span className="case-study-tag font-mono">{project.category} // CASE STUDY</span>
            <h2 id="case-study-title" className="case-study-title">{project.title}</h2>
            <p className="case-study-headline">{cs.tagline}</p>
          </div>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close case study dialog">
            <X size={22} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="case-study-body">
          {/* Project Preview Image */}
          <div className="case-study-media">
            <img src={project.image} alt={`${project.title} interface preview`} className="case-study-img" />
            <div className="case-study-media-badge font-mono">PRODUCTION SYSTEM INTERFACE</div>
          </div>

          {/* Quick Links & Stack Header */}
          <div className="case-study-meta-bar">
            <div className="case-study-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="tech-badge font-mono">{tag}</span>
              ))}
            </div>
            <div className="case-study-actions">
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
              >
                <GithubIcon size={15} />
                <span>GitHub Source</span>
              </a>
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
              >
                <ExternalLink size={15} />
                <span>Live System Demo</span>
              </a>
            </div>
          </div>

          {/* Deep Dive Content Sections */}
          <div className="case-study-sections">
            {/* The Problem */}
            <div className="case-study-section-card">
              <div className="section-card-header">
                <AlertTriangle size={18} className="text-warning" />
                <h3 className="section-card-title">Problem Statement</h3>
              </div>
              <p className="section-card-text">{cs.problem}</p>
            </div>

            {/* The Solution */}
            <div className="case-study-section-card">
              <div className="section-card-header">
                <CheckCircle2 size={18} className="text-cyan" />
                <h3 className="section-card-title">Engineering Solution</h3>
              </div>
              <p className="section-card-text">{cs.solution}</p>
              
              <div className="key-features-list">
                <span className="features-subheading font-mono">KEY ARCHITECTURAL HIGHLIGHTS</span>
                <ul>
                  {cs.keyFeatures.map((feat, idx) => (
                    <li key={idx}>
                      <span className="feature-check font-mono">&gt;</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Architecture & Implementation */}
            <div className="case-study-section-card">
              <div className="section-card-header">
                <Layers size={18} className="text-indigo" />
                <h3 className="section-card-title">Architecture & System Design</h3>
              </div>
              <p className="section-card-text">{cs.architecture}</p>
            </div>

            {/* Challenges & Trade-offs */}
            <div className="case-study-section-card">
              <div className="section-card-header">
                <Cpu size={18} className="text-indigo" />
                <h3 className="section-card-title">Challenges & Technical Trade-offs</h3>
              </div>
              <p className="section-card-text">{cs.challenges}</p>
            </div>

            {/* Outcomes */}
            <div className="case-study-section-card outcomes-card">
              <div className="section-card-header">
                <CheckCircle2 size={18} className="text-success" />
                <h3 className="section-card-title">Measured Outcomes & Performance</h3>
              </div>
              <p className="section-card-text">{cs.outcomes}</p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="case-study-footer">
          <button onClick={onClose} className="btn btn-secondary">
            <span>Close Case Study</span>
          </button>
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <span>Visit Production Deployment</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  )
}
