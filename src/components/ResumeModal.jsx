import { useEffect } from 'react'
import { X, Printer, Download, ExternalLink, Mail, MapPin, Globe } from 'lucide-react'
import { PERSONAL_INFO, EXPERIENCES, SKILL_CATEGORIES } from '../data/portfolioData'

export default function ResumeModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadMarkdown = () => {
    const markdownContent = `# ${PERSONAL_INFO.name}
**${PERSONAL_INFO.role}**
Location: ${PERSONAL_INFO.location} | Email: ${PERSONAL_INFO.email}
GitHub: ${PERSONAL_INFO.github} | LinkedIn: ${PERSONAL_INFO.linkedin}

---

## Professional Summary
${PERSONAL_INFO.bio}

---

## Experience
${EXPERIENCES.map(
  (e) => `### ${e.role} — ${e.company} (${e.period})
*${e.location}*
${e.description}
Key Achievements:
${e.achievements.map((a) => `- ${a}`).join('\n')}
Technologies: ${e.tech.join(', ')}
`
).join('\n')}

---

## Technical Skills
${SKILL_CATEGORIES.map(
  (c) => `### ${c.category}
${c.skills.map((s) => `- **${s.name}**: ${s.context}`).join('\n')}
`
).join('\n')}

---

## Education
- **Bachelor of Engineering (Computer Science)** — First Class with Distinction
`

    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'Prasad_Patil_Resume.md')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="resume-title">
      <div className="resume-modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Controls Toolbar */}
        <div className="resume-toolbar no-print">
          <div className="toolbar-left">
            <span className="font-mono text-xs text-cyan">DOCUMENT_VIEWER // CURRICULUM VITAE</span>
          </div>
          <div className="toolbar-actions">
            <button onClick={handlePrint} className="btn btn-secondary btn-sm" title="Print or save as PDF">
              <Printer size={15} />
              <span>Print / Save PDF</span>
            </button>
            <button onClick={handleDownloadMarkdown} className="btn btn-primary btn-sm" title="Download text format">
              <Download size={15} />
              <span>Download .md</span>
            </button>
            <button onClick={onClose} className="modal-close-btn" aria-label="Close resume preview">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Printable Resume Document Paper */}
        <div className="resume-paper" id="resume-document">
          {/* Resume Header */}
          <header className="resume-header">
            <div>
              <h1 id="resume-title" className="resume-name">{PERSONAL_INFO.name}</h1>
              <p className="resume-title-role">{PERSONAL_INFO.role}</p>
            </div>
            <div className="resume-contact-meta font-mono">
              <div className="resume-meta-item">
                <MapPin size={13} />
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <div className="resume-meta-item">
                <Mail size={13} />
                <a href={`mailto:${PERSONAL_INFO.email}`}>{PERSONAL_INFO.email}</a>
              </div>
              <div className="resume-meta-item">
                <Globe size={13} />
                <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer">github.com/prasadpatil</a>
              </div>
              <div className="resume-meta-item">
                <ExternalLink size={13} />
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer">linkedin.com/in/prasadpatil</a>
              </div>
            </div>
          </header>

          <hr className="resume-divider" />

          {/* Executive Summary */}
          <section className="resume-section">
            <h2 className="resume-section-heading">PROFESSIONAL SUMMARY</h2>
            <p className="resume-summary-text">{PERSONAL_INFO.bio}</p>
          </section>

          {/* Work Experience */}
          <section className="resume-section">
            <h2 className="resume-section-heading">WORK EXPERIENCE</h2>
            <div className="resume-experience-list">
              {EXPERIENCES.map((exp, idx) => (
                <div key={idx} className="resume-exp-entry">
                  <div className="resume-exp-header">
                    <div>
                      <h3 className="resume-exp-role">{exp.role}</h3>
                      <span className="resume-exp-company">{exp.company} — {exp.location}</span>
                    </div>
                    <span className="resume-exp-period font-mono">{exp.period}</span>
                  </div>
                  <p className="resume-exp-desc">{exp.description}</p>
                  <ul className="resume-bullet-list">
                    {exp.achievements.map((ach, aIdx) => (
                      <li key={aIdx}>{ach}</li>
                    ))}
                  </ul>
                  <div className="resume-exp-tech font-mono">
                    <strong>Tech:</strong> {exp.tech.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Technical Skills */}
          <section className="resume-section">
            <h2 className="resume-section-heading">TECHNICAL SKILLS</h2>
            <div className="resume-skills-grid">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.category} className="resume-skill-cat">
                  <h4 className="resume-cat-title">{cat.category}:</h4>
                  <p className="resume-cat-items">
                    {cat.skills.map((s) => s.name).join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="resume-section">
            <h2 className="resume-section-heading">EDUCATION</h2>
            <div className="resume-edu-entry">
              <div>
                <h3 className="resume-exp-role">Bachelor of Engineering (Computer Science)</h3>
                <span className="resume-exp-company">Pune University, India</span>
              </div>
              <span className="resume-exp-period font-mono">Graduated with Distinction</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
