import { useState, useRef, useEffect, useCallback } from 'react'
import { Terminal as TerminalIcon, X, Minus, Maximize2, Minimize2, CornerDownLeft } from 'lucide-react'
import { PERSONAL_INFO, PROJECTS, EXPERIENCES, SKILL_CATEGORIES } from '../data/portfolioData'

export default function TerminalModal({
  isOpen,
  isMinimized = false,
  onClose,
  onMinimize,
  onRestore,
  onOpenResume
}) {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([
    { type: 'system', text: 'PP_TERMINAL v2.4.0 (x86_64-apple-darwin)' },
    { type: 'system', text: 'Authentication successful. User: guest@prasadpatil.dev' },
    { type: 'info', text: 'Type "help" to view the available commands or press TAB for autocomplete.' }
  ])
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isMaximized, setIsMaximized] = useState(false)
  const [animState, setAnimState] = useState(isOpen ? 'open' : 'closed')
  const [pillAnimOut, setPillAnimOut] = useState(false)

  const inputRef = useRef(null)
  const endRef = useRef(null)
  const isTransitioningRef = useRef(false)

  const AVAILABLE_COMMANDS = [
    'help',
    'about',
    'skills',
    'projects',
    'experience',
    'contact',
    'resume',
    'clear',
    'whoami',
    'date',
    'exit'
  ]

  // Animated Close handler (Smooth scale-down & fade-out)
  const handleClose = useCallback(() => {
    if (isTransitioningRef.current || animState === 'closing' || animState === 'closed') return
    isTransitioningRef.current = true
    setAnimState('closing')
    setTimeout(() => {
      setAnimState('closed')
      isTransitioningRef.current = false
      onClose?.()
    }, 260)
  }, [animState, onClose])

  // Animated Minimize handler (Smooth genie swoop down toward dock)
  const handleMinimize = useCallback(() => {
    if (isTransitioningRef.current || animState === 'minimizing' || animState === 'minimized') return
    isTransitioningRef.current = true
    setAnimState('minimizing')
    setTimeout(() => {
      setAnimState('minimized')
      isTransitioningRef.current = false
      onMinimize?.()
    }, 340)
  }, [animState, onMinimize])

  // Animated Restore handler (Smooth swooping expand back from dock)
  const handleRestore = useCallback(() => {
    if (isTransitioningRef.current || animState === 'restoring' || animState === 'open') return
    isTransitioningRef.current = true
    setPillAnimOut(true)
    setTimeout(() => {
      setPillAnimOut(false)
      setAnimState('restoring')
      setTimeout(() => {
        setAnimState('open')
        isTransitioningRef.current = false
        onRestore?.()
        setTimeout(() => inputRef.current?.focus(), 60)
      }, 340)
    }, 120)
  }, [animState, onRestore])

  // Close completely from the minimized dock pill
  const handleCloseFromPill = useCallback(() => {
    if (isTransitioningRef.current) return
    isTransitioningRef.current = true
    setPillAnimOut(true)
    setTimeout(() => {
      setPillAnimOut(false)
      setAnimState('closed')
      isTransitioningRef.current = false
      onClose?.()
    }, 180)
  }, [onClose])

  // Synchronize animation state with parent isOpen & isMinimized props
  useEffect(() => {
    let timer
    if (isOpen) {
      if (isMinimized) {
        if (animState !== 'minimized' && animState !== 'minimizing') {
          handleMinimize()
        }
      } else {
        if (animState === 'closed') {
          timer = setTimeout(() => {
            setAnimState('open')
            inputRef.current?.focus()
          }, 50)
        } else if (animState === 'minimized') {
          handleRestore()
        }
      }
    } else {
      if (animState !== 'closed' && animState !== 'closing') {
        timer = setTimeout(() => {
          setAnimState('closed')
        }, 0)
      }
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [isOpen, isMinimized, animState, handleMinimize, handleRestore])

  // Body overflow locking when modal is open and active
  useEffect(() => {
    if (isOpen && (animState === 'open' || animState === 'opening' || animState === 'restoring')) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, animState])

  // Scroll to end of logs when new entries appear
  useEffect(() => {
    if (isOpen && animState === 'open') {
      endRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [history, isOpen, animState])

  const handleKeyDown = (e) => {
    // Escape closes terminal with smooth exit
    if (e.key === 'Escape') {
      handleClose()
      return
    }

    // Up Arrow: History backward
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length === 0) return
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(nextIndex)
      setInput(commandHistory[nextIndex] || '')
    }

    // Down Arrow: History forward
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex === -1) return
      const nextIndex = historyIndex + 1
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1)
        setInput('')
      } else {
        setHistoryIndex(nextIndex)
        setInput(commandHistory[nextIndex] || '')
      }
    }

    // Tab: Autocomplete command
    if (e.key === 'Tab') {
      e.preventDefault()
      const query = input.trim().toLowerCase()
      if (!query) return
      const match = AVAILABLE_COMMANDS.find(cmd => cmd.startsWith(query))
      if (match) {
        setInput(match)
      }
    }
  }

  const runCommand = (rawText) => {
    const raw = (rawText || '').trim()
    if (!raw) return

    const newCmdHistory = [...commandHistory, raw]
    setCommandHistory(newCmdHistory)
    setHistoryIndex(-1)

    const cmd = raw.toLowerCase()
    const currentEntry = { type: 'input', text: raw }

    let outputs = []

    switch (cmd) {
      case 'help':
        outputs = [
          { type: 'info', text: 'AVAILABLE SYSTEM COMMANDS:' },
          { type: 'output', text: '  about        Brief professional background & engineering ethos' },
          { type: 'output', text: '  skills       Interactive breakdown of technical competencies' },
          { type: 'output', text: '  projects     List production applications and system case studies' },
          { type: 'output', text: '  experience   Career chronology and architectural milestones' },
          { type: 'output', text: '  contact      Direct communication channels and coordinates' },
          { type: 'output', text: '  resume       Launch interactive developer resume preview' },
          { type: 'output', text: '  whoami       Displays current system persona' },
          { type: 'output', text: '  date         Prints current local time (Asia/Kolkata)' },
          { type: 'output', text: '  clear        Wipes terminal log history' },
          { type: 'output', text: '  exit         Closes terminal session' }
        ]
        break

      case 'about':
        outputs = [
          { type: 'output', text: `NAME: ${PERSONAL_INFO.name}` },
          { type: 'output', text: `ROLE: ${PERSONAL_INFO.role}` },
          { type: 'output', text: `LOCATION: ${PERSONAL_INFO.location} (${PERSONAL_INFO.coordinates})` },
          { type: 'output', text: `EXPERIENCE: ${PERSONAL_INFO.yearsOfExperience} years` },
          { type: 'output', text: `\n${PERSONAL_INFO.bio}` }
        ]
        break

      case 'skills':
        outputs = [
          { type: 'info', text: 'VERIFIED TECHNICAL PROFILE (Practical Experience):' }
        ]
        SKILL_CATEGORIES.forEach(cat => {
          outputs.push({ type: 'highlight', text: `\n[ ${cat.category.toUpperCase()} ]` })
          cat.skills.forEach(s => {
            outputs.push({ type: 'output', text: `  • ${s.name.padEnd(16)} — ${s.context}` })
          })
        })
        break

      case 'projects':
        outputs = [
          { type: 'info', text: 'SELECTED PRODUCTION PROJECTS:' }
        ]
        PROJECTS.forEach((p, idx) => {
          outputs.push({
            type: 'output',
            text: `\n${idx + 1}. ${p.title} [${p.category}]\n   Headline: ${p.headline}\n   Tech: ${p.tags.join(', ')}\n   GitHub: ${p.links.github}`
          })
        })
        break

      case 'experience':
        outputs = [
          { type: 'info', text: 'PROFESSIONAL CHRONOLOGY:' }
        ]
        EXPERIENCES.forEach(exp => {
          outputs.push({
            type: 'output',
            text: `\n${exp.period} | ${exp.role} @ ${exp.company} (${exp.location})\n${exp.description}\nKey Tech: ${exp.tech.join(', ')}`
          })
        })
        break

      case 'contact':
        outputs = [
          { type: 'info', text: 'COMMUNICATION COORDINATES:' },
          { type: 'output', text: `  Email:    ${PERSONAL_INFO.email}` },
          { type: 'output', text: `  GitHub:   ${PERSONAL_INFO.github}` },
          { type: 'output', text: `  LinkedIn: ${PERSONAL_INFO.linkedin}` },
          { type: 'output', text: `  Website:  ${PERSONAL_INFO.liveSite}` }
        ]
        break

      case 'resume':
        outputs = [
          { type: 'info', text: 'Opening Developer Resume modal...' }
        ]
        if (onOpenResume) onOpenResume()
        break

      case 'whoami':
        outputs = [
          { type: 'output', text: 'guest@prasadpatil.dev (Developer, Recruiter, Engineering Leader)' }
        ]
        break

      case 'date':
        outputs = [
          { type: 'output', text: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }) + ' (IST)' }
        ]
        break

      case 'clear':
        setHistory([])
        setInput('')
        return

      case 'exit':
        handleClose()
        setInput('')
        return

      default:
        outputs = [
          { type: 'error', text: `Command not recognized: "${raw}". Type "help" for a list of valid commands.` }
        ]
    }

    setHistory([...history, currentEntry, ...outputs])
    setInput('')
  }

  const handleCommandSubmit = (e) => {
    e.preventDefault()
    runCommand(input)
  }

  // If completely closed and not in transition, do not render
  if (!isOpen && animState === 'closed') return null

  // Minimized Dock Floating Pill (Bottom Right Corner)
  if (animState === 'minimized') {
    return (
      <div
        className={`terminal-dock-pill ${pillAnimOut ? 'anim-out' : ''}`}
        onClick={handleRestore}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleRestore()}
        aria-label="Restore minimized developer terminal"
        title="Click to restore terminal"
      >
        <div className="dock-pill-indicator">
          <span className="dock-pill-dot" />
        </div>
        <div className="dock-pill-label font-mono">
          <TerminalIcon size={14} className="terminal-dock-icon" />
          <span>terminal: zsh</span>
          <span className="dock-pill-tag font-mono">minimized</span>
        </div>
        <div className="dock-pill-actions">
          <button
            type="button"
            className="dock-pill-restore-btn"
            onClick={(e) => {
              e.stopPropagation()
              handleRestore()
            }}
            aria-label="Restore terminal window"
            title="Restore window"
          >
            <Maximize2 size={11} />
            <span>Restore</span>
          </button>
          <button
            type="button"
            className="dock-pill-close-btn"
            onClick={(e) => {
              e.stopPropagation()
              handleCloseFromPill()
            }}
            aria-label="Close terminal completely"
            title="Close terminal"
          >
            <X size={12} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`terminal-overlay-backdrop ${animState}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`terminal-window ${isMaximized ? 'maximized' : ''} ${animState}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Title Bar */}
        <div className="terminal-titlebar">
          <div className="terminal-controls">
            <button
              onClick={handleClose}
              className="term-ctrl-btn close-btn"
              aria-label="Close terminal"
              title="Close (Exit session)"
            >
              <X size={10} />
            </button>
            <button
              onClick={handleMinimize}
              className="term-ctrl-btn min-btn"
              aria-label="Minimize terminal"
              title="Minimize to dock"
            >
              <Minus size={10} />
            </button>
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="term-ctrl-btn max-btn"
              aria-label={isMaximized ? 'Restore size' : 'Maximize terminal'}
              title={isMaximized ? 'Restore window size' : 'Maximize window'}
            >
              {isMaximized ? <Minimize2 size={10} /> : <Maximize2 size={10} />}
            </button>
          </div>

          <div className="terminal-title-text font-mono">
            <TerminalIcon size={14} className="terminal-icon" />
            <span>prasad@portfolio: ~ (zsh)</span>
          </div>

          <div className="terminal-shortcuts font-mono text-xs">
            <span>ESC to close</span>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="terminal-body" onClick={() => inputRef.current?.focus()}>
          <div className="terminal-logs">
            {history.map((log, idx) => (
              <div key={idx} className={`term-log-line ${log.type}`}>
                {log.type === 'input' ? (
                  <div className="term-input-echo">
                    <span className="term-prompt font-mono">prasad@portfolio:~$</span>
                    <span className="term-command-text font-mono">{log.text}</span>
                  </div>
                ) : (
                  <pre className="term-log-content font-mono">{log.text}</pre>
                )}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Mobile-Only Quick Command Suggestions (Hidden on Desktop) */}
          <div className="term-mobile-chips" aria-label="Suggested quick commands">
            {['help', 'skills', 'projects', 'about', 'clear'].map((cmd) => (
              <button
                key={cmd}
                type="button"
                className="term-chip-btn font-mono"
                onClick={() => runCommand(cmd)}
                title={`Run ${cmd}`}
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Interactive Input Line */}
          <form onSubmit={handleCommandSubmit} className="terminal-input-bar">
            <span className="term-prompt font-mono">prasad@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="term-real-input font-mono"
              placeholder=""
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              aria-label="Developer terminal CLI prompt"
            />
            <button type="submit" className="term-submit-btn" aria-label="Submit command">
              <CornerDownLeft size={14} />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
