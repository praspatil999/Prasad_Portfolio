import { useState, useRef } from 'react'
import { motion } from 'motion/react'
import { BookOpen, ArrowUpRight } from 'lucide-react'
import { GithubIcon } from './Icons'
import { PROJECTS } from '../data/portfolioData'

function ProjectCard({ project, onSelectCaseStudy }) {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  // Direct CSS variable updates for pointer-responsive specular sheen without triggering React re-renders
  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    cardRef.current.style.setProperty('--card-mouse-x', `${mouseX}px`)
    cardRef.current.style.setProperty('--card-mouse-y', `${mouseY}px`)
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  return (
    <motion.article
      ref={cardRef}
      className={`project-card-interactive ${isHovered ? 'hovered' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Radial Spotlight glow border overlay */}
      <div className="card-spotlight-border" aria-hidden="true" />

      {/* Visual Preview Container */}
      <div className="project-card-media">
        <div className="media-overlay" />
        <img
          src={project.image}
          alt={`${project.title} screenshot preview`}
          className="project-card-img"
          loading="lazy"
        />
        <div className="media-badge-category font-mono">
          <span>{project.category}</span>
        </div>
      </div>

      {/* Content Details */}
      <div className="project-card-content">
        <div className="project-card-header">
          <div>
            <h3 className="project-card-title">{project.title}</h3>
            <p className="project-problem-headline">{project.headline}</p>
          </div>
        </div>

        <p className="project-card-desc">{project.description}</p>

        {/* Tech Stack Badges */}
        <div className="project-tech-badges">
          {project.tags.map((tag) => (
            <span key={tag} className="tech-badge font-mono">{tag}</span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="project-card-footer">
          <button
            onClick={() => onSelectCaseStudy(project)}
            className="btn btn-secondary btn-sm case-study-btn"
            aria-label={`Read architectural case study for ${project.title}`}
          >
            <BookOpen size={14} />
            <span>Case Study</span>
          </button>

          <div className="project-external-links">
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link-btn"
              aria-label={`GitHub source code for ${project.title}`}
              title="View Source on GitHub"
            >
              <GithubIcon size={18} />
            </a>

            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link-btn primary"
              aria-label={`Live website demo for ${project.title}`}
              title="Open Live Deployment"
            >
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects({ onSelectCaseStudy }) {
  const [filter, setFilter] = useState('all')

  const filteredProjects = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.featured)

  return (
    <section className="projects-section" id="work">
      <div className="section-intro">
        <div className="section-label-group">
          <span className="section-indicator font-mono">01 // PORTFOLIO</span>
          <span className="section-eyebrow font-mono">SELECTED WORK</span>
        </div>
        <div className="section-header-row">
          <div>
            <h2 className="section-title">Production Systems & Digital Products</h2>
            <p className="section-lead">
              A curated selection of scalable applications, high-throughput financial engines, and developer infrastructure I've architected and shipped.
            </p>
          </div>
          <div className="projects-filter-bar">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Projects ({PROJECTS.length})
            </button>
            <button
              className={`filter-btn ${filter === 'featured' ? 'active' : ''}`}
              onClick={() => setFilter('featured')}
            >
              Featured Highlights
            </button>
          </div>
        </div>
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onSelectCaseStudy={onSelectCaseStudy}
          />
        ))}
      </div>
    </section>
  )
}
