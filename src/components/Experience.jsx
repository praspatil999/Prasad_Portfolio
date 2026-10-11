import { Calendar, MapPin, CheckCircle2 } from 'lucide-react'
import { EXPERIENCES } from '../data/portfolioData'

export default function Experience() {
  return (
    <section className="experience-section" id="experience">
      <div className="section-intro">
        <div className="section-label-group">
          <span className="section-indicator font-mono">02 // CAREER</span>
          <span className="section-eyebrow font-mono">CHRONOLOGY</span>
        </div>
        <h2 className="section-title">Professional Experience</h2>
        <p className="section-lead">
          Over 8+ years scaling production web platforms, low-latency fintech payment rails, and developer tooling.
        </p>
      </div>

      <div className="experience-timeline">
        <div className="timeline-line" aria-hidden="true" />

        {EXPERIENCES.map((exp, idx) => (
          <div key={idx} className="timeline-entry">
            {/* Timeline Marker Dot */}
            <div className="timeline-marker">
              <div className="timeline-dot-outer">
                <div className="timeline-dot-inner" />
              </div>
            </div>

            {/* Content Card */}
            <div className="timeline-card">
              <div className="timeline-card-header">
                <div>
                  <div className="timeline-role-row">
                    <h3 className="timeline-role">{exp.role}</h3>
                    <span className="timeline-company-badge">@{exp.company}</span>
                  </div>
                  <div className="timeline-meta-row font-mono">
                    <span className="timeline-period">
                      <Calendar size={13} />
                      {exp.period}
                    </span>
                    <span className="timeline-location">
                      <MapPin size={13} />
                      {exp.location}
                    </span>
                  </div>
                </div>
              </div>

              <p className="timeline-desc">{exp.description}</p>

              {/* Architectural Contributions */}
              <div className="timeline-achievements">
                <span className="achievements-title font-mono text-xs">KEY CONTRIBUTIONS:</span>
                <ul className="achievements-list">
                  {exp.achievements.map((item, aIdx) => (
                    <li key={aIdx} className="achievement-item">
                      <CheckCircle2 size={15} className="achievement-icon" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies Used */}
              <div className="timeline-tech-stack">
                {exp.tech.map((t) => (
                  <span key={t} className="tech-badge font-mono">{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
