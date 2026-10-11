import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CaseStudyModal from './components/CaseStudyModal'
import TerminalModal from './components/Terminal'
import ResumeModal from './components/ResumeModal'
import ScrollProgress from './components/ScrollProgress'
import CustomCursor from './components/CustomCursor'
import './App.css'

function App() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null)
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [isTerminalMinimized, setIsTerminalMinimized] = useState(false)
  const [isResumeOpen, setIsResumeOpen] = useState(false)

  const handleOpenTerminal = () => {
    setIsTerminalOpen(true)
    setIsTerminalMinimized(false)
  }

  const handleCloseTerminal = () => {
    setIsTerminalOpen(false)
    setIsTerminalMinimized(false)
  }

  const handleMinimizeTerminal = () => {
    setIsTerminalMinimized(true)
  }

  const handleRestoreTerminal = () => {
    setIsTerminalMinimized(false)
    setIsTerminalOpen(true)
  }

  // Track global mouse position for ambient background grid illumination
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      document.documentElement.style.setProperty('--global-mouse-x', `${e.clientX}px`)
      document.documentElement.style.setProperty('--global-mouse-y', `${e.clientY}px`)
    }
    window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove)
  }, [])

  // Global hotkey: Press `~` or `\` to quickly open/toggle interactive terminal
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing inside an input or textarea
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return

      if (e.key === '`' || e.key === '~') {
        e.preventDefault()
        if (isTerminalMinimized) {
          handleRestoreTerminal()
        } else if (isTerminalOpen) {
          handleMinimizeTerminal()
        } else {
          handleOpenTerminal()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isTerminalOpen, isTerminalMinimized])

  return (
    <div className="portfolio-app">
      {/* Scroll Progress Bar at the top of the viewport */}
      <ScrollProgress />

      {/* Subtle Desktop-Only Custom Cursor */}
      <CustomCursor />

      {/* High-Tech Technical Grid Background with Flashlight Mask */}
      <div className="ambient-grid-bg" aria-hidden="true" />

      {/* Global Navigation Bar */}
      <Navbar
        onOpenTerminal={handleOpenTerminal}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="main-content" id="main-content">
        <Hero
          onOpenTerminal={handleOpenTerminal}
          onOpenResume={() => setIsResumeOpen(true)}
        />
        <About onOpenTerminal={handleOpenTerminal} />
        <Projects onSelectCaseStudy={(project) => setSelectedCaseStudy(project)} />
        <Experience />
        <Skills />
        <Contact />
      </main>

      {/* Footer */}
      <Footer onOpenTerminal={handleOpenTerminal} />

      {/* Interactive Modals */}
      {selectedCaseStudy && (
        <CaseStudyModal
          project={selectedCaseStudy}
          onClose={() => setSelectedCaseStudy(null)}
        />
      )}

      <TerminalModal
        isOpen={isTerminalOpen}
        isMinimized={isTerminalMinimized}
        onClose={handleCloseTerminal}
        onMinimize={handleMinimizeTerminal}
        onRestore={handleRestoreTerminal}
        onOpenResume={() => {
          handleCloseTerminal()
          setIsResumeOpen(true)
        }}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  )
}

export default App
