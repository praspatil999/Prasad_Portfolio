import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const isPointerRef = useRef(false)
  const isVisibleRef = useRef(false)
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

  useEffect(() => {
    if (isTouchDevice) return

    let rafId = null
    let targetX = -100
    let targetY = -100
    let ringX = -100
    let ringY = -100

    const render = () => {
      // Smooth lerp for ring lag
      ringX += (targetX - ringX) * 0.2
      ringY += (targetY - ringY) * 0.2

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      }

      rafId = requestAnimationFrame(render)
    }

    const handleMouseMove = (e) => {
      targetX = e.clientX
      targetY = e.clientY

      if (!isVisibleRef.current) {
        isVisibleRef.current = true
        setIsVisible(true)
      }

      const target = e.target
      const isInteractive = Boolean(
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('[role="button"]') ||
        target.closest('.interactive')
      )

      if (isInteractive !== isPointerRef.current) {
        isPointerRef.current = isInteractive
        setIsPointer(isInteractive)
      }
    }

    const handleMouseLeave = () => {
      isVisibleRef.current = false
      setIsVisible(false)
    }
    const handleMouseEnter = () => {
      isVisibleRef.current = true
      setIsVisible(true)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    rafId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [isTouchDevice])

  if (isTouchDevice || !isVisible) return null

  return (
    <>
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${isPointer ? 'hover' : ''}`}
      />
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${isPointer ? 'hover' : ''}`}
      />
    </>
  )
}
