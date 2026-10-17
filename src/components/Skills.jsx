import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Server, Layout, Database, Cloud, Code, Check } from 'lucide-react'
import { SKILL_CATEGORIES } from '../data/portfolioData'

export default function Skills() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0)

  const categoryIcons = [
    <Server size={18} className="text-cyan" />,
    <Layout size={18} className="text-indigo" />,
    <Database size={18} className="text-cyan" />,
    <Cloud size={18} className="text-indigo" />,
    <Code size={18} className="text-cyan" />
  ]

  const activeCategory = SKILL_CATEGORIES[activeCategoryIndex]

  return (
    <motion.section
      className="skills-section"
      id="skills"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="section-intro">
        <div className="section-label-group">
          <span className="section-indicator font-mono">03 // STACK</span>
          <span className="section-eyebrow font-mono">TECHNICAL DOMAINS</span>
        </div>
        <h2 className="section-title">Core Competencies & Stack</h2>
        <p className="section-lead">
          Pragmatic, production-tested technologies applied across distributed cloud architectures and responsive frontends.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="skills-container">
        <div className="skills-tab-nav" role="tablist" aria-label="Technical skill categories">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <button
              key={cat.category}
              role="tab"
              aria-selected={activeCategoryIndex === idx}
              aria-controls={`skills-tabpanel-${idx}`}
              id={`skills-tab-${idx}`}
              className={`skills-tab-btn ${activeCategoryIndex === idx ? 'active' : ''}`}
              onClick={() => setActiveCategoryIndex(idx)}
            >
              <span className="tab-icon">{categoryIcons[idx]}</span>
              <span className="tab-label">{cat.category}</span>
              <span className="tab-count font-mono">{cat.skills.length}</span>
            </button>
          ))}
        </div>

        {/* Tab Panel with smooth AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory.category}
            id={`skills-tabpanel-${activeCategoryIndex}`}
            role="tabpanel"
            aria-labelledby={`skills-tab-${activeCategoryIndex}`}
            className="skills-panel"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="panel-summary-bar">
              <div className="panel-header-info">
                <h3 className="panel-title">{activeCategory.category}</h3>
                <p className="panel-description">{activeCategory.summary}</p>
              </div>
              <span className="panel-status font-mono">PRACTICAL PRODUCTION USE</span>
            </div>

            <div className="skills-grid-cards">
              {activeCategory.skills.map((skill) => (
                <div key={skill.name} className="skill-card">
                  <div className="skill-card-top">
                    <div className="skill-icon-wrapper">
                      <Check size={14} className="text-cyan" />
                    </div>
                    <h4 className="skill-name font-mono">{skill.name}</h4>
                  </div>
                  <p className="skill-context">{skill.context}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  )
}
