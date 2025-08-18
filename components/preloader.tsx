"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence, cubicBezier } from "framer-motion"

const textLines = [
  "Hi, I'm Kashish Nandwani",
  "a Full-Stack Developer and Designer, crafting digital experiences.",
  "Welcome to my portfolio.",
]

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [currentLine, setCurrentLine] = useState(0)
  const [dimension, setDimension] = useState({ width: 0, height: 0 })
  // const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight })
  }, [])

  useEffect(() => {
    if (currentLine < textLines.length - 1) {
      const timeout = setTimeout(
        () => setCurrentLine(currentLine + 1),
        currentLine === 0 ? 1500 : 1200,
      )
      return () => clearTimeout(timeout)
    } else {
      const completeTimeout = setTimeout(() => {
        // setIsComplete(true)
        setTimeout(onComplete, 800)
      }, 2000)
      return () => clearTimeout(completeTimeout)
    }
  }, [currentLine, onComplete])

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`

  const slideUp = {
    initial: { top: 0 },
    exit: {
      top: "-100vh",
      transition: {
        duration: 0.8,
        ease: cubicBezier(0.76, 0, 0.24, 1),
        delay: 0.2,
      },
    },
  }

  const opacity = {
    initial: { opacity: 0 },
    enter: {
      opacity: 0.75,
      transition: { duration: 1, delay: 0.2 },
    },
  }

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: cubicBezier(0.76, 0, 0.24, 1) },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: cubicBezier(0.76, 0, 0.24, 1), delay: 0.3 },
    },
  }

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      {dimension.width > 0 && (
        <>
          <motion.div variants={opacity} initial="initial" animate="enter" className="text-center relative z-10">
            <div className="overflow-hidden h-20 md:h-24 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentLine}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    transition: {
                      duration: 1.2,
                      ease: cubicBezier(0.25, 0.46, 0.45, 0.94),
                      type: "spring",
                      damping: 25,
                      stiffness: 120,
                    },
                  }}
                  exit={{
                    y: -80,
                    opacity: 0,
                    transition: {
                      duration: 0.8,
                      ease: cubicBezier(0.76, 0, 0.24, 1),
                    },
                  }}
                  className="text-2xl md:text-4xl font-serif font-light text-foreground tracking-wide leading-relaxed max-w-3xl"
                >
                  {textLines[currentLine]}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>

          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <motion.path variants={curve} initial="initial" exit="exit" className="fill-background" />
          </svg>

          <div className="absolute inset-0 overflow-hidden opacity-30">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
        </>
      )}
    </motion.div>
  )
}
